import { Image } from "antd";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key, useState, useEffect } from "react";

const RightSideBar = ({ selectedSection }: any) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const imageData = selectedSection?.additional_images
    const videoData = selectedSection?.additional_videos
    if (videoData) {
      setVideos(JSON.parse(videoData));
    }
    if (imageData) {
      setImages(JSON.parse(imageData));
    }
  }, [selectedSection?.id])

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
      <div className="flex w-full flex-col items-center rounded-md bg-gray-50 p-4 text-center shadow-sm dark:bg-dark-4">
        <h5 className="mb-3 text-lg font-semibold text-dark dark:text-white">
          Images
        </h5>
        {
          images?.length > 0 ?
            <><div className="flex items-center justify-center space-x-4">
              <button onClick={handlePrevImage} className="text-blue-500 hover:text-blue-700">&larr;</button>
              <Image
                src={`/img/${images[currentImageIndex]}`}
                alt={'image'}
                className="h-auto max-h-48 w-full rounded-lg shadow"
              />
              <button onClick={handleNextImage} className="text-blue-500 hover:text-blue-700">&rarr;</button>
            </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{`${currentImageIndex + 1} of ${images.length}`}</p>
            </> : 'No images available'
        }
      </div>


      <div className="flex w-full flex-col items-center rounded-md bg-gray-50 p-4 text-center shadow-sm dark:bg-dark-4">
        <h5 className="mb-3 text-lg font-semibold text-dark dark:text-white">Videos</h5>
        {
          videos?.length > 0 ?
            <>
              <div className="flex items-center justify-center space-x-4">
                <button onClick={handlePrevVideo} className="text-blue-500 hover:text-blue-700">&larr;</button>
                <video controls className="h-auto max-h-48 w-full rounded-lg shadow">
                  <source src={`/videos/${videos[currentVideoIndex]}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <button onClick={handleNextVideo} className="text-blue-500 hover:text-blue-700">&rarr;</button>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{`${currentVideoIndex + 1} of ${videos.length}`}</p>

            </> : 'No videos available'
        }
      </div>
    </div>
  )
}

export default RightSideBar;