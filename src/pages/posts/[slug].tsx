// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import ReactMarkdown from 'react-markdown';

// export default function PostPage({ frontmatter, content }) {
//   return (
//     <main className="bg-white text-black p-4 sm:p-6 md:p-10">
//       <div className="w-full min-h-screen bg-white text-black p-6">
//         <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "'Abramo', serif" }}>
//           {frontmatter.title}
//         </h1>
//         <p className="text-sm text-gray-500 mb-2">
//           {frontmatter.type} / {frontmatter.category} — by {frontmatter.author}
//         </p>
//         <p className="text-md italic mb-4" style={{ fontFamily: "'Blogger', sans-serif" }}>
//           {frontmatter.description}
//         </p>
//         {frontmatter.image && (
//           <img
//             src={frontmatter.image}
//             alt={frontmatter.title}
//             className="w-full max-h-[500px] object-contain rounded mb-6"
//           />
//         )}
//         <article className="prose prose-lg mx-auto">
//           <ReactMarkdown>{content}</ReactMarkdown>
//         </article>
//       </div>
//     </main>
//   );
// }

// export async function getStaticPaths() {
//   const postsDir = path.join(process.cwd(), 'posts');
//   const filenames = fs.readdirSync(postsDir);

//   const paths = filenames.map(filename => ({
//     params: { slug: filename.replace('.md', '') },
//   }));

//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const postsDir = path.join(process.cwd(), 'posts');
//   const filePath = path.join(postsDir, `${params.slug}.md`);
//   const fileContent = fs.readFileSync(filePath, 'utf-8');

//   const { data: frontmatter, content } = matter(fileContent);

//   return {
//     props: { frontmatter, content },
//   };
// }



// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import ReactMarkdown from 'react-markdown';

// export default function PostPage({ frontmatter, content }) {
//   return (
//     <main className="bg-white text-black">
//       {/* Hero Section with full width image */}
//       <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
//         <img
//           src={frontmatter.image}
//           alt={frontmatter.title}
//           className="w-full h-full object-cover"
//         />
//         {/* Overlay text */}
//         <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: "'Abramo', serif" }}>
//             {frontmatter.title}
//           </h1>
//           <p className="text-md md:text-lg text-gray-200" style={{ fontFamily: "'Blogger', sans-serif" }}>
//             {frontmatter.description}
//           </p>
//         </div>
//       </section>

//       {/* Metadata */}
//       <div className="max-w-3xl mx-auto px-4 py-6 text-sm text-gray-500">
//         {frontmatter.type} / {frontmatter.category} — by {frontmatter.author}
//       </div>

//       {/* Markdown content */}
//       <article className="prose prose-lg prose-slate mx-auto px-4 pb-16" style={{ fontFamily: "'Georgia', serif" }}>
//         <div>
//         <ReactMarkdown>{content}</ReactMarkdown>
//         </div>
//       </article>
//     </main>
//   );
// }

// export async function getStaticPaths() {
//   const postsDir = path.join(process.cwd(), 'posts');
//   const filenames = fs.readdirSync(postsDir);

//   const paths = filenames.map(filename => ({
//     params: { slug: filename.replace('.md', '') },
//   }));

//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const postsDir = path.join(process.cwd(), 'posts');
//   const filePath = path.join(postsDir, `${params.slug}.md`);
//   const fileContent = fs.readFileSync(filePath, 'utf-8');

//   const { data: frontmatter, content } = matter(fileContent);

//   return {
//     props: {
//       frontmatter,
//       content,
//     },
//   };
// }


// pages/posts/[slug].tsx

// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import ReactMarkdown from 'react-markdown';
// import rehypeRaw from 'rehype-raw';
// import Image from 'next/image';
// import { toZonedTime, format } from 'date-fns-tz'; // ✅ Correct import

// type Frontmatter = {
//   title: string;
//   description: string;
//   image: string;
//   category: string;
//   author?: string;
//   type?: string;
//   date: string;
// };

// type PostPageProps = {
//   content: string;
//   frontmatter: Frontmatter;
//   uploadTime: string; // ISO date string
// };

// export default function PostPage({ content, frontmatter, uploadTime }: PostPageProps) {
//   // ✅ Format upload time to IST
//   const zonedDate = toZonedTime(new Date(uploadTime), 'Asia/Kolkata');
//   const formattedDate = format(zonedDate, "dd MMM yyyy, HH:mm '(IST)'");

