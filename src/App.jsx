import "./App.css";

export function inputType(value) {
  // Check if it's a string that can be converted to a valid number
  if (typeof value === "string" && value.trim() !== "" && !isNaN(value)) {
    return "number";
  } else if (typeof value === "string") {
    return "string";
  } else if (typeof value === "number") {
    return "number";
  } else {
    return "unknown";
  }
}

export function myPromise(shouldResolve = true) {
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve("Promise resolved");
    } else {
      reject("Promise rejected");
    }
  });
}

export function onlyNumbers(num) {
  if (typeof num !== "number") {
    throw new Error("Input must be a number");
  }
  return num;
}

export function fetchUserData(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error("Network response was no gud owo");
      }
      return response.json();
    }
  );
}

function App() {
  return (
    <>
      <h1>Hello, Vitest!</h1>
    </>
  );
}

export default App;
