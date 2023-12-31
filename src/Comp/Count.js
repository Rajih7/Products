import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [isIncreasing, setIsIncreasing] = useState(true);
  const [intervalActive, setIntervalActive] = useState(false);

  useEffect(() => {
    let num;

    if (intervalActive) {
      num = setInterval(() => {
        setCount((prevCount) => (isIncreasing ? prevCount + 1 : prevCount - 1));
      }, 1000);
    }

    return () => clearInterval(num);
  }, [isIncreasing, intervalActive]);

  const handleReverseClick = () => {
    setIsIncreasing((prevIsIncreasing) => !prevIsIncreasing);
  };

  const handleStopClick = () => {
    setIntervalActive((false));
  };

  const handleRunClick = () => {
    setIntervalActive(true);
  };
  const handleClearClick = () => {
    setCount(0);
    setIntervalActive(false);
  };

  return (
    <div className="container mx-auto mt-10 text-center">
      <Link to="/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back
        </button>
      </Link>
      <h1 className="text-4xl font-bold mb-4">{count}</h1>
      <div className="space-x-4 text-white">
        <button
          className="bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          onClick={handleReverseClick}
        >
          Reverse
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          onClick={handleStopClick}
        >
          Stop
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          onClick={handleRunClick}
        >
          Run
        </button>
        <button
          className="bg-slate-800 hover:bg-black font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          onClick={handleClearClick}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Counter;
