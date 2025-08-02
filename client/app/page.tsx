import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LandingPage from "@/components/landingPage";

export default async function Home() {
  const user = await currentUser();

  // If user is not logged in, show landing page
  if (user) {
    redirect("/dashboard");
  } else {
    return <LandingPage />;
  }
}
