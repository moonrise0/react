//HeroList.js - 백엔드 서버로부터 데이터 가져온다.
//axios 설치필요 npm install axios

import React, { useState, useEffect } from "react";
import axios from "axios";

function HeroList(props) {
  const [heroList, setHeroList] = useState([]);
const [loading, setLoading] =useState(false);
  //useState함수가 값을 초기화를 해주면 해당 값을 저장할 변수와 해당값을 변경하는 함수를 반환함.
  //[]-> 배열을 저장할 변수반환, 배열값을 변환할 함수주소

  //첫번째 매개변수 -mount될때, update될떄,  unmount될때 호출된다.
  //[]변수: 변수들이 바뀔떄 호출된다.
  useEffect(() => {
    axios
      .get("http://localhost:9090/hero/list")
      .then((res) => {
        console.log("**************");
        console.log(res);
        setHeroList(res.data);
        setLoading(true);
      })

      .catch((res, status, error) => {
        console.log(status);
      });
    // //서버에서 데이터를 불러온다.
    //    console.log("나호출된다.");
    //    setHeroList(heroList.concat([{id:1, name:"이순신", desc:"임란승리"},
    //    {id:2, name:"세종대왕",desc:"한글승리"},
    //    {id:3, name:"을지문",desc:"살수승리"},
    //    {id:4, name:"강감찬",desc:"뭐승리"}
  }, []);

  return (
    <div>
      <table>
        {heroList.map((item, index) => {
          return (
            <tr>
              <td>{item.id}</td>
              <td>{item.hero_name}</td>
              <td>{item.hero_desc}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
export default HeroList;
