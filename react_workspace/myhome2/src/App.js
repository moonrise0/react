import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout.js";

import Home from "./component/Home.js";
import ScoreList from "./component/score/ScoreList.js";
import ScoreWrite from "./component/score/ScoreWrite";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/score/list" element={<ScoreList />} />
          <Route path="/score/write" element={<ScoreWrite />} />
          <Route path="/score/view/:id" element={<ScoreWrite />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
