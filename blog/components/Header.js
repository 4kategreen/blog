import Link from 'next/link';

export default function Header({ pageTitle, menuItems }) {
  return (
    <>
      <header>
        <nav class="navbar is-dark">
          <div class="navbar-brand">
            <Link href="/">
              <a class="navbar-item">img</a>
            </Link>
            <h1>{pageTitle}</h1>

            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div class="navbar-menu">
            <div class="navbar-start">
              <Link href="/about">
                <a class="navbar-item">About</a>
              </Link>
              <Link href="/categories">
                <a class="navbar-item">Categories</a>
              </Link>
              <Link href="/archives">
                <a class="navbar-item">Archives</a>
              </Link>
            </div>
            <div class="navbar-end">
              <Link href="/">
                <a class="navbar-item">gh</a>
              </Link>
              <Link href="/">
                <a class="navbar-item">tw</a>
              </Link>
              <Link href="/">
                <a class="navbar-item">li</a>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}