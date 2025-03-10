import React from "react";
import { SignIn } from "@clerk/clerk-react";
const SignInPage = () => {
  return (
    <div className="min-h-screen w-full grid place-items-center">
      <SignIn />
    </div>
  );
};

export default SignInPage;
