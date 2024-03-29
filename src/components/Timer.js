import React from "react";
import { useState, useEffect } from "react";
import "./../App.css";

function convertToSecondsFromTime(days, hours, minutes, seconds) {
  const totalSeconds = seconds + minutes * 60 + hours * 3600 + days * 86400;
  return totalSeconds;
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

const today = new Date().toISOString().split("T")[0];
console.log("today", today);
const Home = () => {
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
    let numberOfDays;
    setHide(!hide);
    console.log("your selected: ", e.target.value);

    let futureDate = e.target.value.split("-");
    console.log(futureDate);

    let currentDate = today.split("-");
    console.log(currentDate);

    let timeDifference = [0, 0, 0];
    timeDifference = timeDifference.map((val, index) => {
      val = Number(futureDate[index]) - Number(currentDate[index]);
      return val;
    });
    console.log("Time diff: ", timeDifference);
    numberOfDays =
      timeDifference[0] * 365 +
      timeDifference[1] * 30 +
      timeDifference[2] * 1 -
      1;
    console.log("Total days: ", numberOfDays);

    const hours = 23 - new Date().getHours();
    const minutes = 59 - new Date().getMinutes();
    const second = 59 - new Date().getSeconds();
    console.log("Hours: ", hours);
    console.log("Minutes: ", minutes);
    console.log("Seconds: ", second);
    let totalSeconds = convertToSecondsFromTime(
      numberOfDays,
      hours,
      minutes,
      second
    );
    console.log("In seconds: ", totalSeconds);
    console.log("In time: ", convertToTimeFromSeconds(totalSeconds));
    setSeconds(totalSeconds);
    setStartTimer(true);
  };

  const finalTimer = convertToTimeFromSeconds(seconds);

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
              min={today}
              onChange={handleDateChange}
              // onSelect={handleDateChange}
              // onLoadedData={handleDateChange}
            ></input>
          </>
        )}
        {/* Display the timer  */}
        {startTimer && (
          <div>
            <h1>{console.log(convertToTimeFromSeconds(seconds))}</h1>
            <h1>
              {finalTimer.days} days, {finalTimer.hours} hours,{" "}
              {finalTimer.minutes} minutes, {finalTimer.seconds} seconds
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
