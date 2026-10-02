/** Metni harflere böler; her harf sırayla bulanıklıktan netleşerek belirir. */
export default function SplitText({ text, start = 0, className = "" }: { text: string; start?: number; className?: string }) {
  return (
    <span className={className} aria-label={text} role="text" style={{ "--start": `${start}ms` } as React.CSSProperties}>
      {Array.from(text).map((ch, i) => (
        <span key={i} aria-hidden className="letter" style={{ "--i": i } as React.CSSProperties}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}
