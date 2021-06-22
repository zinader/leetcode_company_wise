import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, BrowserRouter as Router } from "react-router-dom";

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
    return <div className="loading">Loading...</div>;
  }

  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 0);
    console.log("page to reload");
  }

  return (
    <Router>
      <div className="companies">
        {companies?.data?.map((data) => (
          <div className="companies-div">
            <h1>
              <Link
                to={`/companies/${data}`}
                onClick={refreshPage}
                style={{ textDecoration: "none" }}
              >
                {data}
              </Link>
            </h1>
          </div>
        ))}
      </div>
    </Router>
  );
};

export default CompanyComponent;
