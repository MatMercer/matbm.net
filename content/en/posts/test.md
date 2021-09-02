+++
author = "Hugo Authors"
title = "Test Post"
date = "2020-11-09"
description = "Sample article showcasing basic Markdown syntax and formatting for HTML elements."
featured = false
draft = true
categories = [
]
tags = [
"Markdown",
"CSS",
"HTML",
]
series = [
"Manual"
]
aliases = ["migrate-from-jekyl"]
images = [
"images/markdown.png"
]
# toc = false
+++

This article offers a sample of basic Markdown syntax that can be used in Hugo content files, also it shows whether basic HTML elements are decorated with CSS in a Hugo theme.
<!--more-->

## Headings

The following HTML `<h1>`—`<h6>` elements represent six levels of section headings. `<h1>` is the highest section level while `<h6>` is the lowest.

# H1
## H2
### H3
#### H4
##### H5
###### H6

## Paragraph

Xerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum, voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur? Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata tiustia prat.

Itatur? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne sapicia is sinveli squiatum, core et que aut hariosam ex eat.

## Blockquotes

The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a `footer` or `cite` element, and optionally with in-line changes such as annotations and abbreviations.

### Blockquote without attribution

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.
> **Note** that you can use *Markdown syntax* within a blockquote.

### Blockquote with attribution

