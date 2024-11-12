'use client'
import { Image } from "antd";
import { format } from "date-fns";
import Link from "next/link";

const SingleBlog = ({ blog }: any) => {

  return (
    <div className="wow fadeInUp group mb-10" data-wow-delay=".1s">
      <div className="mb-8 overflow-hidden rounded">
        <Link href={`/blogs/${blog?.id}`} aria-label="blog cover" className="block">
          <Image
            src={blog?.blog_image}
            alt="image"
            className="w-full transition group-hover:rotate-6 group-hover:scale-125"
            width={408}
            height={272}
            preview={false}
          />
        </Link>
      </div>
      <div>
        <span className="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
          {format(new Date(blog?.created_at), "dd MMM yyyy")}
        </span>
        <h3>
          <Link
            href={`/blogs/${blog?.id}`} // Use the slug here
            className="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl"
          >
            {blog?.title}
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default SingleBlog;
