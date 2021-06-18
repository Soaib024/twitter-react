import { BrowserRouter, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import UserProvider from "./store/UserProvider";



const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Route path="/" exact component={Auth}></Route>
        <Route path="/home" exact component={Home}></Route>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