> Don't communicate by sharing memory, share memory by communicating.<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: The above quote is excerpted from Rob Pike's [talk](https://www.youtube.com/watch?v=PAAkCSZUG1c) during Gopherfest, November 18, 2015.

## Tables

Tables aren't part of the core Markdown spec, but Hugo supports supports them out-of-the-box.

Name | Age
--------|------
Bob | 27
Alice | 23

### Inline Markdown within tables

| Italics   | Bold     | Code   |
| --------  | -------- | ------ |
| *italics* | **bold** | `code` |

## Code Blocks

### Code block with backticks

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Example HTML5 Document</title>
</head>
<body>
  <p>Test</p>
</body>
</html>
```

### Code block with Hugo's internal highlight shortcode
{{< highlight html >}}
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Another Example HTML5 Document</title>
</head>
<body>
  <p>A looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong text</p>
</body>
</html>
{{< /highlight >}}

## List Types

### Ordered List

1. First item
2. Second item
3. Third item

### Unordered List

* List item
* Another item
* And another item

### Nested List

* Fruit
    * Apple
    * Orange
    * Banana
* Dairy
    * Milk
    * Cheese

### TODO List

- [x] Done
- [ ] WIP

## Other Elements — abbr, sub, sup, kbd, mark

<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd><kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>Delete</kbd></kbd> to end the session.

Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.


We can easily align images by adding URL fragments.

<!--more-->

## Center

Adding the `#center` fragment for aligning images to the center.

For example: `![Center](/images/center.png#center)`.

![Center](/images/center.png#center)

## Float Left

![Float Left](/images/left.png#floatleft)

Adding the `#floatleft` fragment for floating images to the left.

For example: `![Float Left](/images/left.png#floatleft)`.

## Float Right

![Float Right](/images/right.png#floatright)

Similarly, we can also float images to the right by adding the `#floatright` fragment.

For example: `![Float Right](/images/right.png#floatright)`.

# Emoji

Emoji can be enabled in a Hugo project in a number of ways.
<!--more-->
The [`emojify`](https://gohugo.io/functions/emojify/) function can be called directly in templates or [Inline Shortcodes](https://gohugo.io/templates/shortcode-templates/#inline-shortcodes).

To enable emoji globally, set `enableEmoji` to `true` in your site's [configuration](https://gohugo.io/getting-started/configuration/) and then you can type emoji shorthand codes directly in content files; e.g.

<p><span class="nowrap"><span class="emojify">🙈</span> <code>:see_no_evil:</code></span>  <span class="nowrap"><span class="emojify">🙉</span> <code>:hear_no_evil:</code></span>  <span class="nowrap"><span class="emojify">🙊</span> <code>:speak_no_evil:</code></span></p>
<br>

The [Emoji cheat sheet](http://www.emoji-cheat-sheet.com/) is a useful reference for emoji shorthand codes.

***

**N.B.** The above steps enable Unicode Standard emoji characters and sequences in Hugo, however the rendering of these glyphs depends on the browser and the platform. To style the emoji you can either use a third party emoji font or a font stack; e.g.

```css
.emojify {
    font-family: Apple Color Emoji, Segoe UI Emoji, NotoColorEmoji, Segoe UI Symbol, Android Emoji, EmojiSymbols;
    font-size: 2rem;
    vertical-align: middle;
}
```
:smiling_imp: :smiling_imp: :smiling_imp: :smiling_imp: :smiling_imp: 

# Math


Mathematical notation in a Hugo project can be enabled by using third party JavaScript libraries.
<!--more-->

This theme supports [KaTeX](https://katex.org/).

- To enable KaTex globally set the parameter `math` to `true` in a project's configuration
- To enable KaTex on a per page basis include the parameter `math: true` in content files

**Note:** Use the online reference of [Supported TeX Functions](https://katex.org/docs/supported.html)

## Examples

$$
\(\varphi = \dfrac{1+\sqrt5}{2}= 1.6180339887…\)
$$

$$
\varphi = 1+\frac{1} {1+\frac{1} {1+\frac{1} {1+\cdots} } }
$$

# Placeholder text

Lorem est tota propiore conpellat pectoribus de pectora summo. <!--more-->Redit teque digerit hominumque toris verebor lumina non cervice subde tollit usus habet Arctonque, furores quas nec ferunt. Quoque montibus nunc caluere tempus inhospita parcite confusaque translucet patri vestro qui optatis lumine cognoscere flos nubis! Fronde ipsamque patulos Dryopen deorum.

1. Exierant elisi ambit vivere dedere
2. Duce pollice
3. Eris modo
4. Spargitque ferrea quos palude

Rursus nulli murmur; hastile inridet ut ab gravi sententia! Nomine potitus silentia flumen, sustinet placuit petis in dilapsa erat sunt. Atria tractus malis.

1. Comas hunc haec pietate fetum procerum dixit
2. Post torum vates letum Tiresia
3. Flumen querellas
4. Arcanaque montibus omnes
5. Quidem et

# Vagus elidunt

<svg class="canon" xmlns="http://www.w3.org/2000/svg" overflow="visible" viewBox="0 0 496 373" height="373" width="496"><g fill="none"><path stroke="#000" stroke-width=".75" d="M.599 372.348L495.263 1.206M.312.633l494.95 370.853M.312 372.633L247.643.92M248.502.92l246.76 370.566M330.828 123.869V1.134M330.396 1.134L165.104 124.515"></path><path stroke="#ED1C24" stroke-width=".75" d="M275.73 41.616h166.224v249.05H275.73zM54.478 41.616h166.225v249.052H54.478z"></path><path stroke="#000" stroke-width=".75" d="M.479.375h495v372h-495zM247.979.875v372"></path><ellipse cx="498.729" cy="177.625" rx=".75" ry="1.25"></ellipse><ellipse cx="247.229" cy="377.375" rx=".75" ry="1.25"></ellipse></g></svg>

[The Van de Graaf Canon](https://en.wikipedia.org/wiki/Canons_of_page_construction#Van_de_Graaf_canon)

## Mane refeci capiebant unda mulcebat

Victa caducifer, malo vulnere contra dicere aurato, ludit regale, voca! Retorsit colit est profanae esse virescere furit nec; iaculi matertera et visa est, viribus. Divesque creatis, tecta novat collumque vulnus est, parvas. **Faces illo pepulere** tempus adest. Tendit flamma, ab opes virum sustinet, sidus sequendo urbis.

Iubar proles corpore raptos vero auctor imperium; sed et huic: manus caeli Lelegas tu lux. Verbis obstitit intus oblectamina fixis linguisque ausus sperare Echionides cornuaque tenent clausit possit. Omnia putatur. Praeteritae refert ausus; ferebant e primus lora nutat, vici quae mea ipse. Et iter nil spectatae vulnus haerentia iuste et exercebat, sui et.

Eurytus Hector, materna ipsumque ut Politen, nec, nate, ignari, vernum cohaesit sequitur. Vel **mitis temploque** vocatus, inque alis, *oculos nomen* non silvis corpore coniunx ne displicet illa. Crescunt non unus, vidit visa quantum inmiti flumina mortis facto sic: undique a alios vincula sunt iactata abdita! Suspenderat ego fuit tendit: luna, ante urbem Propoetides **parte**.

{{< css.inline >}}
<style>
.canon { background: white; width: 100%; height: auto; }
</style>
{{< /css.inline >}}

# Rich Content

## Instagram Simple Shortcode

```markdown
{{</* instagram_simple BGvuInzyFAe hidecaption */>}}
```
<br>

---

## YouTube Privacy Enhanced Shortcode

```markdown
{{</* youtube ZJthWmvUzzc */>}}
```
{{< youtube ZJthWmvUzzc >}}
<br>

---

## Twitter Simple Shortcode

```markdown
{{</* twitter_simple 1085870671291310081 */>}}
```
{{< twitter_simple 1085870671291310081 >}}
<br>

---

## Vimeo Simple Shortcode

```markdown
{{</* vimeo_simple 48912912 */>}}
```

{{< vimeo_simple 48912912 >}}

# Alert


This article shows how to use the `alert` shortcode.
<!--more-->

```markdown
{{</* alert "Message" [type] */>}}
```

> The parameter `type` is optional. Default to `info`.

## Info

```markdown
{{</* alert "Info" */>}}
```

{{< alert "Info" >}}

## Success

```markdown
{{</* alert "Success" success */>}}
```

{{< alert "Success" success >}}

## Warning

```markdown
{{</* alert "Warning" warning */>}}
```

{{< alert "Warning" warning >}}

## Danger

```markdown
{{</* alert "Danger" danger */>}}
```

{{< alert "Danger" danger >}}

# Online IDE

## JSFiddle

```markdown
{{</* jsfiddle "user/id" */>}}
```

{{< jsfiddle "razonyang/bya1vuxn" >}}


## CodePen

```markdown
{{</* codepen "id" */>}}
```

{{< codepen "YzWGJNQ" >}}


## JSRun

```markdown
{{</* jsrun "id" */>}}
```

{{< jsrun "QG6Kp" >}}

