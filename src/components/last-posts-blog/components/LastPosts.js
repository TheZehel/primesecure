import React, { useEffect, useState } from "react";

const LastPostsCard = ({ image, title, description, link }) => {
  return (
    <div className="min-w-[300px] flex flex-col flex-grow md:min-w-[300px] lg:max-w-[300px] md:w-auto bg-neutral-10 p-4 rounded-lg shadow-md mx-4 mb-4 md:mb-0 bg-white sm:m-2 sm:mx-auto">
      <img
        src={image}
        alt={title}
        className="mb-4 h-auto mx-auto rounded-md"
        loading="lazy"
        decoding="async"
      />
      <h3 className="text-lg text-start mb-[50px]">{title}</h3>
      <h4 className="text-md text-gray-600 text-start">{description}</h4>
      <button className="text-start rounded-md text-bluePrime w-full mt-auto">
        <a href={link}>Ver Artigo</a>
      </button>
    </div>
  );
};

const LastPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://api-primesecure.onrender.com/blog/posts?quantity=4")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <section className="features page-keep mt-[120px] ">
      <div className="mx-auto">
        <h2 className="text-xl sm:text-4xl  my-6 text-grayPrime">
          Confira Nosso Blog
        </h2>
        <div className="flex flex-row flex-nowrap md:flex-wrap overflow-x-auto scrollbar-hide pb-4 md:overflow-x-hidden">
          {posts.map((post) => (
            <LastPostsCard
              key={post.ID}
              image={post.image_url}
              title={post.post_title}
              description={post.post_excerpt}
              link={post.post_link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LastPosts;
