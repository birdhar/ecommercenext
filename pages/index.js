import AdSellFeature from "@/components/AdSellFeature";
import Categories from "@/components/Categories";
import Drawer from "@/components/Drawer";
import Header from "@/components/Header";
import HeroSection from "@/components/Herosection";
import LatestProducts from "@/components/LatestProducts";
import Notification from "@/components/Notification";

function Home(params) {
  return (
    <>
      <div className="box-border ">
        <Header />
        <HeroSection />

        <LatestProducts />
        <AdSellFeature />
        <Categories />
        <Notification />
      </div>
    </>
  );
}

export default Home;
