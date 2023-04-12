import logo from "./logo.svg";
import "./App.css";
import HelloComponent from "./component/HelloComponent";
import Iftest1 from "./component/Iftest1";
import Fortest2 from "./component/Fortest2";
import Fortest1 from "./component/Fortest1";
import Hero from "./component/Hero";
// import gugudan from "./component/Gugudan";
import HeroList from "./component/HeroList";
import HeroWrite from "./component/HeroWrite";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <h1 className="title">제목1111</h1>
      {/*<HelloComponent/>*/}
      {/* <Iftest1 />
      <Fortest2 /> */}

      <HeroList />
      <HeroWrite />
    </div>
  );
}

export default App;
