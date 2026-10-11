import axios, { AxiosResponse } from "axios";

const SignUp = async (body: SignUpPayload): Promise<SignUpResponse> => {
  try {
    const response: AxiosResponse<SignUpResponse> = await axios.post(
      "http://localhost:5000/api-job-list/v1/natural-person/sign-up",
      body,
    );

    return response.data;
  } catch (error) {
    console.error("Error al crear la cuenta:", error);
    throw error;
  }
};

export default SignUp;

export interface SignUpPayload {
  documentTypeId: string;
  identificationNumber: string;
  firstName: string;
  secondName?: string;
  firstSurname: string;
  secondSurname?: string;
  birthDate?: string;
  genderId?: string;
  phone?: string;
  address?: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface SignUpResponse {
  message: string;
}
