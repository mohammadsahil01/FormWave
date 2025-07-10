import Dashboard from "@/components/dashboard/Dashboard";
import LandingPage from "@/components/landingPage";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  // If user is not logged in, show landing page
  if (!user) {
    return <LandingPage />;
  }

  // If user is logged in, show dashboard
  return <Dashboard />;
}
