import Link from 'next/link'
import styles from '../styles/Home.module.css'

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

      <span>
        <Link href={'/demo-3'}>
          Demo 3
        </Link>
      </span>

      <span>
        <Link href={'/aG90ZWxlc19wbGF6YQ0K/admin'}>
          Admin
        </Link>
      </span>

    </div>
  )
}