import "./App.css";
import MainComponent from "./components/MainComponent";
import QuestionsComponent from "./components/Questions";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={MainComponent} />
        <Route path="/companies/:name" exact component={QuestionsComponent} />
        {/* <Route path="*">
          <Redirect to='/' />
        </Route> */}
      </Router>
    </div>
  );
}

export default App;
