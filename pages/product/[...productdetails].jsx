import Layout from "@/components/Layout";
import style from "../../styles/Products.module.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { IndianRupeeFormatter } from "@/utils/IndianRupeeFormatter";
import { getSession } from "next-auth/react";

function ProductDetails() {
  const router = useRouter();
  const [showFullText, setShowFullText] = useState(false);
  const id = router?.query?.productdetails?.[0];
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(0);
  const toggleText = () => {
    setShowFullText(!showFullText);
  };
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  return (
    <Layout>
      <div className={style.productDetailscontainer}>
        <div className={style.productDetails}>
          <div className={style.productDetailsimgcontainer}>
            <img
              className={style.productDetailsimg}
              src={product?.image}
              alt={product?.name}
            />
          </div>
          <div className={style.productDetailstextcontainer}>
            <h2 className={style.productheading}>{product?.name}</h2>
            <p className={style.productpara}>
              {" "}
              {product?.description?.length <= 150 ? (
                product?.description
              ) : showFullText ? (
                <>
                  {product?.description}{" "}
                  <span
                    className="cursor-pointer text-[#59595a] font-semibold text-[0.8rem]"
                    onClick={toggleText}
                  >
                    Show Less
                  </span>
                </>
              ) : (
                <>
                  {product?.description?.slice(0, 150)}{" "}
                  <span
                    className="cursor-pointer text-[#414142] font-semibold text-[0.8rem]"
                    onClick={toggleText}
                  >
                    ...Show More
                  </span>
                </>
              )}
            </p>
            <div className={style.productrating}>
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
                        className={style.productstar}
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
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
                        className={`${style.star} ${style.productstaractive}`}
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

            <h5 className={style.price}>
              <IndianRupeeFormatter amount={product?.price} />
            </h5>

            <div className={style.countflex}>
              <div className={style.countcontainer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={style.countcont}
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>

                <p className={style.countcont}>{count}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={style.countcont}
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className={style.availtext}>
                Only <span>12</span> items available! Don't miss it
              </p>
            </div>

            <div className={style.btnflex}>
              <button className={`${style.btn} ${style.btnfill}`}>
                Buy Now
              </button>
              <button className={`${style.btn} ${style.btnoutline}`}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  const { url } = req;

  if (!session) {
    return {
      redirect: {
        destination: `/login?next=${url}`,
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

export default ProductDetails;
