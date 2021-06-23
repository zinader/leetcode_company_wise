import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, BrowserRouter as Router } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { FaSearch } from "react-icons/fa";

import "../App";

const CompanyComponent = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [tempcompanies, setTempCompanies] = useState([]);

  useEffect(() => {
    setTimeout(async () => {
      await axios
        .get("https://leetcode-api.herokuapp.com/companies")
        .then((res) => setCompanies(res.data), setLoading(false));
    }, 500);
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

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword == "") {
      setTempCompanies(companies);
    } else {
      const results = companies?.data?.filter((company) => {
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
                </>
              ) : (
                <>
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
