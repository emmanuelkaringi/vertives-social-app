import React from "react";
//import { useDisclosure } from '@mantine/hooks';
import { Modal, useMantineTheme } from "@mantine/core";
import "./ProfileModal.css";

function ProfileModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();

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
              name="Full Name"
              placeholder="Full Name"
            />
            <input
              type="text"
              className="info-input"
              name="username"
              placeholder="Username"
            />
            <input type="date" className="info-input" name="DOB" />
            <input
              type="text"
              className="info-input"
              name="city"
              placeholder="City"
            />
          </div>
          <div>
            Profile Image:
            <input type="file" name="profileImage" />
          </div>
          <div>
            Cover Image:
            <input type="file" name="profileImage" />
          </div>

          <div>
            <button className="button info-button">Update Details</button>
            <button className="button info-button">Delete Account</button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default ProfileModal;
