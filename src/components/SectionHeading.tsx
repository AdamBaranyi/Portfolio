interface SectionHeadingProps {
  index: string;
  title: string;
}

export default function SectionHeading({ index, title }: SectionHeadingProps) {
  return (
    <div className="section-heading reveal">
      <span className="index">{index}</span>
      <h2>{title}</h2>
      <div className="line" aria-hidden="true" />
    </div>
  );
}
