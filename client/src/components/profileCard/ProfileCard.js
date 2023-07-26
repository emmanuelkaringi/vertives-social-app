import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from "react-router-dom";
import Cover from "../../img/cover.jpg";

import "./profilecard.css";

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);

  return (
    <div className="profilecard">
      <div className="profileimg">
        <img src={Cover} alt="" />
        <img src={user.profilepic_url} alt="" />
      </div>

      <div className="profilename">
        <span>{user.full_name}</span>
        <span>@{user.username}</span>
      </div>

      <div className="followstatus">
        <div>
          <div className="follow">
            <span>{user.following_count}</span>
            <span>Following</span>
          </div>

          <div className="follow">
            <span>{user.followers_count}</span>
            <span>Followers</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="follow">
                <span>{user.posts_count}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
      </div>
      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/profile/${user.user_id}`}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;