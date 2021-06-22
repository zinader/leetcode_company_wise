import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { FaBackward } from "react-icons/fa";
import Button from "react-bootstrap/Button";

const QuestionsComponent = (props) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setTimeout(async () => {
      await axios
        .get("https://leetcode-api.herokuapp.com" + props.match.url)
        .then((res) => setQuestions(res.data));
    }, 500);
  });

  return (
    <div>
      <Header />
      <div className="company-name">
        {questions?.data?.[0].Company_Name}{" "}
        <span className="filter-button">
          <Button variant="light">Easy</Button>{" "}
          <Button variant="light">Medium</Button>{" "}
          <Button variant="light">Hard</Button>{" "}
        </span>
        <div className="back-icon">
          <a href="/">
            <FaBackward />
          </a>
        </div>
      </div>
      <div className="questions">
        {questions?.data?.map((data) => (
          <div className="individual-question">
            <span className="difficulty"> {data.Difficulty}</span>
            <span className="percentage"> {data.Percentage}</span>
            <h1>
              <a href={`${data.Link}`} target="_blank" rel="noreferrer">
                {data.Name}
              </a>
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsComponent;
