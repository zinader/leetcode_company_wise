import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, BrowserRouter as Router } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { FaSearch } from "react-icons/fa";

import "../App";

const CompanyComponent = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  //     set search parameters
  //     we only what to search countries by capital and name
  //     this list can be longer if you want
  //     you can search countries even by their population
  // just add it to this array
  const [searchParam] = useState(["Company_Name"]);

  useEffect(() => {
    setTimeout(async () => {
      await axios
        .get("https://leetcode-api.herokuapp.com/companies")
        .then((res) => setCompanies(res.data), setLoading(false));
    }, 500);
    console.log(companies?.data?.[0]);
  });

  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 0);
    console.log("page to reload");
  }

  if (isLoading) {
    return (
      <div className="no-results">
        <HashLoader size={156} color="aqua" loading />
      </div>
    );
  }

  return (
    <Router>
      <div className="container-fluid">
        <div className="search-wrapper">
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <span className="search-icon">
              <FaSearch />
            </span>
          </label>
        </div>
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
