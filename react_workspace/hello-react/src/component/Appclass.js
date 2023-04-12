import React, { Component } from "react";

class Appclass extends Component {
  //생성자 - props와 state를 사용하고 싶으면 반드시 생성자를 써라
  // props = 부모 컴포넌트로부터 자식 컴포넌트에 값을 보내기 위한 수단이다.
  // 자식 컴포넌트로부터 부모컴포넌트로 값을 보낼 수단은 없다.
  // 단방향 컴포넌트

  constructor(props) {
    super(props); // 부모 생성자를 호출한다 이 코드는 반드시 생성자의 첫번째 위치에 있어야 한다.
    //앞에 다른 코드가 먼저 올 수 없다.
    this.state = { name: "홍길동", age: 23, phone: "010-2525-1521" };
    //state객체가 각 컴포넌트마다 반드시 있다. 이객체에 json 형태의 객체를 저장할 수 있다.
    //개별 변수는 태그에서  사용못한다.
  }

  render() {
    const { name, age, phone } = this.state; // this.state에 json객체 저장
    // const name = this.state.name;
    const { title, address } = this.props; //destruction - jason 해체가능
    return (
      <div>
        <h1>{title}</h1>
        <h3>이름: {name}</h3>
        <h3>나이: {age}</h3>
        <h3>전화: {phone}</h3>
        <h3>주소: {address}</h3>

        <button
          type="button"
          onClick={() => {
            alert("press");
          }}
        >
          클릭
        </button>
      </div>
    );
  }
}

export default Appclass;
//this.props"는 부모 구성 요소에서 구성 요소로 전달되는 속성을 나타냅니다.
//이러한 속성은 읽기 전용이므로 구성 요소에서 직접 수정할 수 없습니다.
// props의 목적은 부모 구성 요소가 자식 구성 요소를 사용자 지정하고 데이터 또는 동작을 전달할 수 있도록 하는 것입니다.

//"this.state"는 구성 요소의 내부 상태를 나타내며 변경 가능하며 "setState"메서드를 사용하여 수정할 수 있습니다.
//상태는 구성 요소와 관련된 데이터를 저장하는 데 사용되며 사용자 상호 작용, 네트워크 요청 또는 기타 이벤트로 인해
//시간이 지남에 따라 변경될 수 있습니다
