import Head from 'next/head';
import Header from './Header';
import '../styles/styles.sass'

export default function Layout({ children, pageTitle, ...props}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
      </Head>
      <section className="container">
        <Header />
        <div className="content">{children}</div>
      </section>
      <footer>
        <div class="container">footer things</div>
      </footer>
    </>
  )
};