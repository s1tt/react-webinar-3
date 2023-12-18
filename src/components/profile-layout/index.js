import React from "react";
import SideLayout from "../side-layout";

const ProfileLayout = (props) => {
  return (
    <SideLayout padding="medium" flexDirectionColumn={"true"}>
      <h3 className="profile-title">{props.t("profile")}</h3>
      <p className="profile-infoItem">
        {props.t("name")}: <strong>{props.userData.profile.name}</strong>
      </p>
      <p className="profile-infoItem">
        {props.t("phone")}: <strong>{props.userData.profile.phone}</strong>
      </p>
      <p className="profile-infoItem">
        {props.t("email")}: <strong>{props.userData.email}</strong>
      </p>
    </SideLayout>
  );
};

export default ProfileLayout;
