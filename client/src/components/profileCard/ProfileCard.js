import React, { useState } from "react";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profile.jpg";
import "./profilecard.css";
import { useAuth } from "../../AuthContext";
import axios from 'axios'


const ProfilePage = false;

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const { user_id } = useAuth();

  const getUser = async ()=> {
    const response = await axios.get('http://localhost:4010/profile')
  }
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
