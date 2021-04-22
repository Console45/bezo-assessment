import React, { FC } from "react";
import { useState } from "react";
import { ErrorHandler } from "../../../components/ErrorHandler";
import { useRegister } from "../../../hooks/mutation/useRegister";

interface RegistrationFormProps {}

export const RegistrationForm: FC<RegistrationFormProps> = () => {
  const { mutate, error, isLoading, isSuccess } = useRegister();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <div>
      {isSuccess && (
        <div className="alert alert-success text-center">
          Registration Successful
        </div>
      )}
      <ErrorHandler error={error} />
      <form
        onSubmit={async e => {
          e.preventDefault();
          mutate({ phoneNumber, password });
        }}
      >
        <div className="my-4">
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="my-4">
          <button className="btn btn-primary">
            {isLoading ? "Loading..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};
