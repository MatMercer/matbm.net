---
title: "How to upgrade Debian 10 Buster to Debian 12 Bookworm"
date: 2024-01-28T02:00:05-03:00
images: [
  "images/2024-01/software-maintenance-crop.jpg"
]
tags: [
  "Debian",
  "Linux",
  "Programming",
]
translationKey: debian-10-to-12
---

![A reference to hearth beat monitor with black and red colors](/images/2024-01/software-maintenance-crop.jpg#center "A reference to hearth beat monitor with black and red colors. Source: [Internet Archive, Software maintenance and computers, 1990](https://archive.org/details/softwaremaintena0000unse_j8i4).")

# Overview

It's not permitted to jump Debian releases, so we need to upgrade two times, from Debian 10, to 11, then 12.

My server has 4 main apps:
* [Moodle](https://moodle.org/)
* [WordPress](https://wordpress.com/)
* [MariaDB](https://mariadb.org/)
* [NGINX](https://nginx.org/)

To upgrade, it's extremely important to follow the official docs, I'm sharing my personal experience with the upgrade. So don't just go copy and paste the commands from this guide, read the docs first.

Debian 10 -> Debian 11: https://www.debian.org/releases/bullseye/i386/release-notes/ch-upgrading.en.html
Debian 11 -> Debian 12: https://www.debian.org/releases/bookworm/i386/release-notes/ch-upgrading.en.html

This entire process took me 2 hours.

{{< alert "Be sure to have a backup that is very easy to recover, for example, a snapshot in your VPS provider." info >}}

{{< alert "The official docs requires you to remove third party packages, ones that aren't in official repositories. Unfortunately I had some PHP old packages which I didn't removed, the upgrade turned out fine still." warning >}}

# From Debian 10 Buster to Debian 11 Bullseye

## Preparing the upgrade

```sh
apt update && apt upgrade
# if required, you need to put the system in a "clean" state
apt autoremove

# remove old leftover of etc config files
find /etc -name '*.dpkg-*' -o -name '*.ucf-*' -o -name '*.merge-error'
# ONLY RUN THIS AFTER CHECKING THE ABOVE COMMAND, BE SURE NO IMPORTANT FILES ARE HERE
find /etc \( -name '*.dpkg-*' -o -name '*.ucf-*' -o -name '*.merge-error' \) -exec rm -v {} \+

# configuring pending packages
dpkg --audit
dpkg --configure --pending

# updating source lists
sed -i.bak 's/buster/bullseye/g' /etc/apt/sources.list
# necessary since security section changed name layout
sed -i.bak2 's/bullseye\/updates/bullseye-security/g' /etc/apt/sources.list

```

## Doing the upgrade

```sh
# recording the update session to understand errors
script -t 2>~/upgrade-bullseyestep.time -a ~/upgrade-bullseyestep.script

# as docs, minimal upgrade first
apt update
apt upgrade --without-new-pkgs

# full upgrade, fingers crossed :)
apt full-upgrade

# if all OK, time for a reboot
reboot
```

## Post install

You should check all the services, check if they are working correctly and check all website status.

```sh
# check packages that needs removal and remove them
apt update && apt upgrade
apt autoremove

# check OS release
cat /etc/os-release
```

You are done! Next, lets continue with Debian 12.
# From Debian 11 Bullseye to Debian 12 Bookworm

Since we already did the preparation from the last upgrade and our system is in a "clean state", the upgrade process is easier.

## Preparing the upgrade

```sh
# remove old leftover of etc config files
find /etc -name '*.dpkg-*' -o -name '*.ucf-*' -o -name '*.merge-error'
# ONLY RUN THIS AFTER CHECKING THE ABOVE COMMAND, BE SURE NO IMPORTANT FILES ARE HERE
find /etc \( -name '*.dpkg-*' -o -name '*.ucf-*' -o -name '*.merge-error' \) -exec rm -v {} \+

# updating source lists
sed -i.bullseye 's/bullseye/bookworm/g' /etc/apt/sources.list
```

## Doing the upgrade

```sh
# recording the update session to understand errors
script -t 2>~/upgrade-bookwormstep.time -a ~/upgrade-bookwormstep.script
# as docs, minimal upgrade first
apt update
apt upgrade --without-new-pkgs

# full upgrade, fingers crossed :)
apt full-upgrade

# if all OK, time for a reboot
reboot
```

## Post install

You should check if all the services are working again, check if they are working correctly and check all website status.

```sh
# check packages that needs removal and remove them
apt update && apt upgrade
apt autoremove

# check OS release
cat /etc/os-release
```

# Cleaning the new system

With all the upgrades, residual configuration, and obsolete packages may be present.

{{< alert "Be cautious here! These delete packages, logs and configuration files you may want to keep." warning >}}

```sh
# list residual configurations
apt list '~c'
# list obsolete packages
apt list '~o'

# remove them
apt purge '~c'
apt purge '~o'

# reboot and check the system again
reboot
```

# Conclusion

Upgrading 2 major Debian versions was very easy. Approximately +1GB of disk space was used, and I didn't have to intervene in the installed applications.

This entire process took me 2 hours.

