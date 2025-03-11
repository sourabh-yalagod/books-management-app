import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const { user, isLoaded } = useUser();
  console.log("🚀 ~ PrivateRouter ~ { user, isLoaded }:", {
    user: user?.id,
    isLoaded
  });
  if (isLoaded && !user?.id) return <Navigate to={"/signin"} />;
  else return <Outlet />;
};

export default PrivateRouter;
