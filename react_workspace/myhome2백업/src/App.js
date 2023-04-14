import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout.js";
import Home from "./component/Home.js";
import BoardList from "./component/board/BoardList.js";
import BoardWrite from "./component/board/BoardWrite";
import HeroList from "./component/hero/HeroList.js";
import HeroWrite from "./component/hero/HeroWrite";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/board/list" element={<BoardList />} />
          <Route path="/board/write" element={<BoardWrite />} />
          <Route path="/board/view/:id" element={<BoardWrite />} />

          <Route path="/hero/list" element={<HeroList />} />
          <Route path="/hero/write" element={<HeroWrite />} />
          <Route path="/hero/view/:id" element={<HeroWrite />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
