import Posts from "./components/Posts";
import Home from "./components/Timer";
import Timer from "./components/Timer";

function App() {
  return (
    <>
      <Timer></Timer>
      {/* <Posts></Posts> */}
    </>
  );
}

export default App;
// import React, { useState, useEffect } from "react";

// function convertToSecondsFromTime(days, hours, minutes, seconds) {
//   const totalSeconds = seconds + minutes * 60 + hours * 3600 + days * 86400;
//   return totalSeconds;
// }

// function convertToTimeFromSeconds(seconds) {
//   const days = Math.floor(seconds / (3600 * 24));
//   seconds %= 3600 * 24;

//   const hours = Math.floor(seconds / 3600);
//   seconds %= 3600;

//   const minutes = Math.floor(seconds / 60);
//   seconds %= 60;

//   return { days, hours, minutes, seconds };
// }

// const CountdownTimer = ({ futureDate }) => {
//   const [remainingTime, setRemainingTime] = useState(
//     convertToTimeFromSeconds(0)
//   );

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       const currentDate = new Date();
//       const targetDate = new Date(futureDate);
//       const timeDifference = Math.max(targetDate - currentDate, 0);
//       setRemainingTime(
//         convertToTimeFromSeconds(Math.floor(timeDifference / 1000))
//       );
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, [futureDate]);

//   return (
//     <div>
//       <h2>Countdown Timer</h2>
//       <p>
//         {remainingTime.days} days, {remainingTime.hours} hours,{" "}
//         {remainingTime.minutes} minutes, {remainingTime.seconds} seconds
//       </p>
//     </div>
//   );
// };
// const today = new Date().toISOString().split("T")[0];
// const App = () => {
//   const [selectedDate, setSelectedDate] = useState("");
//   const [showTimer, setShowTimer] = useState(false);

//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//     setShowTimer(true);
//   };

//   return (
//     <div className="App">
//       <h1>Countdown Timer App</h1>
//       <label htmlFor="datePicker">Select a future date: </label>
//       <input
//         type="datetime-local"
//         id="datePicker"
//         value={selectedDate}
//         onChange={handleDateChange}
//         min={today}
//       />
//       {showTimer && <CountdownTimer futureDate={selectedDate} />}
//     </div>
//   );
// };

// export default App;
