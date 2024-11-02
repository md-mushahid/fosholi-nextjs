import SectionTitle from "../Common/SectionTitle";
import SingleFaq from "./SingleFaq";

const Faq = () => {
  return (
    <section className="relative z-20 overflow-hidden bg-white pb-8 pt-20 dark:bg-dark lg:pb-[50px] lg:pt-[120px]">
      <div className="container">
        <SectionTitle
          subtitle="FAQ"
          title="Any Questions? Answered"
          paragraph="We understand that you may have questions about our platform. Here are some common queries answered to help you get started with our farming LMS."
          width="640px"
          center
        />

        <div className="-mx-4 mt-[60px] flex flex-wrap lg:mt-20">
          <div className="w-full px-4 lg:w-1/2">
            <SingleFaq
              question="How do I enroll in a course?"
              answer="To enroll in a course, simply browse our course catalog, select the course you're interested in, and click the 'Enroll Now' button. You will need to create an account if you don't have one."
            />
            <SingleFaq
              question="What resources are available for farmers?"
              answer="Our platform offers a wide range of resources, including instructional videos, downloadable guides, and access to expert advice on best practices in farming."
            />
            <SingleFaq
              question="Can I access the platform on my mobile device?"
              answer="Yes! Our platform is mobile-friendly, allowing you to access courses and resources from your smartphone or tablet at any time."
            />
          </div>

          <div className="w-full px-4 lg:w-1/2">
            <SingleFaq
              question="Is there customer support available?"
              answer="Absolutely! We offer customer support through email and live chat. Our support team is here to assist you with any questions or issues you may encounter."
            />
            <SingleFaq
              question="Are the courses updated regularly?"
              answer="Yes, we ensure that our courses are regularly updated with the latest information and best practices in the farming industry to provide you with the most relevant knowledge."
            />
            <SingleFaq
              question="What if I have more questions?"
              answer="If you have more questions, feel free to reach out to our support team, or check our Help Center for additional resources and FAQs."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
