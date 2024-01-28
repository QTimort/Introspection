import { Introspection } from '@/components/Introspection'
import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Introspection by Timort',
  applicationName: 'Introspection by Timort',
  icons: {
    icon: '/favicons/favicon.png',
  },
}

export default function Home() {
  return (
    <div className={''}>
      <main className="">
        <Introspection/>
      </main>
    </div>
  )
}
