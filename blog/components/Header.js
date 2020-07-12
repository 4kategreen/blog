import Link from 'next/link';

export default function Header({ pageTitle, menuItems }) {
  return (
    <>
      <header>
        <nav className="navbar is-dark">
          <div className="navbar-brand">
            <Link href="/">
              <a className="navbar-item">img</a>
            </Link>
            <h1>{pageTitle}</h1>

            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <Link href="/about">
                <a className="navbar-item">About</a>
              </Link>
              <Link href="/categories">
                <a className="navbar-item">Categories</a>
              </Link>
            </div>
            <div className="navbar-end">
              <Link href="/">
                <a className="navbar-item">gh</a>
              </Link>
              <Link href="/">
                <a className="navbar-item">tw</a>
              </Link>
              <Link href="/">
                <a className="navbar-item">li</a>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}