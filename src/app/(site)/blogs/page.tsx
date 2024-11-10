''
import SingleBlog from "@/components/Blog/SingleBlog";
import axios from "axios";

const Blog = async() => {  
  const blogPosts = await axios.get("http://127.0.0.1:3333/get-blogs");
  return (  
    <>
      <section className="pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {
              blogPosts?.data.map((singleBlog: any, i: number) => (
                <div key={i} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                  <SingleBlog blog={singleBlog} />
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
