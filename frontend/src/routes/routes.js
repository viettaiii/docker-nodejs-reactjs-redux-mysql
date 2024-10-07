const clientRoutes = {
  home: "/",
  account: {
    main: "/tai-khoan",
    orders: "/tai-khoan/don-hang",
    address: "/tai-khoan/dia-chi",
    login: "/tai-khoan/dang-nhap",
    register: "/tai-khoan/dang-ky",
    verifyEmail: "/tai-khoan/xac-minh-tai-khoan",
    resetPassword: "/tai-khoan/dat-lai-mat-khau",
    changePassword:"/tai-khoan/thay-doi-mat-khau"
  },
  introduce: "/gioi-thieu",
  news: "/tin-tuc",
  policy: "/chinh-sach",
  contact: "/lien-he",
  product: {
    main: "/san-pham",
    productLove: "/san-pham/yeu-thich",
    detail: "/san-pham/chi-tiet",
    love: "/san-pham/yeu-thich",
    sales: "/san-pham/khuyen-mai",
    search: "/san-pham/tim-kiem",
  },

  cart: "/gio-hang",
  checkout: "/thanh-toan",
};

export { clientRoutes };
