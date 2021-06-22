import React from "react";
import { FaGithub } from "react-icons/fa";

function Header() {
  return (
    <div className='mb-4'>
      <div className="heading">Company Wise Leetcode Questions </div>
      <div className="github">
        <a
          href="https://github.com/zinader/leetcode_company_wise"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
        </a>
      </div>
    </div>
  );
}

export default Header;
