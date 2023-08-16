import React from "react";
import { useState, useEffect } from "react";
import "./../App.css";
import { min } from "lodash";

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
const Home = () => {
  const [date, setDate] = useState({
    // days: 0,
    // hours: 0,
    // minutes: 0,
    // seconds: 0,
  });
  const [hide, setHide] = useState(false);
  const [finalHours, setFinalHours] = useState(0);
  const [finalMinutes, setFinalMinutes] = useState(0);
  const [finalSeconds, setFinalSeconds] = useState(0);
  const [finalDays, setFinalDays] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [finalDate, setFinalDate] = useState({});
  let numberOfDays;

  useEffect(() => {
    let intervalId;

    if (startTimer) {
      // Call the update function once before starting the interval
      const initialTime = convertToTimeFromSeconds(seconds);
      // setDate({
      //   hours: initialTime.hours,
      //   days: initialTime.days,
      //   seconds: initialTime.seconds,
      //   minutes: initialTime.minutes,
      // });
      setFinalDays(initialTime.days);
      setFinalHours(initialTime.hours);
      setFinalMinutes(initialTime.minutes);
      setFinalSeconds(initialTime.seconds);

      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
        const finalDate = convertToTimeFromSeconds(seconds);
        setFinalDate(finalDate);
        setFinalDays(finalDate.days);
        setFinalHours(finalDate.hours);
        setFinalMinutes(finalDate.minutes);
        setFinalSeconds(finalDate.seconds);
        // setDate({
        //   hours: finalDate.hours,
        //   days: finalDate.days,
        //   seconds: finalDate.seconds,
        //   minutes: finalDate.minutes,
        // });
        // setDate({});
      }, 1000);
    }

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [startTimer, finalDate]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
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
            {/* <h1>
              {convertToTimeFromSeconds(seconds).days} days,{" "}
              {convertToTimeFromSeconds(seconds).hours} hours,{" "}
              {convertToTimeFromSeconds(seconds).minutes} minutes,{" "}
              {convertToTimeFromSeconds(seconds).seconds} seconds
            </h1> */}
            <h1>
              {finalDays} days, {finalHours} hours, {finalMinutes} minutes,{" "}
              {finalSeconds} seconds
            </h1>
            {/* <h1>
              {" "}
              {date["days"]} days, {date["hours"]} hours, {date["minutes"]}{" "}
              minutes, {date["seconds"]} seconds
            </h1> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
