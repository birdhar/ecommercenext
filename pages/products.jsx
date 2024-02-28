import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import style from "../styles/Products.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { IndianRupeeFormatter } from "@/utils/IndianRupeeFormatter";

function AllProducts() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const carousalItems = [
    {
      text1: "Grab Discount on",
      text2: "Selected Products",
      img: "/images/product-model.png",
    },
    {
      text1: "Shop Smart",
      text2: "Discover Deals Today",
      img: "/images/product-model2.png",
    },
    {
      text1: "Occasion Alert",
      text2: "Enjoy Exclusive Sale",
      img: "/images/product-model3.png",
    },
  ];
  const { ref, inView } = useInView();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (inView) {
      if (hasMore) {
        setPage(page + 1);
      }
    }
  }, [inView]);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = async (page, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/products", {
        params: { page: page, limit: 4 },
      });
      const newData = response.data;
      setProducts((prevData) => [...prevData, ...newData]);
      setLoading(false);
      if (newData.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={style.productscontainer}>
        <Carousel
          swipeable={false}
          draggable={false}
          // showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          slidesToSlide={1}
          keyBoardControl={true}
          arrows={false}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {carousalItems?.map((item, index) => (
            <div className={style.herosection} key={index}>
              <div className={style.herosectiontext}>
                <div>
                  <h3 className={style.herosectiontexth3}>
                    {item?.text1} <br />
                    {item?.text2}
                  </h3>
                  <button className={style.orderbtn}>Buy Now</button>
                </div>
              </div>
              <div className={style.herosectionimg}>
                <img src={item?.img} alt="ecommerce product" />
              </div>
            </div>
          ))}
        </Carousel>

        <div className={style.categorylist}>
          {products?.map((product) => (
            <div
              ref={ref}
              className={style.product}
              key={product?._id}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="300"
            >
              <div className={style.productimgcontainer}>
                <img
                  src={product?.image}
                  alt={product?.name}
                  className={style.productimg}
                />
              </div>
              <div className={style.producttext}>
                <h6 className={style.productname}>
                  {product?.name?.length <= 28
                    ? product?.name
                    : `${product?.name?.slice(0, 28)}...`}
                </h6>
                <div className={style.priceflex}>
                  <p className={style.productprice}>
                    <IndianRupeeFormatter amount={product?.price} />
                  </p>
                  <div className={style.rating}>
                    {[...Array(5)]?.map((item, index) => {
                      const givenRating = index + 1;
                      return (
                        <>
                          {givenRating <= product?.rating ? (
                            <svg
                              key={index}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className={style.star}
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              key={index}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className={`${style.star} ${style.staractive}`}
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                              />
                            </svg>
                          )}
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </Layout>
  );
}

export default AllProducts;