import React, { useState } from "react";

function Inputtest(props) {
  const [name, setName] = useState("");
  const [kor, setKor] = useState("");
  const [eng, setEng] = useState("");
  const [mat, setMat] = useState("");
  //람다함수 - 일반함수의 경우 생성자에 바인딩이라는 작업을 해야한다.
  const nameChange = (e) => {
    // 인자가 = 발생한 이벤트에 대한 모든 정보
    // console.log(e.target.value);//키를 누른 값이 저장되어 있다.
    setName(e.target.value); // name변수의 값이 바뀐다.
  };

  const korChange = (e) => {
    setKor(e.target.value);
  };

  const engChange = (e) => {
    setEng(e.target.value);
  };

  const matChange = (e) => {
    setMat(e.target.value);
  };

  const getAverage = () => {
    const sum = parseInt(kor) + parseInt(eng) + parseInt(mat);
    return sum / 3;
  };

  const getTotal = () => {
    const sum = parseInt(kor) + parseInt(eng) + parseInt(mat);
    return sum;
  };

  let mystyle = {
    color: "black",
    backgroundColor: "white",
    fontSize: "5pt",
    padding: "10px 5px 10px 5px",
  };

  return (
    <div>
      이름 : <input style={mystyle} type="text" onChange={nameChange} /> <br />
      국어 : <input style={mystyle} type="text" onChange={korChange} /> <br />
      영어 : <input style={mystyle} type="text" onChange={engChange} /> <br />
      수학 :<input style={mystyle} type="text" onChange={matChange} /> <br />
      <button type="button" onClick={() => {}}>
        결과확인
      </button>
      <p>
        {name}의<p> 총점 : {getTotal()} 이고 </p>
        <p> 평균 : {getAverage()} 입니다.</p>
      </p>
    </div>
  );
}
export default Inputtest;
