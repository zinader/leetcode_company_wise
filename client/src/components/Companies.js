import React, { useState } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import customData from "./companies.json";

import "../App";

const CompanyComponent = () => {
  const [companies, setCompanies] = useState(customData);
  const [tempcompanies, setTempCompanies] = useState([]);

  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 0);
    console.log("page to reload");
  }

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword == "") {
      setTempCompanies(companies);
    } else {
      const results = companies?.filter((company) => {
        return company.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setTempCompanies(results);
      if (results.length == 0) {
        setCompanies(companies);
      }
    }
  };

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
              onChange={filter}
            />
            <span className="search-icon">
              <FaSearch />
            </span>
          </label>

          <div className="companies">
            <div className="row">
              {tempcompanies.length > 0 ? (
                <>
                  {tempcompanies?.map((data) => (
                    <div className="col-md-4">
                      <Link
                        to={`/companies/${data}`}
                        onClick={refreshPage}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="companies-div">
                          <h1>{data}</h1>
                        </div>
                      </Link>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {companies?.map((data) => (
                    <div className="col-md-4">
                      <Link
                        to={`/companies/${data}`}
                        onClick={refreshPage}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="companies-div">
                          <h1>{data}</h1>
                        </div>
                      </Link>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default CompanyComponent;
