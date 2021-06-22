import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

import "../App";

const CompanyComponent = () => {
  const [isLoading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    setTimeout(async () => {
      await axios
        .get("https://leetcode-api.herokuapp.com/companies")
        .then((res) => setCompanies(res.data), setLoading(false));
    }, 500);
    console.log(companies?.data?.[0]);
  });

  if (isLoading) {
    return <div className="companies">Loading...</div>;
  }

  return (
    <Router>
      <div className="companies">
        {companies?.data?.map((data) => (
          <Link to={`/companies/${data}`}>
            <h1>{data}</h1>
          </Link>
        ))}
      </div>
    </Router>
  );
};

export default CompanyComponent;
