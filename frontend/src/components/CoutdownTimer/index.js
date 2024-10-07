import React, { useState, useEffect } from "react";

function CountdownTimer() {
  const targetDate = new Date("2024-12-31T23:59:59").getTime(); 
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = getTimeRemaining(targetDate);

      if (newTimeLeft.total <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [targetDate]);

  function getTimeRemaining(targetDate) {
    const now = new Date().getTime();
    const time = targetDate - now;
    const oneMinute = 1000 * 60 * 60;
    const days = Math.floor(time / (oneMinute * 24));
    const hours = Math.floor((time % (oneMinute * 24)) / (oneMinute));
    const minutes = Math.floor((time % (oneMinute)) / (oneMinute / 60));
    const seconds = Math.floor((time % (oneMinute / 60)) / 1000);
    return { days, hours, minutes, seconds, total: time };
  }
  return (
    <span className="block-sale__top__right">
      <div className="block-sale__top__right__one">
        <strong>{timeLeft.days}</strong>
        <small>Ngày</small>
      </div>
      <div className="block-sale__top__right__one">
        <strong>{timeLeft.hours}</strong>
        <small>Giờ</small>
      </div>
      <div className="block-sale__top__right__one">
        <strong>{timeLeft.minutes}</strong>
        <small>Phút</small>
      </div>
      <div className="block-sale__top__right__one">
        <strong>{timeLeft.seconds}</strong>
        <small>Giây</small>
      </div>
    </span>
  );
}

export default CountdownTimer;
