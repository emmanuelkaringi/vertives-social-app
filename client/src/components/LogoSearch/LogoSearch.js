import React, { useState } from "react";
import axios from "axios";
import "./logosearch.css";

const LogoSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    try {
      setSearchQuery(e.target.value)
      const response = await axios.get(
        `http://localhost:4010/profile/search/${searchQuery}`, {
          withCredentials: true,
        }
      );
      setSearchResults(response.data.data)
      console.log(response)
    } catch (error) {
      console.error(error);
      // Handle error if necessary
    }
  };

  return (
    <div className="logosearch">
      <div className="search">
        <i
          className="fa fa-magnifying-glass search-icon"
          onClick={handleSearch}
        ></i>
        <input
          type="text"
          placeholder="Search Vertives"
          value={searchQuery}
          onChange={handleSearch}

        />
      </div>
      {/* Display search results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((result) => (
              <li key={result.user_id}>{result.full_name} (@{result.username})</li>
            ))}
          </ul>
        </div>
      )}
      {/* <div className="search-results">
      {searchResults.length===0?(
        <div className="searched-user">
          <span className="no-results">Nothing</span>
        </div>
      ):(
        searchResults.map((result) => (
          <div className="searched-user">
            <li key={result.user_id}>{result.full_name} (@{result.username})</li>
          </div>
        ))
      )}

      </div> */}
    </div>
  );
};

export default LogoSearch;
