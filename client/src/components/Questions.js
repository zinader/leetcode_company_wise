import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { FaBackward } from "react-icons/fa";

const QuestionsComponent = (props) => {
  const [questions, setQuestions] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [isLoading, setLoading] = useState(true);

  const sortCat = (q) => {
    var newList = apiData?.filter((i) => {
      return i.Difficulty.toLowerCase() === q;
    });

    setQuestions(newList);
  };

  useEffect(() => {
    console.log("t");
    setTimeout(async () => {
      await axios
        .get("https://leetcode-api.herokuapp.com" + props.match.url)
        .then((res) => {
          setApiData(res.data.data);
          setQuestions(res.data.data);
          setLoading(false);
        });

      setCompanyName(props.match.url.split("/")[2]);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="no-results">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="company-name">
        <a style={{ display: "flex" }} className="pr-3" href="/">
          <FaBackward />
        </a>
        <span>{companyName}</span>
        <div className="filter-button">
          <a className="easy" onClick={() => sortCat("easy")}>
            #easy
          </a>
          <a className="medium" onClick={() => sortCat("medium")}>
            #medium
          </a>
          <a className="hard" onClick={() => sortCat("hard")}>
            #hard
          </a>
          {/* <Button variant="light">Easy</Button>
          <Button variant="light">Medium</Button>
          <Button variant="light">Hard</Button> */}
        </div>
        <div className="back-icon"></div>
      </div>
      <div className="container-fluid">
        <div className="row questions">
          {questions.length > 0 ? (
            <>
              {questions?.map((data) => (
                <div className="col-12">
                  <div className="individual-question">
                    <h1>
                      <a href={`${data.Link}`} target="_blank" rel="noreferrer">
                        {data.Name}
                      </a>
                    </h1>
                    <div className="details">
                      <span
                        className={`difficulty pr-2 ${data.Difficulty.toLowerCase()}`}
                      >
                        {" "}
                        #{data.Difficulty.toLowerCase()}
                      </span>
                      {/* <span className="percentage"> {data.Percentage}</span> */}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="no-results">
              <h3>No results!</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionsComponent;
