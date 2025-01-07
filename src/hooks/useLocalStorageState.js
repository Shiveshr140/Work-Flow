import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    console.log("lets get the stored value in useState", storedValue);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      // console.log("Saving to LocalStorage:", JSON.stringify(value));
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );
  // const storedValue = localStorage.getItem(key);
  // console.log("Fetched from localStorage:", storedValue);

  return [value, setValue];
}
