import React from "react";

export default function Counter({ secondsLeft }) {
  if (!secondsLeft) return null;
  return <p className="counter">{secondsLeft} sec left</p>;
}
