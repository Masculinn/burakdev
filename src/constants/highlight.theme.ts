import type { ThemeRegistration } from "@shikijs/core";

/**
 * Placeholder hex
 */
const c = {
  plain: "#000001",
  bg: "#000002",
  comment: "#000003",
  punctuation: "#000004",
  bracket: "#000005",
  keyword: "#000006",
  operator: "#000007",
  ternary: "#000008",
  string: "#000009",
  fn: "#00000a",
  type: "#00000b",
  number: "#00000c",
  constant: "#00000d",
  tag: "#00000e",
  component: "#00000f",
  attr: "#000010",
  key: "#000011",
  regex: "#000012",
  escape: "#000013",
  inserted: "#000014",
  deleted: "#000015",
} as const;

const theme = {
  name: "syntax-theme",
  type: "dark",
  fg: c.plain,
  bg: c.bg,
  colorReplacements: {
    [c.plain]: "var(--syntax-plain)",
    [c.bg]: "var(--syntax-bg)",
    [c.comment]: "var(--syntax-comment)",
    [c.punctuation]: "var(--syntax-punctuation)",
    [c.bracket]: "var(--syntax-bracket)",
    [c.keyword]: "var(--syntax-keyword)",
    [c.operator]: "var(--syntax-operator)",
    [c.ternary]: "var(--syntax-ternary)",
    [c.string]: "var(--syntax-string)",
    [c.fn]: "var(--syntax-function)",
    [c.type]: "var(--syntax-type)",
    [c.number]: "var(--syntax-number)",
    [c.constant]: "var(--syntax-constant)",
    [c.tag]: "var(--syntax-tag)",
    [c.component]: "var(--syntax-component)",
    [c.attr]: "var(--syntax-attr)",
    [c.key]: "var(--syntax-key)",
    [c.regex]: "var(--syntax-regex)",
    [c.escape]: "var(--syntax-escape)",
    [c.inserted]: "var(--syntax-inserted)",
    [c.deleted]: "var(--syntax-deleted)",
  },
  tokenColors: [
    // ── Identifiers (variables, params, members, JSX text, JSX delimiters)
    {
      scope: [
        "variable",
        "variable.parameter",
        "variable.other.property",
        "variable.other.object.property",
        "variable.object.property",
        "support.variable",
        "support.constant.math",
        "support.constant.json",
        "support.type.object",
        "meta.jsx.children",
        "punctuation.definition.tag",
      ],
      settings: { foreground: c.plain },
    },

    // ── Object literal keys: { once: false }
    {
      scope: ["meta.object-literal.key", "support.type.property-name"],
      settings: { foreground: c.key },
    },

    // ── Comments & JSDoc
    {
      scope: [
        "comment",
        "punctuation.definition.comment",
        "punctuation.definition.block.tags.jsdoc",
        "entity.name.type.instance.jsdoc",
        "variable.other.jsdoc",
        "storage.type.class.jsdoc",
      ],
      settings: { foreground: c.comment, fontStyle: "italic" },
    },

    // ── Brackets: (), [], {}, <T>, destructuring, JSX expression braces
    {
      scope: [
        "meta.brace.round",
        "meta.brace.square",
        "punctuation.definition.block",
        "punctuation.definition.parameters",
        "punctuation.definition.typeparameters",
        "punctuation.definition.binding-pattern",
        "punctuation.section.embedded",
      ],
      settings: { foreground: c.bracket },
    },

    // ── Punctuation: , ; . : ... ?: |
    {
      scope: [
        "punctuation.separator",
        "punctuation.terminator",
        "punctuation.accessor",
        "punctuation.definition.template-expression",
        "keyword.operator.type",
        "keyword.operator.type.annotation",
        "keyword.operator.optional",
        "keyword.operator.definiteassignment",
        "keyword.operator.spread",
        "keyword.operator.rest",
        "keyword.operator.quantifier.regexp",
      ],
      settings: { foreground: c.punctuation },
    },

    // ── Operators: = === > || + ! ??
    {
      scope: ["keyword.operator"],
      settings: { foreground: c.operator },
    },

    // ── Ternary: ? :
    {
      scope: ["keyword.operator.ternary"],
      settings: { foreground: c.ternary },
    },

    // ── Keywords / storage / arrow
    {
      scope: [
        "keyword",
        "keyword.control",
        "keyword.operator.new",
        "keyword.operator.expression",
        "storage",
        "storage.type",
        "storage.type.function.arrow",
        "storage.modifier",
        "variable.language",
      ],
      settings: { foreground: c.keyword },
    },

    // ── Functions & calls
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.decorator",
        "punctuation.decorator",
      ],
      settings: { foreground: c.fn },
    },

    // ── Types, classes, generics
    {
      scope: [
        "entity.name.type",
        "entity.name.type.module",
        "entity.name.class",
        "entity.name.namespace",
        "entity.other.inherited-class",
        "support.class",
        "support.type",
      ],
      settings: { foreground: c.type },
    },

    // ── Primitive types: string, number, unknown, ...
    {
      scope: ["support.type.primitive", "support.type.builtin"],
      settings: { foreground: c.constant },
    },

    // ── Numbers & CSS units
    {
      scope: ["constant.numeric", "keyword.other.unit"],
      settings: { foreground: c.number },
    },

    // ── Language constants: true false null undefined NaN Infinity, enum members
    {
      scope: ["constant.language", "variable.other.enummember"],
      settings: { foreground: c.constant },
    },

    // ── JSX / HTML tags
    {
      scope: ["entity.name.tag"],
      settings: { foreground: c.tag },
    },
    {
      scope: ["support.class.component"],
      settings: { foreground: c.component },
    },
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: c.attr },
    },

    // ── Strings (quotes and template backticks inherit)
    {
      scope: [
        "string",
        "string.quoted",
        "string.template",
        "support.constant.property-value",
        "support.constant.font-name",
        "constant.other.color",
      ],
      settings: { foreground: c.string },
    },

    // ── Regex body & flags
    {
      scope: ["string.regexp", "keyword.other.tsx"],
      settings: { foreground: c.regex },
    },

    // ── Escapes & regex tokens: \n \w \d ^ $ ( ) [ ] |
    {
      scope: [
        "constant.character.escape",
        "constant.character.numeric.regexp",
        "constant.other.character-class.regexp",
        "constant.other.character-class.set.regexp",
        "constant.other.character-class.range.regexp",
        "keyword.control.anchor.regexp",
        "keyword.operator.or.regexp",
        "keyword.operator.negation.regexp",
        "keyword.other.back-reference.regexp",
        "punctuation.definition.group.regexp",
        "punctuation.definition.character-class.regexp",
        "support.other.parenthesis.regexp",
      ],
      settings: { foreground: c.escape },
    },

    // ── Diff / invalid
    {
      scope: [
        "markup.inserted",
        "meta.diff.header.to-file",
        "punctuation.definition.inserted",
      ],
      settings: { foreground: c.inserted },
    },
    {
      scope: [
        "markup.deleted",
        "meta.diff.header.from-file",
        "punctuation.definition.deleted",
        "invalid",
        "invalid.illegal",
      ],
      settings: { foreground: c.deleted },
    },
  ],
} satisfies ThemeRegistration;

export default theme;
