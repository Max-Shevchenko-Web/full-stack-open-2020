import React from "react";

const Total = ({ parts }) => {
  let totalExercises = parts.reduce((acc, cur)=> {
    return acc + cur.exercises
  }, 0)
  return <p><b>Total of {totalExercises} exercises</b></p>;
};

export default Total;