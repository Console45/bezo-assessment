import React, { FC } from "react";
import { RegistrationForm } from "./children/RegistrationForm";

export const Register: FC<{}> = () => {
  return (
    <div className="container">
      <h1 className="text-center">Registration</h1>
      <div>
        <RegistrationForm />
      </div>
    </div>
  );
};
