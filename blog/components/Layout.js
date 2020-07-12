import Head from 'next/head';
import Header from './Header';
import '../styles/styles.sass'

export default function Layout({ children, pageTitle, menuItems, ...props}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
      </Head>
      <section className="container">
        <Header pageTitle="pageTitle" menuItems="menuItems" />
        <div className="content">{children}</div>
      </section>
      <footer className="container">
        <div className="column">footer things</div>
      </footer>
    </>
  )
};