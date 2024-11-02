import { TeamType } from "@/types/team";
import Image from "next/image";

const SingleTeam = ({ team }: { team: TeamType }) => {
  const { image, name, designation, facebookLink, twitterLink, instagramLink } =
    team;
  return (
    <div className="w-full px-4 sm:w-1/2 lg:w-1/4 xl:w-1/4">
      <div className="group mb-8 rounded-xl bg-white px-5 pb-10 pt-12 shadow-testimonial dark:bg-dark dark:shadow-none">
        <div className="relative z-10 mx-auto mb-5 h-[120px] w-[120px]">
          <Image
            src={image}
            alt={name}
            className="w-full rounded-full"
            width={120}
            height={120}
          />          
        </div>
        <div className="text-center">
          <h3 className="mb-1 text-lg font-semibold text-dark dark:text-white">
            {name}
          </h3>
          <p className="mb-5 text-sm text-body-color dark:text-dark-6">
            {designation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleTeam;
