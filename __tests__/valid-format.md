# MDX Valid Format

<Contents>

- [Headings & Inline formatting](#headings--inline-formatting)
- [Paragraphs & classed paragraphs](#paragraphs--classed-paragraphs)
- [Alerts using blockquotes](#alerts-using-blockquotes)
- [Lists (ordered, nested, tasks)](#lists--ordered-nested-tasks)
- [Tables](#tables)
- [Images](#images)
- [Details / Summary](#details--summary)
- [Code blocks](#code-blocks--syntax-highlighting)
- [Checklist](#checklist)
- [Footnotes](#footnotes)
- [Conclusion](#conclusion)

</Contents>

## Headings & Inline formatting

# H1 — level 1

## H2 — level 2

### H3 — level 3

#### H4 — level 4

##### H5 — level 5

###### H6 — level 6

---

## [id='header-with-id'] Header with an id

## [id='header-with-id' className='text-rose-500'] Header with an id and className (id comes first)

## [className='text-rose-500' id='header-with-id] Header with an id and className (className comes first)

---

**Bold text** and _italic text_ and **_bold italic_**.  
~~Strikethrough~~ (GFM).  
Inline `code` (backticks).

---

## Paragraphs & classed paragraphs

**Pure — plain paragraph**: Velit do minim ullamco elit. Do velit nisi nulla laborum. Laboris sunt elit et commodo proident sunt velit officia est exercitation aute. Occaecat sunt non minim culpa nostrud. Voluptate reprehenderit esse adipisicing anim elit velit enim ut officia dolore qui nisi aute ullamco. Irure quis elit deserunt ea dolore adipisicing aliqua ullamco deserunt.

[className='text-red-500'] Classed paragraph without bold starter: Laborum do commodo nisi consectetur culpa pariatur aliquip. Nostrud non aliquip non proident. Duis reprehenderit velit in nostrud eu ullamco deserunt adipisicing sint reprehenderit voluptate est dolor est. Sit consequat dolor enim esse commodo ut ut.

[className='text-red-500' id='i-am-classed'] Classed paragraph with an extra attr (id): Pariatur nulla Lorem dolore ullamco mollit velit et culpa dolore proident. Elit laboris aliquip ea elit commodo esse cillum commodo. Minim nostrud dolore adipisicing dolor velit et sunt esse ad. Proident Lorem deserunt laborum deserunt exercitation consequat aliqua. Ex minim deserunt voluptate deserunt voluptate eu enim cupidatat pariatur magna labore. Dolore pariatur deserunt et est occaecat voluptate laborum. Incididunt excepteur sunt ut mollit aute commodo.

[className='text-blue-500' id='i-am-bold'] **Bold led paragraph with classes and attrs**: Consequat ea proident ad excepteur excepteur exercitation ipsum. Duis culpa dolor non eiusmod ad. Commodo veniam ex anim enim quis sit eiusmod do nostrud. Non ex et sit pariatur pariatur ad commodo consectetur. Ipsum cillum cillum enim culpa et consectetur amet aute veniam ea consectetur eu sint incididunt. Labore ullamco eu ullamco et quis pariatur et ex ex incididunt. Qui sit culpa culpa cillum sit occaecat sint deserunt culpa.

[className='text-cyan-500' id='i-am-bold-italic-and-scoped'] **_Bold & italic led paragraph with classes and attrs including {title} scope_** Consectetur veniam labore ea non laborum amet officia ullamco ullamco mollit ut. Nisi ullamco sit do laborum exercitation officia ex magna labore. Non consequat magna proident magna anim irure enim dolore excepteur adipisicing officia magna reprehenderit sunt. Nulla nisi sit proident do pariatur irure.

**Later on attrs — class and id (id comes earlier)**: [id='scopes-comes-later-id-comes-earlier' className='text-cyan-500'] Consectetur veniam labore ea non laborum amet officia ullamco ullamco mollit ut. Nisi ullamco sit do laborum exercitation officia ex magna labore. Non consequat magna proident magna anim irure enim dolore excepteur adipisicing officia magna reprehenderit sunt. Nulla nisi sit proident do pariatur irure.

---

## Alerts using blockquotes

> [id='warning' className='text-amber-500'] Containing warning id, classNam and and a scope variable with parantheses, ({title}) description: this document exercises headings, lists, tables, task lists, footnotes, math, MDX, raw HTML, `<details>`/`<summary>`, reference links, images, code blocks, admonitions and more.

> [id='error'] **Containing only id named 'error' and starting with bold text**, Short description: this document exercises headings, lists, tables, task lists, footnotes, math, MDX, raw HTML, `<details>`/`<summary>`, reference links, images, code blocks, admonitions and more.

> [id='info'] Contains only id named 'info', Short {title} description: this document exercises headings, lists, tables, task lists, footnotes, math, MDX, raw HTML, `<details>`/`<summary>`, reference links, images, code blocks, admonitions and more.

> **Contains only blockquote with bold starter without an id**, Short description: this document exercises headings, lists, tables, task lists, footnotes, math, MDX, raw HTML, `<details>`

---

## Lists (ordered, nested, tasks)

### Valid

1. First list item
2. Second list item
3. Third list item

- First list item
- Second list item
- Third list item

1. First list item
   1. First nested list item
   2. Second nested list item
   3. Third nested list item
2. Second list item
3. Third list item

### Invalid

- First list item
  - First nested list item
  - Second nested list item
  - Third nested list item
- Second list item
- Third list item

### Mixed

1. First list item

   - First nested list item
   - Second nested list item
   - Third nested list item

2. Second list item
3. Third list item

---

## Tables

### Simple table (GFM):

| Feature      | Supported | Notes                       |
| ------------ | :-------: | :-------------------------- |
| Headings     |     ✓     | Anchors should be generated |
| Task lists   |     ✓     | Requires GFM                |
| Tables (GFM) |     ✓     | Alignment tested below      |

### Alignment table:

| Left align | Center align |          Right align |
| :--------- | :----------: | -------------------: |
| left       |    center    |                right |
| `code`     |   **bold**   | <small>small</small> |

### Table with code block in cell:

| Query                  | Result            |
| :--------------------- | :---------------- |
| `SELECT * FROM users;` | returns all users |

---

## Images

> [id='warning'] Under Construction 🙂

### Basic (using scope—relative path \{\})

![tiny](https://ytpmpkgcjlcdidphswzv.supabase.co/storage/v1/object/public/banner/pexels-christian-heitz-285904-842711.jpg)

![tiny](https://ytpmpkgcjlcdidphswzv.supabase.co/storage/v1/object/public/banner/pexels-christian-heitz-285904-842711.jpg) [id=space_plus_attr_format]

![tiny](https://ytpmpkgcjlcdidphswzv.supabase.co/storage/v1/object/public/banner/pexels-christian-heitz-285904-842711.jpg)[id=attr_format_without_space]

### Image with wrong formatted attributes using only classname (classname comes first)

### Image with wrong formatted attributes using only classname (id comes first)

![tiny](5) [id=half-scaled-img-id-first className="scale-50"]

### Image With Link but ???

[![tiny](https://ytpmpkgcjlcdidphswzv.supabase.co/storage/v1/object/public/banner/pexels-christian-heitz-285904-842711.jpg)](https://ytpmpkgcjlcdidphswzv.supabase.co/storage/v1/object/public/banner/pexels-christian-heitz-285904-842711.jpg)[target=_blank]

### Image With Link but ??? including attrs

[![tiny](https://ytpmpkgcjlcdidphswzv.supabase.co/storage/v1/object/public/banner/pexels-christian-heitz-285904-842711.jpg)](https://ytpmpkgcjlcdidphswzv.supabase.co/storage/v1/object/public/banner/pexels-christian-heitz-285904-842711.jpg) [id='image-with-link-and-attrs']

---

## Summary / Details

<Details>
  <Summary>Click to expand</Summary>

[id='my-list'] This content is inside `<details>`. You can include **Markdown** inside if your renderer allows HTML with Markdown (some do, some don't).

### Subheading inside details

- a list
- with multiple items

> [id='success'] Tip: headings will be slugged by `rehype-slug`.

1. First list item
2. Second list item

![tiny](https://ytpmpkgcjlcdidphswzv.supabase.co/storage/v1/object/public/banner/pexels-christian-heitz-285904-842711.jpg)

[![tiny](https://ytpmpkgcjlcdidphswzv.supabase.co/storage/v1/object/public/banner/pexels-christian-heitz-285904-842711.jpg)](https://ytpmpkgcjlcdidphswzv.supabase.co/storage/v1/object/public/banner/pexels-christian-heitz-285904-842711.jpg)[target=_blank]

</Details>

---

## Code blocks & Syntax Highlighting

```js
const foo = "bar";
```

```ts
const foo = "bar";
```

```tsx
const foo = "bar";
```

```jsx
const foo = "bar";
```

---

## Checklist

- [x] Item 0
- [ ] Item 1
- [x] Item 2
- [ ] Item 3

---

## Footnotes

[1]: Footnote 1
[2]: Footnote 2
[3]: Footnote 3

---

## Conclusion

1.  ID redirection links works, usage:

```tsx
const foo: string = "bar";
```
