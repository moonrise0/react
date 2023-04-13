import "bootstrap/dist/css/bootstrap.min.css"; //  부트스트랩 라이브러리
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVERIP } from "../../CommonUtil";
import { Link, useNavigate, useParams } from "react-router-dom";

function ScoreWrite(props) {
  let { id } = useParams(); // 보내는 쪽에서 json객체로 보냄
  let history = useNavigate();

  const [scoreName, setScoreName] = useState("");
  const [scoreDesc, setScoreDesc] = useState("");

  useEffect(() => {
    console.log("id", id);
    async function loadData(id) {
      let results = await axios.get(SERVERIP + "/score/view/" + id);
      console.log(results.data.score.score_name);
      console.log(results.data.score.score_desc);

      setScoreName(results.data.score.score_name);
      setScoreDesc(results.data.score.score_desc);
    }
    if (id != undefined)
      // write가 아니고 view로 호출할 때
      loadData(id);
    // window.onload의 역할
    // BoardWrite 컴포넌트가 /board/write 일 때는 id에는 undefined가 오고
    // /board/view/1 id에는 파라미터 값이 저장된다
  }, []);

  const nameChange = (e) => {
    setScoreName(e.target.value);
  };
  const descChange = (e) => {
    setScoreDesc(e.target.value);
  };

  // 서버로 전송하기
  const postData = () => {
    // 데이터를 json 으로 묶어서 보내야한다
    let data = { score_name: scoreName, score_desc: scoreDesc };
    axios
      .post(SERVERIP + "/score/write", data)
      .then((res) => {
        console.log(res.data);
        history("/score/list"); //redirect에 대응
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h1> 성적을 쓰세요 </h1>
      <table className="table table-hover " style={{ marginTop: "30px" }}>
        <colgroup>
          <col width="25%" />
          <col width="*" />
        </colgroup>

        <tbody>
          <tr>
            <td>이름</td>
            <td>
              <div className="mb-3" style={{ marginTop: "13px" }}>
                <input
                  type="text"
                  className="form-control"
                  value={scoreName}
                  placeholder="이름을 입력하세요"
                  onChange={nameChange}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>국어</td>
            <td>
              <div className="mb-3" style={{ marginTop: "13px" }}>
                <input
                  type="text"
                  className="form-control"
                  value={scoreDesc}
                  placeholder="성적을 입력하세요"
                  onChange={descChange}
                />
              </div>
            </td>
          </tr>

          <tr>
            <td>수학</td>
            <td>
              <div className="mb-3" style={{ marginTop: "13px" }}>
                <input
                  type="text"
                  className="form-control"
                  value={scoreDesc}
                  placeholder="성적을 입력하세요"
                  onChange={descChange}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>영어</td>
            <td>
              <div className="mb-3" style={{ marginTop: "13px" }}>
                <input
                  type="text"
                  className="form-control"
                  value={scoreDesc}
                  placeholder="성적을 입력하세요"
                  onChange={descChange}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="container mt-3" style={{ textAlign: "right" }}>
        <Link className="btn btn-secondary" onClick={postData}>
          등록
        </Link>
        &nbsp;&nbsp;
        <Link className="btn btn-secondary">취소</Link>
      </div>
    </div>
  );
}

export default ScoreWrite;
