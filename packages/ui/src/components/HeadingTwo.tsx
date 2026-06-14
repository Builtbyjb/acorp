export default function HeadingTwo({ title }: { title: string }) {
  return (
    <h2
      className="animate-fade-up font-bold tracking-tight mb-5"
      style={{
        fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
        color: "#0f172a",
        lineHeight: 1,
        animationDelay: "0.12s",
      }}
    >
      {title}
    </h2>
  );
}
