import React, { useEffect, useState } from "react";
import ProfileModal from "../ProfileModal/ProfileModal";
import * as UserApi from "../../api/UserRequest.js";
import "./infocard.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { logOut } from "../../actions/AuthAction";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();

  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user.user_id) {
        setProfileUser(user);
      } else {
        console.log("fetching")
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user, profileUserId]);

  const handleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <div className="InfoCard">
      <div className="info-head">
        <h4>User Info</h4>
        {user.user_id === profileUserId ? (
          <span>
            <i className="fa fa-pen" onClick={() => setModalOpened(true)} />{" "}
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data = {user}
            />
          </span>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        <span>
          <b>DOB: </b>
        </span>
        <span>{new Date(profileUser.DOB).toLocaleDateString()}</span>
      </div>

      <div className="info">
        <span>
          <b>City: </b>
        </span>
        <span>{profileUser.city}</span>
      </div>

      <button className="button logout" onClick={handleLogOut}>
        Logout
      </button>
    </div>
  );
};

export default InfoCard;
