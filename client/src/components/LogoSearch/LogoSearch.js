import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../actions/UserAction";
import "./logosearch.css";

const LogoSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    try {
      setSearchQuery(e.target.value);
      const response = await axios.get(
        `http://localhost:4010/profile/search/${searchQuery}`,
        {
          withCredentials: true,
        }
      );
      setSearchResults(response.data.data);
      console.log(response);
    } catch (error) {
      console.error(error);
      // Handle error if necessary
    }
  };

  const handleFollow = async (followingId) => {
    try {
      const data = {
        followerId: user.user_id,
        followingId: followingId,
      };

      // Check if the user is already following the target user
      const isFollowing = searchResults.find((result) => result.user_id === followingId).is_following;
      if (isFollowing) {
        await dispatch(unFollowUser(data));
      } else {
        await dispatch(followUser(data));
      }

      // Update the search results after follow/unfollow action
      setSearchResults((prevResults) =>
        prevResults.map((result) =>
          result.user_id === followingId ? { ...result, is_following: !isFollowing } : result
        )
      );
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
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
          <span>Search Results:</span>
          <ul>
            {searchResults.map((result) => (
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/profile/${result.user_id}`}
              >
                <li key={result.user_id} className="profile-container">
                  <img
                    className="profile-img"
                    src={result.profilepic_url}
                    alt={result.full_name}
                  />
                  <div className="user-info">
                    <span>{result.full_name} </span>
                    <span className="username">@{result.username}</span>
                  </div>
                   {/* Follow/Unfollow button */}
                <button className="button fc-button" onClick={() => handleFollow(result.user_id)}>
                  {result.is_following ? "Unfollow" : "Follow"}
                </button>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LogoSearch;
