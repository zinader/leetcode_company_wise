import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, BrowserRouter as Router } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

import "../App";

const CompanyComponent = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    setTimeout(async () => {
      await axios
        .get("https://leetcode-api.herokuapp.com/companies")
        .then((res) => setCompanies(res.data));
    }, 500);
    console.log(companies?.data?.[0]);
  });

  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 0);
    console.log("page to reload");
  }

  return (
    <Router>
      <div className="container-fluid">
        <div className="companies">
          <div className="row">
            {companies?.data?.map((data) => (
              <div className="col-md-4">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </Router>
  );
};

export default CompanyComponent;
