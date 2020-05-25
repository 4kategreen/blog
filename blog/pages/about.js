import Layout from '../components/Layout';

const About = ({ title, description, ...props }) => {
  return (
    <>
      <Layout pageTitle={`${title} | About`} description={description}>
        <h1 className="title">About Me</h1>

        <p className="description">
          {description}
        </p>

        <p>
          Other Stuff
        </p>
      </Layout>
    </>
  )
}

export default About;

export async function getStaticProps() {
  const config = await import('../config.json');

  return {
    props: {
      title: config.default.title,
      description: config.default.description
    }
  }
}