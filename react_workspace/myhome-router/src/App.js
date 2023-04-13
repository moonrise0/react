import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./component/Home";
import About from "./component/About";
import Fortest1 from "./component/Fortest1";
import Fortest2 from "./component/Fortest2";
import Gugudan from "./component/Gugudan";

function App() {
  return (
    <div className="App">
      <h1>아침</h1>
      {/*path = 가상url
      element = 컴포넌트
      */}

      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 전체적인 라우터 골격은 layout  컴포넌트에 넣는다 */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="for1" element={<Fortest1 />} />
          <Route path="for2" element={<Fortest2 />} />
          <Route path="gugu" element={<Gugudan />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
