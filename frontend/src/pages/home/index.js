// MY IMPORTS

import HelmetCustom from "../../components/HelmetCustom";
import DanhMucNoiBat from "./danhMucNoiBat";
import CategoryProduct from "./categoryProduct";
import React from "react";

import HotSales from "./hotSales";
import TopSlide from "./topSlide";
import PromoBoxes from "./promoBoxes";
import Banner from "./banner";
import NewInfoProduct from "./newInfoProduct";
import TinTucCongNghe from "./tinTucCongNghe";
import CustomerOfViettai from "./customerOfViettai";
import useScrollTop from "../../hooks/useScrollTop";
import { useSelector } from "react-redux";

function Home() {
  useScrollTop();
  const { listIphone, listMac, listAppleWatch, listIpad } = useSelector(
    (store) => store.cacheProduct
  );
  return (
    <>
      <HelmetCustom title="Trang chủ" />
      <div className="home">
        {/* TOP SLIDE */}
        <TopSlide />

        {/* PROMO BOX */}
        <PromoBoxes />

        {/* BANNER */}
        <Banner />

        {/* HOT SALES */}
        <HotSales />

        {/* DANH MỤC NỔI BẬT */}
        <DanhMucNoiBat />

        {/* Category Product */}
        {/*  IPHONE*/}
        <CategoryProduct
          category={"IPhone"}
          list={listIphone}
          listSubCategory={[
            "All",
            "Iphone 14",
            "Iphone 13",
            "Iphone 12",
            "Iphone 11",
          ]}
          title={"IPhone"}
        />

        <CategoryProduct
          category={"Ipad"}
          list={listIpad}
          listSubCategory={[
            "All",
            "Ipad Pro",
            "Ipad Air",
            "Ipad 10.2",
            "Ipad Mini",
          ]}
          title={"Ipad"}
        />

        {/* New Info Product */}

        <NewInfoProduct />

        {/* Macbook */}
        <CategoryProduct
          category={"Macbook"}
          list={listMac}
          // products={productsMacbook}
          listSubCategory={["All", "Macbook Pro", "Macbook Air"]}
          title={"Macbook"}
        />

        {/* Apple Watch */}
        <CategoryProduct
          category={"Apple Watch"}
          list={listAppleWatch}
          // products={productsAppleWatch}
          listSubCategory={[
            "All",
            "Apple Watch Ultra",
            "Apple Watch S7",
            "Apple Watch SE",
            "Apple Watch S8",
            "Apple Watch S3",
          ]}
          title={"Apple Watch"}
        />
      </div>

      {/* Tin tuc cong nghe */}
      <TinTucCongNghe />

      {/*   KHÁCH HÀNG CỦA SUDES */}
      <CustomerOfViettai />
    </>
  );
}

export default Home;
