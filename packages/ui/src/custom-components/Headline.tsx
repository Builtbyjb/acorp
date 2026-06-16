type Props = {
  start: string;
  end: string;
};

export default function Headline({ start, end }: Props) {
  return (
    <h1
      className="animate-fade-up font-bold leading-[0.87] tracking-[-0.04em] mb-7"
      style={{
        fontSize: "clamp(3.5rem, 9vw, 5rem)",
        color: "#000000",
        animationDelay: "0.12s",
      }}
    >
      {start}{" "}
      <span className="text-outline" style={{ color: "#000000" }}>
        {end}
      </span>
    </h1>
  );
}
