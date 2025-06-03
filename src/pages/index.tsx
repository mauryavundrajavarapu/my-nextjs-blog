// // pages/index.tsx
// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import Link from 'next/link';
// import { useState } from 'react';

// export default function Home({ posts }) {
//   const [category, setCategory] = useState('All');

//   const filtered = category === 'All' ? posts : posts.filter(p => p.frontmatter.category === category);

//   return (
//     <div className="w-full min-h-screen bg-white text-black p-6">
//       {/* Title with 'Abramo' or serif fallback */}
//       <h1 className="text-5xl font-serif text-center my-6" style={{ fontFamily: "'Abramo', serif" }}>
//         Maurya's Mind
//       </h1>

//       {/* Subtitle with 'Cabin Sketch' or cursive fallback */}
//       <h2 className="text-3xl text-center mb-2" style={{ fontFamily: "'Cabin Sketch', cursive" }}>
//         BOOKS MOVIES THOUGHTS
//       </h2>

//       {/* Description with 'Blogger' or sans-serif fallback */}
//       <p className="text-center mb-8" style={{ fontFamily: "'Blogger', sans-serif" }}>
//         Books, movies, thoughts and much more, this is where I unpack them all, one post at a time.
//       </p>

//       {/* Category buttons */}
//       <div className="flex justify-center gap-4 mb-8">
//         {['All', 'Books', 'Movies', 'Thoughts'].map(cat => (
//           <button
//             key={cat}
//             onClick={() => setCategory(cat)}
//             className={`px-5 py-2 rounded-full font-semibold transition
//               ${
//                 category === cat
//                   ? 'bg-black text-white'
//                   : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
//               }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Posts grid */}
//       <div className="grid md:grid-cols-3 gap-8">
//         {filtered.map(({ slug, frontmatter }) => (
//           <Link key={slug}
//             href={`/posts/${slug}`}
//             className="block shadow-md hover:shadow-lg rounded overflow-hidden transition"
//               >
//               <img
//                 src={frontmatter.image}
//                 alt={frontmatter.title}
//                 className="w-full max-h-48 object-contain rounded bg-gray-100"
//               />
//               <div className="p-4 bg-white">
//                 <p className="text-sm text-gray-500">
//                   {frontmatter.type} / {frontmatter.category}
//                 </p>
//                 <h3 className="text-lg font-bold mt-1" style={{ fontFamily: "'Abramo', serif" }}>
//                   {frontmatter.title}
//                 </h3>
//                 <p className="text-sm text-gray-700 mt-1" style={{ fontFamily: "'Blogger', sans-serif" }}>
//                   {frontmatter.description}
//                 </p>
//                 <p className="mt-2 text-sm text-gray-600 italic">{frontmatter.author}</p>
//               </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export async function getStaticProps() {
//   const postsDir = path.join(process.cwd(), 'posts');
//   const files = fs.readdirSync(postsDir);

//   const posts = files.map(filename => {
//     const slug = filename.replace('.md', '');
//     const markdownWithMeta = fs.readFileSync(path.join(postsDir, filename), 'utf-8');
//     const { data: frontmatter } = matter(markdownWithMeta);

//     return {
//       slug,
//       frontmatter,
//     };
//   });

//   return {
//     props: {
//       posts,
//     },
//   };
// }

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

type Post = {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    description: string;
    category: string;
    image: string;
    author?: string;
    type?: string;
    [key: string]: any; // for any other optional frontmatter fields
  };
};

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  const [category, setCategory] = useState('All');

  const filtered =
    category === 'All'
      ? posts
      : posts.filter((p) => p.frontmatter.category === category);

  return (
    <div className="w-full min-h-screen bg-white text-black p-6">
      <h1
        className="text-5xl font-serif text-center my-6"
        style={{ fontFamily: "'Abramo', serif" }}
      >
        Maurya&apos;s Mind
      </h1>

      <h2
        className="text-3xl text-center mb-2"
        style={{ fontFamily: "'Cabin Sketch', cursive" }}
      >
        BOOKS MOVIES THOUGHTS STORIES
      </h2>

      <p
        className="text-center mb-8"
        style={{ fontFamily: "'Blogger', sans-serif" }}
      >
        Books, movies, thoughts, stories and much more, this is where I unpack
        them all, one post at a time.
      </p>

      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {['All', 'Books', 'Movies', 'Thoughts', 'Stories'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              category === cat
                ? 'bg-black text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {filtered.map(({ slug, frontmatter }) => (
          <Link
            key={slug}
            href={`/posts/${slug}`}
            className="block shadow-md hover:shadow-lg rounded overflow-hidden transition"
          >
            <Image
              src={frontmatter.image}
              alt={frontmatter.title}
              width={400}         // Adjust these as needed
              height={200}        // Adjust these as needed
              className="w-full max-h-48 object-contain rounded bg-gray-100"
            />
            <div className="p-4 bg-white">
              <p className="text-sm text-gray-500">
                {frontmatter.type ?? ''} / {frontmatter.category}
              </p>
              <h3
                className="text-lg font-bold mt-1"
                style={{ fontFamily: "'Abramo', serif" }}
              >
                {frontmatter.title}
              </h3>
              <p
                className="text-sm text-gray-700 mt-1"
                style={{ fontFamily: "'Blogger', sans-serif" }}
              >
                {frontmatter.description}
              </p>
              {frontmatter.author && (
                <p className="mt-2 text-sm text-gray-600 italic">
                  {frontmatter.author}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'));

  const posts: Post[] = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  // Sort posts by date descending
  posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );

  return {
    props: {
      posts,
    },
  };
}

