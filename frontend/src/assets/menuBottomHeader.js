import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { clientRoutes } from "../routes";

export const menuBottom = [
  { title: "Trang chủ", to: clientRoutes.home },
  { title: "Giới thiệu", to: clientRoutes.introduce },
  {
    title: "IPhone",
    iconDown: faAngleDown,
    subMenu: [
      {
        title: "IPhone 14 Series",
        items: [
          "Iphone 14",
          "Iphone 14 Plus",
          "Iphone 14 Pro",

          "Iphone 14 Pro Max",
        ],
      },
      {
        title: "IPHONE 13 Series",
        items: [
          "Iphone 13",
          "Iphone 13 Mini",
          "Iphone 13 Pro",
          "Iphone 13 Pro Max",
        ],
      },
      {
        title: "IPHONE 12 Series",
        items: [
          "Iphone 12",
          "Iphone 12 Mini",
          "Iphone 12 Pro",
          "Iphone 12 Pro Max",
        ],
      },
      {
        title: "IPHONE 11 Series",
        items: ["Iphone 11", "Iphone 11 Pro", "Iphone 11 Pro Max"],
      },
    ],
  },
  {
    title: "Ipad",
    iconDown: faAngleDown,
    subMenu: [
      {
        title: "Ipad Pro",
        iconRight: faAngleRight,
        items: [
          "Ipad Pro M2 2022",
          "Ipad Pro 2021",
          "Ipad Pro 12.9",
          "Ipad Pro 11",
        ],
      },
      {
        title: "Ipad Air",
        iconRight: faAngleRight,
        items: ["Ipad Air 4", "Ipad Air 5"],
      },
      { title: "Ipad 10.9" },
      { title: "Ipad 10.2" },
      { title: "Ipad Mini" },
    ],
  },
  {
    title: "Macbook",
    iconDown: faAngleDown,
    subMenu: [{ title: "Macbook Pro" }, { title: "Macbook Air" }],
  },
  {
    title: "Apple Watch",
    iconDown: faAngleDown,
    subMenu: [
      { title: "Apple Watch Ultra" },
      { title: "Apple Watch S7" },
      { title: "Apple Watch S6" },
      { title: "Apple Watch SE" },
      { title: "Apple Watch S8" },
      { title: "Apple Watch S3" },
    ],
  },
  { title: "Airpods" },
  {
    title: "Phụ kiện",

    iconDown: faAngleDown,
    subMenu: [
      { title: "Phụ kiện Apple" },
      { title: "Cốc - Cáp sạc" },
      { title: "Bao da - Ốp lưng" },
      { title: "Dán cường lực" },
      { title: "Sạc dự phòng" },
    ],
  },
  { title: "Chính sách", to: clientRoutes.policy },
  { title: "Tin tức", to: clientRoutes.news },
  { title: "Liên hệ", to: clientRoutes.contact },
];
