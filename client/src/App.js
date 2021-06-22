import "./App.css";
import CompanyComponent from "./components/Companies";

function App() {
  return (
    <div className="App">
      <div className="heading">Company Wise Leetcode Questions</div>
      <div className="companies">
        <CompanyComponent />
      </div>
    </div>
  );
}

export default App;
