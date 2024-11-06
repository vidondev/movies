import React from "react";

export const useCount = () => {
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  return {
    current,
    count,
    setCount,
    setCurrent,
  };
};
