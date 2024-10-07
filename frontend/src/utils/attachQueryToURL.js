export const navigateAndAttachQuery = (url, navigate, queryParams) => {
  // Gán các truy vấn vào URL và chuyển đến trang mới
  //   const queryParams = { name: "IPhone 11" }; // Đổi giá trị truy vấn tùy ý
  const queryString = new URLSearchParams(queryParams).toString();
  navigate(`${url}?${queryString}`);
};
