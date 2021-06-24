import React, { useState } from "react";
import Header from "./Header";
import { FaBackward } from "react-icons/fa";
import customData from "./data.json";
import { Link, withRouter } from "react-router-dom";

const QuestionsComponent = withRouter((props) => {
  var data_filter = customData.filter(
    (element) => element.Company_Name == props.match.url.split("/")[2]
  );

  const [questions, setQuestions] = useState(data_filter);

  const sortCat = (q) => {
    var newList = data_filter?.filter((i) => {
      if (q !== "all") {
        return i.Difficulty.toLowerCase() === q;
      } else {
        setQuestions(questions);
        return true;
      }
    });

    setQuestions(newList);
  };

  return (
    <div>
      <Header />
      <div className="company-name">
        <Link style={{ display: "flex" }} className="pr-3" to="/">
          <FaBackward />
        </Link>
        <span>{props.match.url.split("/")[2]}</span>
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
          <a className="all" onClick={() => sortCat("all")}>
            #all
          </a>
        </div>
        <div className="back-icon"></div>
      </div>
      <div className="container-fluid">
        <div className="row questions">
          {questions.length > 0 ? (
            <>
              {questions?.map((data) => (
                <div className="col-12">
                  <a href={`${data.Link}`} target="_blank" rel="noreferrer">
                    <div className="individual-question">
                      <h1>{data.Name}</h1>
                      <div className="details">
                        <span
                          className={`difficulty pr-2 ${data.Difficulty.toLowerCase()}`}
                        >
                          {" "}
                          {data.Difficulty.toLowerCase()}
                        </span>
                      </div>
                    </div>
                  </a>
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
});

export default QuestionsComponent;
