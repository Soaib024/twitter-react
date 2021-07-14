import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./pages/Auth";
import ChatPage from "./pages/ChatPage";
import Home from "./pages/Home";
import MessagePage from "./pages/MessagePage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import Search from "./pages/Search";
import UserProvider from "./store/UserProvider";
import CreateNewChat from './pages/CreateNewChat';
import Notification from "./pages/Notification";
import PrivateRoute from './helpers/PrivateRoutes';
import FollowersAndFollowing from './pages/FollowersAndFollowing';
import { ImageUploader } from './pages/ImageUploader';



const App = () => {

  return (
    <BrowserRouter>
      <UserProvider>
        <Route exact path="/"  component={Auth}></Route>
        <PrivateRoute exact path="/home"  component={Home}></PrivateRoute>
        {/* <Route exact path="/home" component={Home}></Route> */}
        <PrivateRoute exact path="/post/:postId" component={PostPage}></PrivateRoute>
        <PrivateRoute exact path="/profile/:userId" component={ProfilePage}></PrivateRoute>
        <PrivateRoute exact path="/search" component={Search}></PrivateRoute>
        <PrivateRoute exact path="/chats" component={ChatPage}></PrivateRoute>
        <PrivateRoute exact path="/messages/:chatId" component={MessagePage}></PrivateRoute>
        <PrivateRoute exact path="/newChat" component={CreateNewChat}></PrivateRoute>
        <PrivateRoute exact path="/notifications" component={Notification}></PrivateRoute>
        <PrivateRoute exact path="/imageUploader" component={ImageUploader}></PrivateRoute>
        <PrivateRoute exact path="/followersAndFollowings/:userId" component={FollowersAndFollowing}></PrivateRoute>
        

      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
