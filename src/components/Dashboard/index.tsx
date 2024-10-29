import Image from "next/image";

const teamData = {
  id: 1,
  name: "Adveen Desuza",
  designation: "UI Designer",
  image: "/images/team/team-01.png",
  facebookLink: "/#",
  twitterLink: "/#",
  instagramLink: "/#",
};

const topCardsData = [
  { title: "Card 1", description: "Description of card 1" },
  { title: "Card 2", description: "Description of card 2" },
  { title: "Card 3", description: "Description of card 3" },
];

const membershipData = [
  {
    id: 1,
    courseName: "Advanced UI Design",
    membershipType: "Premium",
    thumbnail: "/images/courses/course-01.png",
  },
  {
    id: 2,
    courseName: "JavaScript Essentials",
    membershipType: "Standard",
    thumbnail: "/images/courses/course-02.png",
  },
  {
    id: 3,
    courseName: "Advanced UI Design",
    membershipType: "Premium",
    thumbnail: "/images/courses/course-01.png",
  },
  {
    id: 4,
    courseName: "JavaScript Essentials",
    membershipType: "Standard",
    thumbnail: "/images/courses/course-02.png",
  },
  // Add more memberships as needed
];

const Dashboard = () => {
  return (
    <section
      id="team"
      className="overflow-hidden bg-gray-1 pb-12 pt-20 dark:bg-dark-2 lg:pb-[90px] lg:pt-[120px] min-h-screen"
    >
      <div className="container mx-auto h-full">
        {/* Main grid layout */}
        <div className="flex flex-wrap lg:flex-nowrap h-full">
          {/* Left column */}
          <div className="w-full lg:w-1/4 space-y-6 lg:space-y-8 px-4">
            {/* Small Card */}
            <div className="rounded-xl bg-white p-6 shadow dark:bg-dark dark:shadow-none">
              <div className="relative mx-auto mb-4 h-[120px] w-[120px]">
                <Image
                  src={teamData.image}
                  alt={teamData.name}
                  className="rounded-full"
                  width={120}
                  height={120}
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-dark dark:text-white">
                  {teamData.name}
                </h3>
                <p className="text-sm text-body-color dark:text-dark-6">
                  {teamData.designation}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="rounded-xl bg-white p-6 shadow dark:bg-dark dark:shadow-none">
              {/* <h3 className="text-lg font-semibold mb-4">Sidebar Section</h3> */}
              <div className="space-y-2">
                <button className="w-full text-left py-2 font-medium text-dark dark:text-white hover:bg-gray-200 dark:hover:bg-dark-3 transform hover:scale-105 transition duration-200">
                  Settings
                </button>
                <button className="w-full text-left py-2 font-medium text-dark dark:text-white hover:bg-gray-200 dark:hover:bg-dark-3 transform hover:scale-105 transition duration-200">
                  Create Blog
                </button>
                <button className="w-full text-left py-2 font-medium text-dark dark:text-white hover:bg-gray-200 dark:hover:bg-dark-3 transform hover:scale-105 transition duration-200">
                  Appointment
                </button>
                <button className="w-full text-left py-2 font-medium text-dark dark:text-white hover:bg-gray-200 dark:hover:bg-dark-3 transform hover:scale-105 transition duration-200">
                  Other
                </button>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="w-full lg:w-3/4 px-4 mt-6 lg:mt-0 flex-1 flex flex-col">
            <div className="rounded-xl bg-white p-6 shadow dark:bg-dark dark:shadow-none flex-1">
              {/* Top Cards */}
              <h3 className="text-2xl font-semibold mb-4 text-dark dark:text-white">
                Main Content Area
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {topCardsData.map((card, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 dark:bg-dark-4 p-4 rounded-lg shadow-md"
                  >
                    <h4 className="text-lg font-semibold text-dark dark:text-white">
                      {card.title}
                    </h4>
                    <p className="text-sm text-body-color dark:text-dark-6">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Membership Section */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4 text-dark dark:text-white">
                  Membership Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {membershipData.map((membership) => (
                    <div
                      key={membership.id}
                      className="bg-gray-100 dark:bg-dark-4 p-4 rounded-lg shadow-md"
                    >
                      <Image
                        src={membership.thumbnail}
                        alt={membership.courseName}
                        width={150}
                        height={100}
                        className="w-full h-auto rounded-md mb-4"
                      />
                      <p className="text-sm font-semibold text-dark dark:text-white">
                        {membership.courseName}
                      </p>
                      <p className="text-xs text-body-color dark:text-dark-6">
                        {membership.membershipType} Membership
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info Section */}
              <div>
                <h4 className="text-xl font-semibold mb-4 text-dark dark:text-white">
                  Additional Information
                </h4>
                <p className="text-sm text-body-color dark:text-dark-6">
                  Here you can add any additional information relevant to the user.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
