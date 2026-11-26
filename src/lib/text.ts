export type Word = {
  text: string;
  em: boolean;
  /** True when no space precedes this word (e.g. a comma right after an emphasised phrase). */
  glue: boolean;
};

/** Splits copy into words, treating `*wrapped*` text as an emphasised phrase. */
export function parseWords(input: string): Word[] {
  const words: Word[] = [];
  let previousEndsWithSpace = true;

  input.split(/(\*[^*]+\*)/g).forEach((part) => {
    if (!part) return;
    const em = part.startsWith("*") && part.endsWith("*");
    const clean = em ? part.slice(1, -1) : part;
    const tokens = clean.split(/\s+/).filter(Boolean);
    const startsWithSpace = /^\s/.test(clean);

    tokens.forEach((text, index) => {
      const glue =
        index === 0 && words.length > 0 && !startsWithSpace && !previousEndsWithSpace;
      words.push({ text, em, glue });
    });

    if (tokens.length > 0) previousEndsWithSpace = /\s$/.test(clean);
  });

  return words;
}

export function stripEmphasis(input: string): string {
  return input.replace(/\*/g, "");
}
