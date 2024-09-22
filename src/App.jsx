import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MyNav from "./component/MyNav";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNav />
        <Routes>
          <Route />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
