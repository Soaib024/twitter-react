import { BrowserRouter, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import UserProvider from "./store/UserProvider";



const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Route path="/" exact component={Auth}></Route>
        <Route path="/home" exact component={Home}></Route>
        <Route path='/post/:postId' exact component={PostPage}></Route>
        <Route path='/profile/:userId' exact component={ProfilePage}></Route>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
