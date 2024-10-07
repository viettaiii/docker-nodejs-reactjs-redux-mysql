import React from "react";
import promoBoxes from "../../assets/promoBox";
import LazyImage from "../../components/LazyImage";
function PromoBoxes() {
  return (
    <div className="container">
      <div className="promo-box row">
        {promoBoxes.map((item, idx) => (
          <div key={idx} className="col-lg-3 col-md-3 col-sm-6 col-6">
            <div
              className="promo-box__item"
              style={{
                backgroundColor: `${item.backgroundColor}`,
              }}
            >
              <div className="promo-box__item__left">
                <LazyImage src={item.image} />
              </div>
              <div className="promo-box__item__right">
                <small>{item.textTop}</small>
                <span>{item.textBot}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(PromoBoxes);
