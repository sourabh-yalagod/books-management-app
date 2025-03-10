import React from "react";
import { SignUp } from "@clerk/clerk-react";
const SignUpPage = () => {
  return (
    <div className="min-h-screen w-full grid place-items-center">
      <SignUp signInUrl="/signup" />
    </div>
  );
};

export default SignUpPage;
