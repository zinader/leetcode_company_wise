import React, { useEffect, useState } from "react";
import axios from "axios";

const CompanyComponent = () => {
  const [isLoading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    setTimeout(async () => {
      await axios
        .get("https://leetcode-api.herokuapp.com/leetcode")
        .then((res) => setCompanies(res.data), setLoading(false));
    }, 500);
    console.log(companies?.data?.[0]);
  });

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="App">
      {/* <h1>{companies?.data?.[0]?.Company_Name}</h1> */}
      {companies?.data?.map((data) => (
        <h1>{data.Company_Name}</h1>
      ))}
    </div>
  );
};

export default CompanyComponent;
