import '@/styles/global.css'
import 'tailwindcss/tailwind.css'
export const metadata = {
  title: 'Introspection by Timort',
  description: 'Introspection Art',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en" className={''}>
      <body className={'flex justify-center items-center h-screen bg-neutral-900 w-screen'}>
        {children}
      </body>
    </html>
  )
}
