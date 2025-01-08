export default function DisplayText({
  text, className
}: {
  text: string, className?: string
}) {
  const line = text.split('<br>');
  return (
    <div>
      {line.map((line, index) => (
        <p className={className} key={index}>{line}</p>
      ))}
    </div>
  )
}