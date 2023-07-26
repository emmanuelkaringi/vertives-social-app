import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getFollowingStatus, followUser, unFollowUser } from "../../actions/UserAction";

const Users = ({ person }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const [following, setFollowing] = useState(false);
  
  useEffect(() => {
    // Fetch the initial following status from the database
    const fetchFollowingStatus = async () => {
      try {
        // Replace the 'getFollowingStatus' with the appropriate API request
        const response = await getFollowingStatus(user.user_id, person.user_id);
        setFollowing(response.data.isFollowing);
      } catch (error) {
        console.error("Error fetching following status:", error);
      }
    };

    fetchFollowingStatus();
  }, [user.user_id, person.user_id]);

  const handleFollow = async () => {
    const data = {
      followerId: user.user_id,
      followingId: person.user_id,
    };

    if (following) {
      await dispatch(unFollowUser(data));
    } else {
      await dispatch(followUser(data));
    }

    // Toggle the 'following' state after updating the database
    setFollowing((prev) => !prev);
  };


  return (
    <div className="follower">
      <div>
        <img src={person.profilepic_url} alt="" className="followerImg" />
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={`/profile/${person.user_id}`}
        >
          <div className="name">
            <span className="fname">{person.full_name}</span>
            <span>@{person.username}</span>
          </div>
        </Link>
      </div>
      <button className="button fc-button" onClick={handleFollow}>
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default Users;
