import Breadcrumb from "@/components/Common/Breadcrumb";
import Dashboard from "@/components/Dashboard";
import Team from "@/components/Team";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "About Us | Play SaaS Starter Kit and Boilerplate for Next.js",
  description: "This is About page description",
};

const DashboardPage = () => {
  return (
    <main>
      <Dashboard/>
    </main>
  );
};

export default DashboardPage;
