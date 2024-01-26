import Head from 'next/head'
import { Introspection } from '@/components/Introspection'

export default function Home() {
  return (
    <div className={''}>
      <Head>
        <title>Introspection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <Introspection />
      </main>
    </div>
  )
}
