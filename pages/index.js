"use client";
import AdSellFeature from "@/components/AdSellFeature";
import Categories from "@/components/Categories";
import Drawer from "@/components/Drawer";
import Header from "@/components/Header";
import HeroSection from "@/components/Herosection";
import LatestProducts from "@/components/LatestProducts";
import Layout from "@/components/Layout";
import Notification from "@/components/Notification";
import { getSession, useSession } from "next-auth/react";

function Home(params) {
  const { data: session } = useSession();

  return (
    <Layout>
      {session?.user?.email}
      <HeroSection />

      <LatestProducts />
      <AdSellFeature />
      <Categories />
      <Notification />
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}

export default Home;
