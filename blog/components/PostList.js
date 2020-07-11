import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function PostList({ posts }) {
  if (posts === 'undefined') return null;

  return (
    <div>
      {!posts && <div>No posts!</div>}
        {posts &&
          posts.map((post) => {
            return (
              <>
                <h2 key={post.slug}>
                  <Link href={{ pathname: `/post/${post.slug}` }}>
                    <a>{post.frontmatter.title}</a>
                  </Link>
                </h2>
                <div>
                  <ReactMarkdown source={post.shortMarkdownBody} />
                  <Link href={{ pathname: `/post/${post.slug}` }}>
                    <a>more</a>
                  </Link>
                </div>
              </>
            );
          })
        }
    </div>
  )
}