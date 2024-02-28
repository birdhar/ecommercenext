import AdSellFeature from "@/components/AdSellFeature";
import Categories from "@/components/Categories";
import Drawer from "@/components/Drawer";
import Header from "@/components/Header";
import HeroSection from "@/components/Herosection";
import LatestProducts from "@/components/LatestProducts";
import Layout from "@/components/Layout";
import Notification from "@/components/Notification";

function Home(params) {
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

export default Home;
