/**
 * Renders **double-asterisk** phrases in a content string as highlighted
 * emphasis, so copy in content/ can stay plain text.
 */
export function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="ink-mark">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}
