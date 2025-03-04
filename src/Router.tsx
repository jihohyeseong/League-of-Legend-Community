import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import SelectNickName from "./Pages/SelectNickName";
import MyPage from "./Pages/Mypage";
import Communities from "./Pages/Community/Communities";
import CommunityWrite from "./Pages/Community/CommunityWrite";
import Community from "./Pages/Community/Community";
import CommunityEdit from "./Pages/Community/CommunityEdit";
import Home from "./Pages/Home";
import App from "./App";
import ErrorPage from "./Pages/ErrorPage";
import ErrorComponent from "./Components/ErrorComponent";
import EditNickName from "./Pages/EditNickName";
import Chat from "./Components/Chat";
import EditTeamImage from "./Pages/EditTeamImage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "mypage",
        element: <MyPage />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "mypage/edit/nickname",
        element: <EditNickName />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "mypage/edit/image",
        element: <EditTeamImage />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "login",
        element: <Login />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "login/nickname",
        element: <SelectNickName />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "community",
        element: <Communities />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "community/:communityid",
        element: <Community />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "community/write",
        element: <CommunityWrite />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "community/:communityid/edit",
        element: <CommunityEdit />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "chat",
        element: <Chat />,
        errorElement: <ErrorComponent />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default Router;
