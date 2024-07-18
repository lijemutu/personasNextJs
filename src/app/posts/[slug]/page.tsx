import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  let content = await markdownToHtml(post.content || "");

  content = processMediaLinks(content);
  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
function processMediaLinks(content: string): string {
  const imageRegex = /https?:\/\/\S+\.(jpg|png)/g;
  const youtubeRegex = /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/g;
  const linkRegex = /https?:\/\/\S+/g;
  // console.log(content);
  return content.replace(linkRegex, (match) => {
    match = match.replace('</p>', '')
    // console.log(match).

    // Reset lastIndex for each regex
    imageRegex.lastIndex = 0;
    youtubeRegex.lastIndex = 0;

    if (imageRegex.test(match)) {
      // console.log(match)
      // If it's an image link, replace with an image tag
      return `<img src="${match}" alt="Image" />`;
    } else if (youtubeRegex.test(match)) {
      // If it's a YouTube link, replace with an embedded iframe
      // console.log(match.match(youtubeRegex))
      const url = new URL(match);
      const videoId = url.searchParams.get("v");
      const iframeSrc = `https://www.youtube.com/embed/${videoId}`;
      return `<iframe width="560" height="315" src="${iframeSrc}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    } else {
      // console.log(match)
      // Otherwise, wrap it in an anchor tag
      return `<a href="${match}" target="_blank">${match}</a>`;
    }
  });
}

