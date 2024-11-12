"use client";
import { Image } from "antd";
import axios from "axios";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import CommentBox from "../Comment";

type Props = {
  params: { id: number };
};

const BlogPost = ({ params }: Props) => {
  const [user, setUser] = useState<any>(null);
  const [blogData, setBlogData] = useState<any>(null);

  useEffect(() => {
    const isAnyOneLogin = localStorage.getItem("login_user_data");
    if (isAnyOneLogin) {
      const userData = JSON.parse(isAnyOneLogin);
      setUser(userData);
    }
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3333/getSingleBlog/${params.id}`,
        );
        setBlogData(response.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };
    fetchBlogData();
  }, [params.id]);

  if (!blogData) {
    return <p>Loading...</p>;
  }

  const { title, blog_image, content, created_at, profile_picture, name } =
    blogData;

  return (
    <div className="px-4 md:px-8 lg:px-16 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
      {/* Blog Section */}
      <section className="container mx-auto">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp relative z-20 mb-10 h-[200px] overflow-hidden rounded md:h-[300px] lg:h-[400px]"
              data-wow-delay=".1s"
            >
              <Image
                src={blog_image}
                alt="image"
                width={1288}
                height={400}
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute left-0 top-0 z-10 flex h-full w-full items-end bg-gradient-to-t from-dark-700 to-transparent">
                <div className="flex flex-wrap items-center p-4 pb-4 sm:p-8">
                  <div className="mb-4 mr-5 flex items-center md:mr-10">
                    <div className="mr-4 h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={
                          profile_picture ??
                          "/images/team/blank-profile-picture-973460_640.png"
                        }
                        alt="image"
                        className="w-full"
                        width={40}
                        height={40}
                      />
                    </div>
                    <p className="text-base font-medium text-white">
                      By{" "}
                      <Link href="/#" className="text-white hover:opacity-70">
                        {name ?? ""}
                      </Link>
                    </p>
                  </div>
                  <div className="mb-4 flex items-center">
                    <p className="mr-5 flex items-center text-sm font-medium text-white md:mr-6">
                      <span className="mr-3">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="fill-current"
                        >
                          <path d="..." />
                        </svg>
                      </span>
                      {format(new Date(created_at), "dd MMM yyyy")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4">
                <div className="blog-details">
                  <h1>{title}</h1>
                  <div>{content}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CommentBox blogId={params.id} />
    </div>

  );
};

export default BlogPost;
