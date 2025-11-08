# Markdown Stress Test

> [id='warning'] Short {title} description: this document exercises headings, lists, tables, task lists, footnotes, math, MDX, raw HTML, `<details>`/`<summary>`, reference links, images, code blocks, admonitions and more.

> [id='error'] Short {title} description: this document exercises headings, lists, tables, task lists, footnotes, math, MDX, raw HTML, `<details>`/`<summary>`, reference links, images, code blocks, admonitions and more.

> [id='info'] Short {title} description: this document exercises headings, lists, tables, task lists, footnotes, math, MDX, raw HTML, `<details>`/`<summary>`, reference links, images, code blocks, admonitions and more.

> [id='success'] Short {title} description: this document exercises headings, lists, tables, task lists, footnotes, math, MDX, raw HTML, `<details>`/

`<summary>`, reference links, images, code blocks, admonitions and more.

## Table of contents

- [Headings & Inline formatting](#headings--inline-formatting)
- [Details / Summary / HTML blocks](#details--summary--html-blocks)
- [Lists (ordered, nested, tasks)](#lists--ordered-nested-tasks)
- [Tables & Alignments](#tables--alignments)
- [Code blocks & Syntax Highlighting](#code-blocks--syntax-highlighting)
- [MDX component usage (if MDX enabled)](#mdx-component-usage-if-mdx-enabled)
- [Math (KaTeX/LaTeX)](#math-katexlatex)
- [Footnotes & Definition lists](#footnotes--definition-lists)
- [Admonitions & Blockquotes](#admonitions--blockquotes)
- [Misc (emojis, autolinks, html comments, escapes)](#misc-emojis-autolinks-html-comments-escapes)

## Headings & Inline formatting

# H1 — level 1

## H2 — level 2

### H3 — level 3

#### H4 — level 4

##### H5 — level 5

###### H6 — level 6

**Bold text** and _italic text_ and **_bold italic_**.  
~~Strikethrough~~ (GFM).  
Inline `code` (backticks).  
Math inline: `$e^{i\pi} + 1 = 0$` (if math plugin enabled).

> [id='success'] Tip: headings will be slugged by `rehype-slug`. Check that anchors are created.

---

## Details / Summary / HTML blocks

<Details>
  <Summary>Click to expand</Summary>

[id='my-list'] This content is inside `<details>`. You can include **Markdown** inside if your renderer allows HTML with Markdown (some do, some don't).

### Subheading inside details

- a list
- with multiple items

![Illustration: GIF test image](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOW9laGVyN20zZ3d4bm5uOXdjbHdxaWx5NXN4MGg4cWFvY2ltdXppNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HO2cuakPoSngvitf0M/giphy.gif)

</Details>

![banner_image](https://ytpmpkgcjlcdidphswzv.supabase.co/storage/v1/object/public/banner/pexels-christian-heitz-285904-842711.jpg)

## Lists (ordered, nested, tasks)

1. First ordered item
2. Second ordered item
   1. nested ordered a
   2. nested ordered b
3. Third ordered item

- Unordered item
- Unordered item 2 with a link: [MDN](https://developer.mozilla.org)

Task list (GFM):

- [ ] open task
- [x] completed task
- [ ] another task

Mixed content list:

- Item with **bold**
- Item with `inline code`
- Item with a link: [MDN](https://developer.mozilla.org)
- Item with an image: ![tiny](https://via.placeholder.com/24)

---

## Tables & Alignments

Simple table (GFM):

| Feature      | Supported | Notes                       |
| ------------ | :-------: | :-------------------------- |
| Headings     |     ✓     | Anchors should be generated |
| Task lists   |     ✓     | Requires GFM                |
| Tables (GFM) |     ✓     | Alignment tested below      |

Alignment table:

| Left align | Center align |          Right align |
| :--------- | :----------: | -------------------: |
| left       |    center    |                right |
| `code`     |   **bold**   | <small>small</small> |

Table with code block in cell:

| Query                  | Result            |
| :--------------------- | :---------------- |
| `SELECT * FROM users;` | returns all users |

---

## Code blocks & Syntax Highlighting

Inline code: `const x = 1;`

Fenced code (bash):

```tsx
import { DM_Sans, Geist_Mono } from "next/font/google";

export const primaryFont = DM_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700"],
  variable: "--font-primary",
});
```
