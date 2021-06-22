import "./App.css";
import MainComponent from "./components/MainComponent";
import QuestionsComponent from "./components/Questions";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={MainComponent} />
        <Route path="/companies/:name" exact component={QuestionsComponent} />
      </Router>
    </div>
  );
}

export default App;
