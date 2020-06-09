import Link from 'next/link';

export default function Header() {
  return (
    <>
      <header>
        <nav class="columns">
          <div class="column">
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
          </div>
          <div class="column">
            <Link href="/">
              <a>gh</a>
            </Link>
            <Link href="/">
              <a>tw</a>
            </Link>
            <Link href="/">
              <a>li</a>
            </Link>
          </div>
        </nav>
      </header>
    </>
  )
}