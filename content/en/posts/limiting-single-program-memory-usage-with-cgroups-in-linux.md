---
title: "Limiting Single Program Memory Usage With Cgroups in Linux"
date: 2023-05-28T04:16:46-03:00
draft: false
---
# Trying to do it with `ulimit`

While trying to solve the 07 challenge from Os Programadores (and validating other's solutions), I had to check if my (and other's) program used less than 512 megabytes of memory.

OK, the instructions page for the challenge told me to use `ulimit -v 524288` to test it.

This command does the following:

```
$ ulimit -h
Modify shell resource limits.

    Provides control over the resources available to the shell and processes
    it creates, on systems that allow such control.
...

	-v        the size of virtual memory

$ ulimit -a
virtual memory              (kbytes, -v) unlimited
```

So far so good, this means that any program I execute from now on will be killed if it try to allocate more than `524288 KB` of virtual memory. So let's try it.

## Programs allocate a lot of virtual memory

The first problem arise when I tried to run a hello world in Go, and it just died.

```
$ cat hello.go
package main

import "fmt"

func main() {
        fmt.Println("hello")
}
$ go build hello.go <-- fails too if ulimit
$ ./hello
hello

$ ulimit -b 524288
$ ./hello
fatal error: failed to reserve page summary memory

runtime stack:
...
```

Then, I tested a hello world in NodeJS with the same results:

```
$ node -v
v20.2.0

$ cat hello.js
console.log("hello world")

$ node hello.js

#
# Fatal process OOM in Failed to reserve virtual memory for CodeRange
#

Trace/breakpoint trap (core dumped)
```

This meant that both programs allocates more than `512MB` of virtual memory. This isn't a bad thing if you aren't doing embedded development, and is called [Memory overcommitment](https://en.wikipedia.org/wiki/Memory_overcommitment). Basically, in 64 bits systems, virtual memory is practically considered free. So Go, for example, allocates at least 1GB of virtual memory per process and no one complains, because they all live in infinite virtual memory paradises.

There isn't much you can do at this point without directly modifying the runtimes you are using. ~~You can use C for everything but both me and you knows that rewriting everything in C costs too much time~~.

The Go community has a project that deals with that so you don't need to patch compiler and runtime code by yourself. It's called [tiny Go](https://tinygo.org/) and works just fine with `ulimit`.

I didn't researched if the NodeJS community has something similar (sorry NodeJS developers) but it probably has, since embedded development is everywhere.

# Limiting real memory usage with cgroups

The Linux kernel has something called [Control Groups](https://man7.org/linux/man-pages/man7/cgroups.7.html):

>	Control groups, usually referred to as cgroups, are a Linux kernel feature which allow processes to be organized into hierarchical groups whose usage of various types of resources can then be limited and monitored.  The kernel's cgroup interface is provided through a pseudo-filesystem called cgroupfs.  Grouping is implemented in the core cgroup kernel code, while resource tracking and limits are implemented in a set of per-resource-type subsystems (memory, CPU, and so on).

The "pseudo-filesystem" makes the interaction with this tool a little bit difficult. Fortunately, there are tools like `libcgroup-tools` in Debian based distros that makes it easier to configure cgroups.

First, you need to create a control group that your user has access, here, I'll call it `osprogramadoresD7`, note the `memory` prefix, this is used since we are limiting the `memory resource`.

💡Tip: export these env vars before following the commands below:
```
$ export CGROUP=osProgramadoresD7
$ export CGROUPP="memory/$CGROUP"
```

```
$ sudo cgcreate -t $USER:$USER -a $USER:$USER -g memory:"$CGROUP"
$ ls "/sys/fs/cgroup/$CGROUPP"
cgroup.clone_children           memory.kmem.tcp.max_usage_in_bytes  memory.oom_control
cgroup.event_control            memory.kmem.tcp.usage_in_bytes      memory.pressure_level
cgroup.procs                    memory.kmem.usage_in_bytes          memory.soft_limit_in_bytes
memory.failcnt                  memory.limit_in_bytes               memory.stat
memory.force_empty              memory.max_usage_in_bytes           memory.swappiness
memory.kmem.failcnt             memory.memsw.failcnt                memory.usage_in_bytes
memory.kmem.limit_in_bytes      memory.memsw.limit_in_bytes         memory.use_hierarchy
memory.kmem.max_usage_in_bytes  memory.memsw.max_usage_in_bytes     notify_on_release
memory.kmem.tcp.failcnt         memory.memsw.usage_in_bytes         tasks
memory.kmem.tcp.limit_in_bytes  memory.move_charge_at_immigrate
```

With that done, let's limit the memory usage to `512MB` as required by the code challenge:

```
$ echo 512M > "/sys/fs/cgroup/$CGROUPP/memory.limit_in_bytes"
$ cat "/sys/fs/cgroup/$CGROUPP/memory.limit_in_bytes"
536870912

$ echo 536870912 | numfmt --to=iec
512M
```

Nice, the control groups are kind enough to auto convert from [International System of Units](https://physics.nist.gov/cuu/Units/binary.html).

Now, let's test it with a hungry program that allocates `600M` of memory, what a waste!

```go
// hungry.go
package main

import "fmt"

func main() {
        fmt.Println("eating your memory...")

		// this allocates a buffer of 600M
        // see https://www.socketloop.com/tutorials/golang-how-to-declare-kilobyte-megabyte-gigabyte-terabyte-and-so-on
        b := make([]byte, int64(600 << (10 * 2)))
        for i := 0; i < cap(b); i++ {
                b[i] = byte(i)
        }

        fmt.Println("thx!")
}
```

Let's run without limits.

```
$ go build hungry.go
$ ./hungry
eating your memory...
thx!
```

This program is eating too much, let's put it on a diet:

```
$ cgexec -g memory:"$CGROUP" ./hungry
eating your memory...
thx!
```

Hey! This hungry program ate the memory despite we don't allowing it! 😠.

So what happened? Well, we forgot to limit the swap usage:

```
$ cat "/sys/fs/cgroup/$CGROUPP/memory.memsw.max_usage_in_bytes | numfmt --to=iec"
617M
```

This program ate a bit of our disk space too, since `memory.memsw.max_usage_in_bytes` gives us the maximum memory+swap used so far by this group, what a shame.

To finally limit this program you can bring swappiness to 0:

```
$ cat "/sys/fs/cgroup/$CGROUPP/memory.swappiness"
60
$ echo 0 > "/sys/fs/cgroup/$CGROUPP/memory.swappiness"
```

Let's try again:

```
$ cgexec -g memory:"$CGROUP" ./hungry
eating your memory...
Killed
(exit code 137)
```

Nice! We successfully put the program on a diet.

# Conclusion

Control Groups is a versatile tool and I will use it from now on when in need to test if a program is using too much memory. This practical guide is just a small part of Control Groups and you can do much more with it, including limiting CPU or network usage.

In comparison with profilers, Control Groups doesn't gives the *why* there is too much memory usage, but it gives you the *who* and *what* is using it. When mastered with some snippets, it gives you a fast way to validate if a program is below a certain constraint, which is exactly what I needed to validate the code challenge.


