import { useState } from "react";
import "./App.css";
// import Router from ".";
import APPRouter from "./APPRouter.jsx";
import { ToastContainer } from "react-toastify";
// import

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <APPRouter />
      <ToastContainer />
    </>
  );
}

export default App;
