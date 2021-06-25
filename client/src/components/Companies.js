import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import customData from "./data/companies.json";
import "../App";

const CompanyComponent = withRouter(() => {
  const [companies, setCompanies] = useState(customData);
  const [tempcompanies, setTempCompanies] = useState([]);

  const filter = (e) => {
    const keyword = e.target.value;

    const keywordWithNoResults = ["No results for " + keyword];

    if (!keyword) {
      setTempCompanies(companies);
    } else {
      const results = companies?.filter((company) => {
        return company.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setTempCompanies(results);
      if (!results.length) {
        setTempCompanies(keywordWithNoResults);
      }
    }
  };

  return (
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
  );
});

export default CompanyComponent;
