import React from "react";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profile.jpg";
import "./profilecard.css";

const ProfilePage = false;

const ProfileCard = () => {
  
  return (
    <div className="profilecard">
      <div className="profileimg">
        <img src={Cover} alt="" />
        <img src={Profile} alt="" />
      </div>

      <div className="profilename">
        <span>Immah Stuart</span>
        <span>@Immah</span>
      </div>

      <div className="followstatus">
        <div>
          <div className="follow">
            <span>10</span>
            <span>Following</span>
          </div>

          <div className="follow">
            <span>10</span>
            <span>Followers </span>
          </div>

          {ProfilePage && (
            <>
              <div className="follow">
                <span>5</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
      </div>
      {ProfilePage ? "" : <span>My Profile</span>}
    </div>
  );
};

export default ProfileCard;
