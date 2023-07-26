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
      // If there is no authenticated user or the profileUserId is different from the authenticated user,
      // fetch the profileUser using the profileUserId from the URL parameter
      if (!user || profileUserId !== user.user_id) {
        try {
          // console.log("fetching");
          const profileUser = await UserApi.getUser(profileUserId);
          setProfileUser(profileUser.data);
          // console.log(profileUser);
        } catch (error) {
          console.error("Error fetching profile user:", error);
        }
      } else {
        // If the profileUserId is the same as the authenticated user's ID, use the user object from the Redux store
        setProfileUser(user);
        // console.log(user);
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
        {user && user.user_id === profileUserId ? (
          <span>
            <i className="fa fa-pen" onClick={() => setModalOpened(true)} />{" "}
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </span>
        ) : (
          ""
        )}
      </div>

      {/* Conditionally render the user's DOB and City information based on the viewed profile */}
      {profileUserId === user?.user_id ? (
        <>
          <div className="info">
            <span>
              <b>DOB: </b>
            </span>
            <span>{new Date(user.DOB).toLocaleDateString()}</span>
          </div>

          <div className="info">
            <span>
              <b>City: </b>
            </span>
            <span>{user.city}</span>
          </div>
        </>
      ) : (
        <>
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
        </>
      )}

      <button className="button logout" onClick={handleLogOut}>
        Logout
      </button>
    </div>
  );
};

export default InfoCard;
