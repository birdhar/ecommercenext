"use client";
import Layout from "@/components/Layout";
import { getSession, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
const HeroSection = dynamic(() => import("@/components/Herosection"));
const LatestProducts = dynamic(() => import("@/components/LatestProducts"));
const Notification = dynamic(() => import("@/components/Notification"));
const Categories = dynamic(() => import("@/components/Categories"));
const AdSellFeature = dynamic(() => import("@/components/AdSellFeature"));

function Home(params) {
  const { data: session, status } = useSession();

  return (
    <Layout>
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
        destination: `/login?next=${"/"}`,
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
