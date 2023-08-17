import React, { useState, useEffect } from "react";
import "./../App.css";

function convertToSecondsFromTime(days, hours, minutes, seconds) {
  return seconds + minutes * 60 + hours * 3600 + days * 86400;
}

function convertToTimeFromSeconds(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  seconds %= 3600 * 24;

  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;

  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  return { days, hours, minutes, seconds };
}

const Garbage = () => {
  const [hide, setHide] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [startTimer, setStartTimer] = useState(false);

  useEffect(() => {
    let intervalId;

    if (startTimer) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [startTimer]);

  const handleDateChange = (e) => {
    setHide(!hide);

    const futureDate = new Date(e.target.value); // Set the end of the selected day in UTC
    const currentDate = new Date();

    const timeDifference = futureDate - currentDate;
    const totalSeconds = Math.floor(timeDifference / 1000);

    setSeconds(totalSeconds);
    setStartTimer(true);
  };

  const initialCountdown = convertToTimeFromSeconds(seconds);
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="center-container">
      <h1>Timer App</h1>
      <div>
        {!hide && (
          <>
            Date Picker: {"  "}
            <input
              type="date"
              id="dateInput"
              name="dateInput"
              onChange={handleDateChange}
              min={today}
            ></input>
          </>
        )}
        {startTimer && (
          <div>
            <h1>
              {initialCountdown.days} days, {initialCountdown.hours} hours,{" "}
              {initialCountdown.minutes} minutes, {initialCountdown.seconds}{" "}
              seconds
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Garbage;
