import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "./ProfileModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateUser } from "../../actions/UserAction";
import { deleteUser } from "../../api/UserRequest";
import axios from "axios";

const cloudName = process.env.REACT_APP_CLOUDINARY_NAME;

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      if (event.target.name === "profilepic_url") {
        setProfileImage(img);
      }
    }
  };

  const handleImageUpload = async (image) => {
    if (!image) return null;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "rcjzhiuu");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      const imageUrl = response.data.secure_url;
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error.response.data);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = { ...formData };

    // Handle profile image upload to Cloudinary
    if (profileImage) {
      const profileImageUrl = await handleImageUpload(profileImage);
      if (profileImageUrl) {
        updatedData.profilepic_url = profileImageUrl;
      }
    }

    // Dispatch the updateUser action with the updated data
    dispatch(updateUser(param.id, updatedData));
    setModalOpened(false);
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      try {
        // Call the deleteUser function to delete the account
        await deleteUser(param.id);
        // Navigate to the login page after successful deletion
        navigate("/login");
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
          size: "55%",
        }}
      >
        <form className="infoForm">
          <h3>Your Info</h3>
          <div>
            <input
              type="text"
              className="info-input"
              name="full_name"
              placeholder="Full Name"
              onChange={handleChange}
              value={formData.full_name}
            />
            <input
              type="text"
              className="info-input"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={formData.username}
            />
            <input
              type="date"
              className="info-input"
              name="DOB"
              onChange={handleChange}
              value={formData.DOB}
            />
            <input
              type="text"
              className="info-input"
              name="city"
              placeholder="City"
              onChange={handleChange}
              value={formData.city}
            />
          </div>
          <div>
            <span>Profile Image: </span>
            <input type="file" name="profilepic_url" onChange={onImageChange} />
          </div>

          <div>
            <button className="button info-button" onClick={handleSubmit}>
              Update Details
            </button>
            <button
              className="button info-button dl-button"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default ProfileModal;
