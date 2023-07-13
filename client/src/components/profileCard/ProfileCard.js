import React from "react";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profile.jpg";
import "./profilecard.css";

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
        </div>
      </div>
      <span>My Profile</span>

      <button className='button s-button'>Share</button>
    </div>
  );
};

export default ProfileCard;
