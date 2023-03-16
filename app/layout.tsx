import './globals.css'

export const metadata = {
  title: 'Countdown Timer',
  description: 'Countdown timer for all of your time tracking needs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
