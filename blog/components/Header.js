import Link from 'next/link';

export default function Header() {
  return (
    <>
      <header className="header">
        <nav className="nav">
          <Link href="/">
            <a>img</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/categories">
            <a>Categories</a>
          </Link>
          <Link href="/archives">
            <a>Archives</a>
          </Link>
        </nav>
      </header>
    </>
  )
}