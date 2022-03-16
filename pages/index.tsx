import type { NextPage, NextPageContext } from 'next'
import Link from 'next/link'
import { endpoint } from '../config/endpoint'
import styles from '../styles/Home.module.css'

Home.getInitialProps = async (ctx: NextPageContext) => {
  let tacosJson: any = []
  tacosJson = await getFetchData(endpoint + '/api/tacos', ctx)

  return {
    tacos: tacosJson,
  }
}

async function getFetchData(url: string, ctx: NextPageContext) {
  const resp = await fetch(url)
  return await resp.json()
}

export default function Home() {
  return (
    <div className={styles.container}>

      <span>
        <Link href={'/demo-1'}>
          Demo 1
        </Link>
      </span>

      <span>
        <Link href={'/demo-2'}>
          Demo 2
        </Link>
      </span>

    </div>
  )
}