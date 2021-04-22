import axios from "axios";
import { useMutation } from "react-query";
export interface NewUser {
  phoneNumber: string;
  password: string;
}
export const useRegister = () => {
  const registerUser = async (newUser: NewUser) => {
    const { data } = await axios.post(
      "http://localhost:4000/auth/register",
      newUser
    );
    return data;
  };
  const { mutate, isLoading, error, isSuccess } = useMutation(registerUser);
  return {
    mutate,
    isLoading,
    error,
    isSuccess,
  };
};
