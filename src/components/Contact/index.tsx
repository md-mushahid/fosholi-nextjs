'use client'
import { useState } from 'react'
import axios from 'axios'

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState<File | any>(null);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const trimmedName = name.trim();  // Remove leading/trailing spaces
    const namePattern = /^[a-zA-Z\s.]+$/;
    if (!trimmedName || !namePattern.test(trimmedName)) {
      alert("Name should only contain letters, spaces, and periods and cannot be empty.");
      return;
    }

    const trimmedEmail = email.trim();  // Remove leading/trailing spaces
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!trimmedEmail || !emailPattern.test(trimmedEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    const trimmedMessage = message.trim();  // Remove leading/trailing spaces
    if (!trimmedMessage) {
      alert("Message cannot be empty.");
      return;
    }

    const data = {
      name: name,
      email: email,
      message: message,
      attachment: attachment,
    };
    try {
      const response = await axios.post('http://127.0.0.1:3333/send-us-message', data);
      if (response.status === 200) {
        alert('Message sent successfully!');
        setName('');
        setEmail('');
        setAttachment(null);
        setMessage('');
      } else {
        alert('Error sending message');
      }
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <section id="contact" className="relative py-20 md:py-[120px]"
    style={{ backgroundImage: `url('/img/bg-2.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="container px-4">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div className="ud-contact-content-wrapper">
              <div className="ud-contact-title mb-12 lg:mb-[150px]">
                <span className="mb-6 block text-base font-medium text-dark dark:text-white">
                  CONTACT US
                </span>
                <h2 className="max-w-[260px] text-[35px] font-semibold leading-[1.14] text-dark dark:text-white">
                  Let&#39;s talk about your problem.
                </h2>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <div className="wow fadeInUp rounded-lg bg-white px-8 py-10 shadow-testimonial dark:bg-dark-2 dark:shadow-none sm:px-10 sm:py-12 md:p-[60px] lg:p-10 lg:px-10 lg:py-12 2xl:p-[60px]" data-wow-delay=".2s">
              <h3 className="mb-8 text-2xl font-semibold text-dark dark:text-white md:text-[28px] md:leading-[1.42]">
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-[22px]">
                  <label htmlFor="fullName" className="mb-4 block text-sm text-body-color dark:text-dark-6">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full border-0 border-b border-[#f1f1f1] bg-transparent pb-3 text-dark placeholder:text-body-color/60 focus:border-primary focus:outline-none dark:border-dark-3 dark:text-white"
                  />
                </div>
                <div className="mb-[22px]">
                  <label htmlFor="email" className="mb-4 block text-sm text-body-color dark:text-dark-6">
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full border-0 border-b border-[#f1f1f1] bg-transparent pb-3 text-dark placeholder:text-body-color/60 focus:border-primary focus:outline-none dark:border-dark-3 dark:text-white"
                  />
                </div>
                <div className="mb-[22px]">
                  <label htmlFor="attachment" className="mb-4 block text-sm text-body-color dark:text-dark-6">
                    Attach a Photo (Optional)
                  </label>
                  <input
                    type="file"
                    name="attachment"
                    accept="image/*"
                    value={attachment}
                    onChange={(e: any)=> setAttachment(e.target.files[0])}
                    className="w-full text-dark placeholder:text-body-color/60 dark:text-white"
                  />
                </div>
                <div className="mb-[30px]">
                  <label htmlFor="message" className="mb-4 block text-sm text-body-color dark:text-dark-6">
                    Message*
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e)=> setMessage(e.target.value)}
                    placeholder="Type your message here"
                    className="w-full resize-none border-0 border-b border-[#f1f1f1] bg-transparent pb-3 text-dark placeholder:text-body-color/60 focus:border-primary focus:outline-none dark:border-dark-3 dark:text-white"
                  ></textarea>
                </div>
                <div className="mb-0">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-3 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-primary/90"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
