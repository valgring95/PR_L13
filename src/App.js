import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import Posts from "./components/posts";
import NotFound from "./components/notFound";
import Home from "./components/home";
import LoginForm from "./components/loginForm";
import SignUpForm from "./components/signUpForm";
import NavBar from "./components/common/navbar";
import { isExpired } from "react-jwt";


function App() {

  return (
      <div className="container-fluid">
        <NavBar />
        <div className="container">
            <div className="content">
                <Switch>
                    <Route path="/login" component={LoginForm} />
                    <Route path="/signUp" component={SignUpForm} />
                    <Route path="/posts"
                        render={props => {
                            console.log(localStorage.getItem('token'));
                            if (isExpired(localStorage.getItem('token'))) {
                                return <Redirect to="/" />;
                            }
                            return <Posts />;
                        }}
                        />
                    <Route path="/not-found" component={NotFound} />
                    <Route path="/" exact component={Home} />
                    <Redirect to="/not-found" />
                </Switch>
            </div>
        </div>
      </div>
  );
}

export default App;
