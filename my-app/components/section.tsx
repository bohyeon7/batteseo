export default function Section({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="border-2 mx-auto max-w-screen-lg w-full">
      {children}
    </div>
  )
}