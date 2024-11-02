const Newsletter = () => {
  return (
    <div
      className="wow fadeInUp relative mb-12 overflow-hidden rounded-[5px] bg-primary px-11 py-[60px] text-center lg:px-8"
      data-wow-delay=".1s"
    >
      <h3 className="mb-[6px] text-[28px] font-semibold leading-[40px] text-white">
        Join our newsletter!
      </h3>
      <p className="mb-5 text-base text-white">
        Enter your email to receive our latest newsletter.
      </p>
      <form>
        <input
          type="email"
          placeholder="Your email address"
          className="mb-4 h-[50px] w-full rounded-md border border-transparent bg-white/10 text-center text-base text-white outline-none placeholder:text-white/60 focus:border-white focus-visible:shadow-none"
        />
        <input
          type="submit"
          value="Subscribe Now"
          className="mb-4 h-[50px] w-full cursor-pointer rounded-md bg-secondary text-center text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-[#0BB489] hover:bg-opacity-90"
        />
      </form>
      <p className="text-sm font-medium text-white">
        Don&#39;t worry, we don&#39;t spam
      </p>
    </div>
  );
};

export default Newsletter;
