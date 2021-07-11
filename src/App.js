import { BrowserRouter, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import ChatPage from "./pages/ChatPage";
import Home from "./pages/Home";
import MessagePage from "./pages/MessagePage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import Search from "./pages/Search";
import UserProvider from "./store/UserProvider";
import CreateNewChat from './pages/CreateNewChat';

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Route path="/" exact component={Auth}></Route>
        <Route path="/home" exact component={Home}></Route>
        <Route path="/post/:postId" exact component={PostPage}></Route>
        <Route path="/profile/:userId" exact component={ProfilePage}></Route>
        <Route path="/search" exact component={Search}></Route>
        <Route path="/chats" exact component={ChatPage}></Route>
        <Route path="/messages/:chatId" exact component={MessagePage}></Route>
        <Route path="/newChat" exact component={CreateNewChat}></Route>

      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
