import Layout from '../components/Layout';

const Index = ({ title, description, ...props }) => {
  return (
    <Layout pageTitle={title}>
      <h1 className="title">Kate Green</h1>
      <p className="description">
        {description}
      </p>
      <main>
        Posts here.
      </main>
    </Layout>
  )
}

export default Index;

export async function getStaticProps() {
  const configData = await import('../config.json');

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description
    }
  }
}