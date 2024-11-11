import Community from "@/components/Community";

type Props = {
  params: { id: number };
};

const CommunityPage = ({params}: Props) => {
  return (
    <main>
      <Community id={params} />
    </main>
  );
};

export default CommunityPage;
