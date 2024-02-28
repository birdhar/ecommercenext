import React, { useEffect } from "react";
import style from "../styles/Categories.module.css";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

function AdSellFeature() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className={style.adsellcontainer}>
      <div className={style.adsell}>
        <div className={style.adselleft}>
          <h3 className={style.adselleftheading} data-aos="fade-up">
            Lowest Prices Best Quality Shopping
          </h3>
          <div className={style.deliveryfeatures} data-aos="fade-up">
            <div className={style.deliveryfeature}>
              <img src="/images/delivery.png" alt="delivery" />
              <p>Easy Delivery</p>
            </div>
            <div className={style.deliveryfeature}>
              <img src="/images/cod.png" alt="delivery" />
              <p>Cash on Delivery</p>
            </div>
            <div className={style.deliveryfeature}>
              <img src="/images/roi.png" alt="delivery" />
              <p>Easy Returns</p>
            </div>
          </div>

          <div className={style.shopbtncontainer} data-aos="fade-up">
            <button type="button" className={style.shopbtn}>
              Start Shopping
            </button>
          </div>
        </div>
        <div className={style.adselright}>
          <img
            src="/images/shopping.png"
            alt="ecommerce-shopping"
            data-aos="zoom-in"
          />
        </div>
      </div>
    </div>
  );
}

export default AdSellFeature;
