import { getStrapiURL } from "@/lib/utils";
import axios from "axios";

const baseUrl = getStrapiURL();

export async function registerUserService(userData) {
  const url = new URL('api/auth/local/register', baseUrl);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Registration Service Error:", error);
    console.log(error);
  }
};

// .....................login................................................

export async function signinFunction(userData) {
  const url = new URL('api/auth/local', baseUrl);
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        'Content-type':"application/json"
      },
      cache:"no-cache"
    })
    return response.json()
  } catch (error) {
    console.error("Signin Service Error:",error);

  }
}