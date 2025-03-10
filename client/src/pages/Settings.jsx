import { UserProfile } from "@clerk/clerk-react";
import React from "react";

const Settings = () => {
  return (
    <div className="min-h-screen m-auto grid place-items-center">
      <UserProfile />
    </div>
  );
};

export default Settings;
