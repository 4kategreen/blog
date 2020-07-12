import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

const shortenedPostSplit = '<!-- more -->';

export default function PostList({ posts }) {
  if (posts === 'undefined') return null;

  return (
    <div>
      {!posts && <div>No posts!</div>}
        {posts &&
          posts.map((post) => {
            const d = post.meta.date.split('-');
            const date = new Date(d[0], d[1], d[2]);

            return (
              <>
                <h2 key={post.slug}>
                  <Link href={{ pathname: `/post/${post.slug}` }}>
                    <a>{post.meta.title}</a>
                  </Link>
                </h2>
                <h4>{date.toLocaleDateString()}</h4>
                <div>
                  <ReactMarkdown source={post.body.split(shortenedPostSplit)[0]} />
                  <Link href={{ pathname: `/post/${post.slug}` }}>
                    <a>read more</a>
                  </Link>
                </div>
              </>
            );
          })
        }
    </div>
  )
}