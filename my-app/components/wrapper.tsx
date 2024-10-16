export default function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="border-2 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {children}
    </div>
  )
}