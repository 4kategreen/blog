import Link from 'next/link';
import matter from 'gray-matter';

import Layout from '../components/Layout';

const Categories = ({ tags }) => {
  return (
    <>
      <Layout pageTitle={`Categories`}>
        <ul>
          {tags && 
            tags.map((tag) => {
              return ( 
                <li key={tag.name}>{tag.name}
                  <ul>
                    {tag.posts &&
                      tag.posts.map((post) => {
                        return (
                          <Link href={post.slug}>
                            <li key={post.slug}><a>{post.title}</a></li>
                          </Link>
                        )
                      })
                    }
                  </ul>
                </li>
              )
            })
          }
        </ul>
      </Layout>
    </>
  )
}

export default Categories;

export async function getStaticProps() {
  const posts = (context => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3);
      const value = values[index];
      const document = matter(value.default);

      return {
        details: {
          title: document.data.title,
          slug
        },
        tags: document.data.tags
      }
    });

    return data;
  })(require.context('../posts', true, /\.md$/))

  return {
    props: {
      tags: categorize(posts)
    }
  }
}

function categorize(posts) {
  let tagList = [];
  for (let post of posts) {
    for (let tag of post.tags) {
      tag = toTitleCase(tag);
      const index = tagList.findIndex(element => element.name === tag);

      if (index === -1) {
        tagList.push({
          name: tag,
          posts: [post.details]
        });
      } else {
        tagList[index].posts.push(post.details);
      }
    }
  }

  tagList.sort((a,b) => {
    if (a.name.toUpperCase() < b.name.toUpperCase()) {
      return -1;
    } else {
      return 1;
    }
  });

  return tagList;
}

function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}