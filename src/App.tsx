import { Outlet } from "react-router-dom";
import Header from "./Components/Header";

function App() {
  return (
    /* 원래는 div같은 태그로 감싸서 노드를 추가해야하는데 불필요한 DOM 노드 생성을 방지하기 위해서 <>,</>를 사용한다.  */
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
