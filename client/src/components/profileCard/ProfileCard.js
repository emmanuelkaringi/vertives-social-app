import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {Link} from "react-router-dom"
import "./profilecard.css";


const ProfileCard = ({location}) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  
  return (
    <div className="profilecard">
      <div className="profileimg">
        <img src={user.coverpic_url} alt="" />
        <img src={user.profilepic_url} alt="" />
      </div>

      <div className="profilename">
        <span>{user.full_name}</span>
        <span>@{user.username}</span>
      </div>

      <div className="followstatus">
        <div>
          <div className="follow">
            <span>{user.following_id}</span>
            <span>Following</span>
          </div>

          <div className="follow">
            <span>{user.follower_id}</span>
            <span>Followers </span>
          </div>

          {location === 'profilePage' && (
            <>
              <div className="follow">
                <span>5</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
      </div>
      {location === 'profilePage' ? "" : <span>
        <Link style={{textDecoration: "none", color: "inherit"}} to ={ `/profile/${user.user_id}`}>
        My Profile</Link></span>}
    </div>
  );
};

export default ProfileCard;
