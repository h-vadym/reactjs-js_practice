import { useState, useEffect } from "react";

export default function StorageCounter() {
  const [count, setCount] = useState(() => {
    return Number(localStorage.getItem("counter")) || 0;
  });

  const handleClick = () => {
    const newValue = count + 1;
    setCount(newValue);
    localStorage.setItem("counter", newValue);
  };

  useEffect(() => {
    const handleStorage = (e) => {
      console.log("event", e);
      if (e.key === "counter") {
        setCount(Number(e.newValue) || 0);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div>
      <button onClick={handleClick}>Клікни</button>
      <p>
        Значення: <span>{count}</span>
      </p>
    </div>
  );
}
