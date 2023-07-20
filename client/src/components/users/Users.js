import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../actions/UserAction";

const Users = ({ person }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  
  
  const handleFollow = () => {
    const data = {
      followerId: user.user_id,
      followingId: person.user_id,
    };
    dispatch(unFollowUser(data));
  };
  
  
  return (
    <div className="follower">
      <div>
        <img src={person.profilepic_url} alt="" className="followerImg" />
        <div className="name">
          <span className="fname">{person.full_name}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button className="button fc-button" onClick={handleFollow}>
        Follow
      </button>
    </div>
  );
};

export default Users;
