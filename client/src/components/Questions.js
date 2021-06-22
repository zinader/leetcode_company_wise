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
        <a className='pr-3' href="/">
          <FaBackward />
        </a>
        <span>{questions?.data?.[0].Company_Name}</span>
        <div className="filter-button">
          <a className='easy'>
            #Easy
          </a>
          <a className='medium'>
            #Medium
          </a>
          <a className='hard'>
            #Hard
          </a>
          {/* <Button variant="light">Easy</Button>
          <Button variant="light">Medium</Button>
          <Button variant="light">Hard</Button> */}
        </div>
        <div className="back-icon">
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
