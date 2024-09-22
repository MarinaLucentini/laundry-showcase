import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MyNav from "./component/MyNav";
import MainPage from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <MyNav />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;