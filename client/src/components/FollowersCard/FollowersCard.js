import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./followerscard.css";

//import { Followers } from "../../data/followersData";
import Users from "../users/Users";
import { getAllUsers } from "../../api/UserRequest";

function FollowersCard() {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const response = await getAllUsers();
      setPersons(response.data.data)
      // console.log(response.data.data)
    };
    fetchPersons();
  },[]);

  return (
    <div className="followerscard">
      <h3>Who to follow</h3>

      {persons.map((person, id) => {
        if(person.user_id !== user.user_id){
            return <Users person={person} key={id} />;
        }
      })}
    </div>
  );
}

export default FollowersCard;
