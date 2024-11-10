import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key, useState } from "react";

const images = [
  { src: "https://example.com/image1.jpg", alt: "Image 1" },
  { src: "https://example.com/image2.jpg", alt: "Image 2" },
  { src: "https://example.com/image3.jpg", alt: "Image 3" },
];

const videos = [
  { src: "https://example.com/video1.mp4", alt: "Video 1" },
  { src: "https://example.com/video2.mp4", alt: "Video 2" },
];

const pdfs = [
  { src: "https://example.com/document1.pdf", title: "OOP Concepts PDF" },
  { src: "https://example.com/document2.pdf", title: "Advanced Topics PDF" },
];

const RightSideBar = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex: number) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex: number) => (prevIndex + 1) % images.length);
  };

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <div className="flex w-full flex-col items-center justify-start space-y-8 bg-white p-6 shadow dark:bg-dark-3 lg:w-1/5">
      {/* Image Section */}
      <div className="flex w-full flex-col items-center rounded-md bg-gray-50 p-4 text-center shadow-sm dark:bg-dark-4">
        <h5 className="mb-3 text-lg font-semibold text-dark dark:text-white">
          Images
        </h5>
        <div className="flex items-center justify-center space-x-4">
          <button onClick={handlePrevImage} className="text-blue-500 hover:text-blue-700">&larr;</button>
          <img
            src={images[currentImageIndex].src}
            alt={images[currentImageIndex].alt}
            className="h-auto max-h-48 w-full rounded-lg shadow"
          />
          <button onClick={handleNextImage} className="text-blue-500 hover:text-blue-700">&rarr;</button>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{`${currentImageIndex + 1} of ${images.length}`}</p>
      </div>

      {/* Video Section */}
      <div className="flex w-full flex-col items-center rounded-md bg-gray-50 p-4 text-center shadow-sm dark:bg-dark-4">
        <h5 className="mb-3 text-lg font-semibold text-dark dark:text-white">Videos</h5>
        <div className="flex items-center justify-center space-x-4">
          <button onClick={handlePrevVideo} className="text-blue-500 hover:text-blue-700">&larr;</button>
          <video controls className="h-auto max-h-48 w-full rounded-lg shadow">
            <source src={videos[currentVideoIndex].src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button onClick={handleNextVideo} className="text-blue-500 hover:text-blue-700">&rarr;</button>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{`${currentVideoIndex + 1} of ${videos.length}`}</p>
      </div>
    </div>
  )
}

export default RightSideBar;