//   return (
//     <div className="bg-white text-black min-h-screen">
//       <div className="relative w-full h-[26rem] sm:h-[30rem] md:h-[32rem]">
//         <Image
//           src={frontmatter.image}
//           alt={frontmatter.title}
//           fill
//           style={{ objectFit: 'cover' }}
//           priority
//           sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1024px"
//         />
//         <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center bg-black/40">
//           <h1 className="text-5xl font-serif mb-2" style={{ fontFamily: "'Abramo', serif" }}>
//             {frontmatter.title}
//           </h1>
//           <p className="text-lg" style={{ fontFamily: "'Blogger', sans-serif" }}>
//             {frontmatter.description}
//           </p>
//         </div>
//       </div>

//       <article className="max-w-3xl mx-auto px-6 py-12 text-lg leading-8 font-serif">
//         <p className="text-sm italic text-gray-500 mb-6">
//           Published: {formattedDate}
//         </p>

//         <ReactMarkdown
//           rehypePlugins={[rehypeRaw]}
//           components={{
//             h1: ({ ...props }) => <h1 className="text-4xl font-bold mt-10 mb-4" {...props} />,
//             h2: ({ ...props }) => <h2 className="text-3xl font-semibold mt-8 mb-3" {...props} />,
//             h3: ({ ...props }) => <h3 className="text-2xl font-medium mt-6 mb-2" {...props} />,
//             p: ({ ...props }) => <p className="text-lg mb-4 leading-relaxed" {...props} />,
//             ul: ({ ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
//             ol: ({ ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
//             li: ({ ...props }) => <li className="mb-1" {...props} />,
//           }}
//         >
//           {content}
//         </ReactMarkdown>
//       </article>
//     </div>
//   );
// }

// export async function getStaticPaths() {
//   const files = fs.readdirSync(path.join('posts'));

//   const paths = files.map((filename) => ({
//     params: {
//       slug: filename.replace('.md', ''),
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// import { GetStaticPropsContext } from 'next';

// export async function getStaticProps({ params }: GetStaticPropsContext<{ slug: string }>) {
//   const markdownWithMeta = fs.readFileSync(path.join('posts', params!.slug + '.md'), 'utf-8');
//   const { data: frontmatter, content } = matter(markdownWithMeta);

//   const uploadTime = frontmatter.date;

//   return {
//     props: {
//       frontmatter,
//       content,
//       uploadTime,
//     },
//   };
// }

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';
import Link from 'next/link';
import { toZonedTime, format } from 'date-fns-tz';

type Frontmatter = {
  title: string;
  description: string;
  image: string;
  category: string;
  author?: string;
  type?: string;
  date: string;
};

type PostPageProps = {
  content: string;
  frontmatter: Frontmatter;
  uploadTime: string;
};

export default function PostPage({ content, frontmatter, uploadTime }: PostPageProps) {
  const zonedDate = toZonedTime(new Date(uploadTime), 'Asia/Kolkata');
  const formattedDate = format(zonedDate, "dd MMM yyyy, HH:mm '(IST)'");

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="relative w-full h-[26rem] sm:h-[30rem] md:h-[32rem]">
        {/* Simple Home link top-left */}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/" className="text-white text-sm">
            Home
          </Link>
        </div>

        <Image
          src={frontmatter.image}
          alt={frontmatter.title}
          fill
          style={{ objectFit: 'cover' }}
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1024px"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center bg-black/40">
          <h1 className="text-5xl font-serif mb-2" style={{ fontFamily: "'Abramo', serif" }}>
            {frontmatter.title}
          </h1>
          <p className="text-lg" style={{ fontFamily: "'Blogger', sans-serif" }}>
            {frontmatter.description}
          </p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-12 text-lg leading-8 font-serif">
        <p className="text-sm italic text-gray-500 mb-6">
          Published: {formattedDate}
        </p>

        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ ...props }) => <h1 className="text-4xl font-bold mt-10 mb-4" {...props} />,
            h2: ({ ...props }) => <h2 className="text-3xl font-semibold mt-8 mb-3" {...props} />,
            h3: ({ ...props }) => <h3 className="text-2xl font-medium mt-6 mb-2" {...props} />,
            p: ({ ...props }) => <p className="text-lg mb-4 leading-relaxed" {...props} />,
            ul: ({ ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
            ol: ({ ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
            li: ({ ...props }) => <li className="mb-1" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

import { GetStaticPropsContext } from 'next';

export async function getStaticProps({ params }: GetStaticPropsContext<{ slug: string }>) {
  const markdownWithMeta = fs.readFileSync(path.join('posts', params!.slug + '.md'), 'utf-8');
  const { data: frontmatter, content } = matter(markdownWithMeta);

  const uploadTime = frontmatter.date;

  return {
    props: {
      frontmatter,
      content,
      uploadTime,
    },
  };
}

