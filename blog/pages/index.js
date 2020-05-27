import matter from 'gray-matter';

import Layout from '../components/Layout';
import PostList from '../components/PostList';

const Index = ({ posts, title, description, ...props }) => {
  return (
    <Layout pageTitle={title}>
      <h1 className="title">Kate Green</h1>
      <p className="description">
        {description}
      </p>
      <main>
        <PostList posts={posts} />
      </main>
    </Layout>
  )
}

export default Index;

export async function getStaticProps() {
  const config = await import('../config.json');

  const posts = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3);
      const value = values[index];
      const document = matter(value.default);
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug
      };
    });

    return data;
  })(require.context('../posts', true, /\.md$/));

  return {
    props: {
      posts,
      title: config.default.title,
      description: config.default.description
    }
  }
}