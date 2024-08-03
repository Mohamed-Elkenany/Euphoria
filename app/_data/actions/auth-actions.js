"use server";
import { cookies } from "next/headers";
import { z } from "zod";
import { registerUserService, signinFunction } from "../services/service";
import { redirect } from "next/navigation";
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import axios from "axios";
import getBaseUrl from "@/app/_utitly/getBaseUrl";
import getUserMeLoader from "./getUserMeLoader";
const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

const schemaRegister = z.object({
  username: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters",
  }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export const registerActions = async (prevState, formData) => {
  const validateRegisterElement = schemaRegister.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validateRegisterElement.success) {
    return {
      ...prevState,
      zodErrors: validateRegisterElement.error.flatten().fieldErrors,
      message: "Missing Fields. Falied to Register",
    };
  }
  const responseData = await registerUserService(validateRegisterElement.data);
  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Register.",
    };
  }
  cookies().set("jwt", responseData.jwt, config);
  redirect("/");
};

// ....................signin..........................................

const signinValidSchema = z.object({
  identifier: z
    .string()
    .min(3, {
      message: "Identifier must be between 3 and 20 characters",
    })
    .max(100, {
      message: "Identifier must be between 3 and 20 characters",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
});

export const signinUserAction = async (prevState, formData) => {
  const validateSignInElement = signinValidSchema.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });
  if (!validateSignInElement.success) {
    return {
      ...prevState,
      zodErrors: validateSignInElement.error.flatten().fieldErrors,
      message: "Missing Fields. Falied to Login",
    };
  }
  const responseData = await signinFunction(validateSignInElement.data);
  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }
  if (responseData.error) {
    console.log(responseData);
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Login.",
    };
  }
  cookies().set("jwt", responseData.jwt, config);
  redirect("/");
};

export async function logoutAction() {
  cookies().set("jwt", "", { ...config, maxAge: 0 });
  redirect("/");
}

// ...............................create address....................................

const validationToCreateAddress = z.object({
  users_permissions_user: z.number(),
  Fname: z
    .string()
    .min(4, { message: "First name must be more than 3 character" }),
  Lname: z
    .string()
    .min(4, { message: "Last name must be more than 3 character" }),
  country: z
    .string({ required_error: "Country is required" })
    .min(4, { message: "Country is required" }),
  state: z
    .string({ invalid_type_error: "State is required" })
    .min(4, { message: "State is required" }),
  city: z
    .string({ invalid_type_error: "City is required" })
    .min(4, { message: "City is required" }),
  phone: z
    .number({ message: "Your phone must be number" })
    .min(9, { message: "Your phone number is required" }),
  postal: z.string({ required_error: "Your postal code is required" }),
  street: z
    .string({ message: "Street address is required" })
    .min(4, { message: "Street address is required" }),
  company: z.string(),
  delivery_instruction: z.string(),
  apt: z.string(),
  default_shipping: z.boolean(),
  default_billing: z.boolean(),
});

export const addressAction = async (prevState, formData) => {
  const path = "/api/addresses";
  const baseUrl = getBaseUrl(path);
  const user = await getUserMeLoader();
  const validateAddress = validationToCreateAddress.safeParse({
    users_permissions_user: user.data.id,
    Fname: formData.get("Fname"),
    Lname: formData.get("Lname"),
    country: formData.get("country"),
    state: formData.get("state"),
    city: formData.get("city"),
    phone: +formData.get("phone"),
    postal: formData.get("postal_code"),
    street: formData.get("street"),
    apt: formData.get("apt"),
    company: formData.get("company"),
    delivery_instruction: formData.get("delivery_instruction"),
    default_shipping: formData.get("default_shipping") === "on" ? true : false,
    default_billing: formData.get("default_billing") === "on" ? true : false,
  });
  if (!validateAddress.success) {
    return {
      ...prevState,
      data: null,
      error: true,
      zodErrors: validateAddress.error.flatten().fieldErrors,
      errorMessage: "Missing Fields.",
    };
  }
  const response = await axios({
    url: baseUrl,
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.jwt}`,
    },
    data: { data: validateAddress.data },
  });
  if (!response.data) {
    return {
      ...prevState,
      data: null,
      error: true,
      errorMessage: "Somyhing wrong try again",
    };
  }
  return {
    data: response.data,
    error: null,
    errorMessage: null,
  };
};

// .....................................................................................

const validationToCreatedAddress = z.object({
  users_permissions_user: z.number(),
  Fname: z
    .string()
    .min(4, { message: "First name must be more than 3 character" }),
  Lname: z
    .string()
    .min(4, { message: "Last name must be more than 3 character" }),
  country: z
    .string({ required_error: "Country is required" })
    .min(4, { message: "Country is required" }),
  state: z
    .string({ invalid_type_error: "State is required" })
    .min(4, { message: "State is required" }),
  city: z
    .string({ invalid_type_error: "City is required" })
    .min(4, { message: "City is required" }),
  phone: z
    .number({ message: "Your phone must be number" })
    .min(9, { message: "Your phone number is required" }),
  postal: z.string({ required_error: "Your postal code is required" }),
  street: z
    .string({ message: "Street address is required" })
    .min(4, { message: "Street address is required" }),
  company: z.string(),
  delivery_instruction: z.string(),
  apt: z.string(),
  information: z.boolean(),
});

export const createAddress = async (prevState, formData) => {
  const path = "/api/addresses";
  const baseUrl = getBaseUrl(path);
  const user = await getUserMeLoader();
  const validateAddress = validationToCreatedAddress.safeParse({
    users_permissions_user: user.data.id,
    Fname: formData.get("Fname"),
    Lname: formData.get("Lname"),
    country: formData.get("country"),
    state: formData.get("state"),
    city: formData.get("city"),
    phone: +formData.get("phone"),
    postal: formData.get("postal_code"),
    street: formData.get("street"),
    apt: formData.get("apt"),
    company: formData.get("company"),
    delivery_instruction: formData.get("delivery_instruction"),
    information: formData.get("information") === "on" ? true : false,
  });
  if (!validateAddress.success) {
    return {
      ...prevState,
      data: null,
      error: true,
      zodErrors: validateAddress.error.flatten().fieldErrors,
      errorMessage: "Missing Fields.",
    };
  }
  if (
    validateAddress.data.information &&
    localStorage.getItem("defaultAddress")
  ) {
    console.log(true);
  } else if (!validateAddress.data.information) {
    return { address: validateAddress.data };
  }
};
