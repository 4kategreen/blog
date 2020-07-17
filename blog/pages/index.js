import matter from 'gray-matter';

import Layout from '../components/Layout';
import PostList from '../components/PostList';

const Index = ({ posts, title, description, menuItems, ...props }) => {
  return (
    <Layout pageTitle={title} menuItems="menuItems">
      <h1 className="title">{title}</h1>
      <p className="subtitle">
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
        meta: document.data,
        body: document.content,
        slug
      };
    });

    return data;
  })(require.context('../posts', true, /\.md$/));

  // sort desc
  posts.sort((a,b) => {
    if (a.meta.date < b.meta.date) {
      return 1;
    } else {
      return -1;
    }
  });

  return {
    props: {
      posts,
      title: config.default.title,
      description: config.default.description,
      menuItems: config.default.menuItems
    }
  }
}