import React from "react";

/**
 * Parser Markdown ultra-minimal — zéro dépendance.
 *
 * Supporte uniquement :
 *  - paragraphes (séparés par lignes vides)
 *  - listes à puces : lignes commençant par "- "
 *  - listes numérotées : lignes commençant par "1. "
 *  - sous-titres : "### Titre" → <h3>
 *  - sous-sous-titres : "#### Titre" → <h4>
 *  - gras : **texte**
 *  - italique : *texte*
 *  - liens : [texte](url)
 *  - citations : > ligne → <blockquote>
 *
 * On évite volontairement react-markdown / remark pour rester sans dépendance.
 */

type Block =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "h4"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "quote"; text: string };

function tokenize(md: string): Block[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();

    if (!line) {
      i++;
      continue;
    }

    if (line.startsWith("#### ")) {
      blocks.push({ kind: "h4", text: line.slice(5).trim() });
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ kind: "h3", text: line.slice(4).trim() });
      i++;
      continue;
    }

    if (line.startsWith("> ")) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        buf.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push({ kind: "quote", text: buf.join(" ") });
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push({ kind: "ul", items });
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      blocks.push({ kind: "ol", items });
      continue;
    }

    // Paragraphe : agrège jusqu'à la prochaine ligne vide
    const buf: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith("- ") &&
      !lines[i].trim().startsWith("> ") &&
      !/^\d+\.\s/.test(lines[i].trim())
    ) {
      buf.push(lines[i].trim());
      i++;
    }
    blocks.push({ kind: "p", text: buf.join(" ") });
  }

  return blocks;
}

/**
 * Inline formatting — bold, italic, links.
 * Renvoie un tableau de ReactNode.
 */
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  // 1. Liens [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  let nodeKey = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > cursor) {
      parts.push(
        ...formatBoldItalic(text.slice(cursor, match.index), `${keyPrefix}-${nodeKey++}`),
      );
    }
    const isExternal = /^https?:\/\//.test(match[2]);
    parts.push(
      <a
        key={`${keyPrefix}-link-${nodeKey++}`}
        href={match[2]}
        className="text-joel-violet hover:underline font-medium"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {match[1]}
      </a>,
    );
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) {
    parts.push(...formatBoldItalic(text.slice(cursor), `${keyPrefix}-${nodeKey++}`));
  }
  return parts;
}

function formatBoldItalic(text: string, keyPrefix: string): React.ReactNode[] {
  // Bold first (**…**), then italic (*…*) sur le résidu.
  const out: React.ReactNode[] = [];
  let cursor = 0;
  let nodeKey = 0;
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let match: RegExpExecArray | null;

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > cursor) {
      out.push(...formatItalicOnly(text.slice(cursor, match.index), `${keyPrefix}-b-${nodeKey++}`));
    }
    out.push(
      <strong key={`${keyPrefix}-strong-${nodeKey++}`} className="font-semibold text-gray-900">
        {match[1]}
      </strong>,
    );
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) {
    out.push(...formatItalicOnly(text.slice(cursor), `${keyPrefix}-rest-${nodeKey++}`));
  }
  return out;
}

function formatItalicOnly(text: string, keyPrefix: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let cursor = 0;
  let nodeKey = 0;
  const italicRegex = /(?<!\*)\*([^*]+)\*(?!\*)/g;
  let match: RegExpExecArray | null;

  while ((match = italicRegex.exec(text)) !== null) {
    if (match.index > cursor) {
      out.push(<React.Fragment key={`${keyPrefix}-t-${nodeKey++}`}>{text.slice(cursor, match.index)}</React.Fragment>);
    }
    out.push(
      <em key={`${keyPrefix}-em-${nodeKey++}`} className="italic">
        {match[1]}
      </em>,
    );
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) {
    out.push(<React.Fragment key={`${keyPrefix}-end-${nodeKey++}`}>{text.slice(cursor)}</React.Fragment>);
  }
  return out;
}

/**
 * Rend un texte Markdown en JSX.
 * Tone-mapped pour le design system Joël (couleurs, typo).
 */
export function Markdown({ children }: { children: string }) {
  const blocks = tokenize(children);
  return (
    <>
      {blocks.map((block, idx) => {
        switch (block.kind) {
          case "h3":
            return (
              <h3
                key={`h3-${idx}`}
                className="font-display text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-4"
              >
                {renderInline(block.text, `h3-${idx}`)}
              </h3>
            );
          case "h4":
            return (
              <h4
                key={`h4-${idx}`}
                className="font-display text-lg md:text-xl font-semibold text-gray-900 mt-6 mb-3"
              >
                {renderInline(block.text, `h4-${idx}`)}
              </h4>
            );
          case "p":
            return (
              <p
                key={`p-${idx}`}
                className="text-gray-700 leading-relaxed mb-4 text-base md:text-[17px]"
              >
                {renderInline(block.text, `p-${idx}`)}
              </p>
            );
          case "ul":
            return (
              <ul key={`ul-${idx}`} className="list-disc pl-6 mb-5 space-y-2 text-gray-700">
                {block.items.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    {renderInline(item, `ul-${idx}-${i}`)}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={`ol-${idx}`} className="list-decimal pl-6 mb-5 space-y-2 text-gray-700">
                {block.items.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    {renderInline(item, `ol-${idx}-${i}`)}
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote
                key={`q-${idx}`}
                className="border-l-4 border-joel-violet/40 pl-5 my-6 italic text-gray-700"
              >
                {renderInline(block.text, `q-${idx}`)}
              </blockquote>
            );
        }
      })}
    </>
  );
}
