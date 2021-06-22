import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { FaBackward } from "react-icons/fa";

const QuestionsComponent = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setTimeout(async () => {
      await axios
        .get("https://leetcode-api.herokuapp.com" + props.match.url)
        .then((res) => setQuestions(res.data), setLoading(false));
    }, 500);
  });

  return (
    <div>
      <Header />
      <div className="company-name">
        {questions?.data?.[0].Company_Name}{" "}
        <div className="back-icon">
          <a href="/">
            <FaBackward />
          </a>
        </div>
      </div>
      <div className="questions">
        {questions?.data?.map((data) => (
          <div className="individual-question">
            <h1>
              <a href={`${data.Link}`} target="_blank">
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
