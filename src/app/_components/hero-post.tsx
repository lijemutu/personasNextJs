import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";
import { Post } from "@/interfaces/post";

type Props = {
  posts: Post[];
};

export function HeroPost(
  { posts }: Props) {
  return (
    <section>
      <div className=" mx-20 md:mx-[600px] ">
        {
          posts.map((post) => (
            <div className="my-20">
              <h3 className="mb-4 text-4xl lg:text-5xl leading-tight font-semibold">
                <Link href={`/posts/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h3>
              <div className="mb-4 md:mb-0 text-lg">
                <DateFormatter dateString={post.date} />
              </div>
            </div>
          ))
        }

      </div>
    </section>
  );
}
