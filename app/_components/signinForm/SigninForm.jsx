"use client";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { TbBrandGithubFilled } from "react-icons/tb";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { signinUserAction } from "@/app/_data/actions/auth-actions";
import ValidationError from "../validationError/ValidationError";
const INITIAL_STATE = {
  data: null,
};
function SigninForm() {
  const [formState, formAction] = useFormState(signinUserAction, INITIAL_STATE);
  const [showPassword, SetShowPassword] = useState(false);
  const handleShowPassword = (e) => {
    e.preventDefault();
    SetShowPassword((showPassword) => !showPassword);
  };
  return (
    <div>
      <h1 className="text-[34px] max-md:text-[28px] text-colorGrayOne font-bold relative after:absolute after:h-2/3 after:w-2 after:bg-colorPink after:top-1/2 after:-translate-y-1/2 after:-left-4 after:rounded-full">
        Sign In Page
      </h1>
      <div className="md:pr-[300px]">
        <div className="border-b py-[40px] mb-16 relative">
          {formState?.message && formState?.strapiErrors?.message && (
            <div className="mb-2 text-[14px] tracking-wider font-medium text-red-600 text-center">
              <h1>
                {formState.message}, {formState?.strapiErrors?.message}
              </h1>
            </div>
          )}
          {formState?.errorbackend && (
            <div className="mb-2 text-[14px] tracking-wider font-medium text-red-600 text-center">
              <h1>{formState.errorbackend}</h1>
            </div>
          )}
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4">
            Or
          </span>
          <button className="flex items-center justify-center gap-2 text-colorPink mb-6 outline outline-colorPink outline-1 w-full rounded-lg py-4 hover:outline-none hover:bg-colorPink hover:text-colorGrayFive duration-100">
            <div>
              <Image
                src={"/google.png"}
                width={21}
                height={20}
                alt="google"
                className="w-full"
              />
            </div>
            <h3>Continue With Google</h3>
          </button>
          <button className="flex items-center justify-center gap-2 text-colorPink outline outline-colorPink outline-1 w-full rounded-lg py-4 hover:outline-none hover:bg-colorPink hover:text-colorGrayFive duration-100">
            <TbBrandGithubFilled className="text-colorGrayOne text-xl" />
            <h3>Continue With Github</h3>
          </button>
        </div>
        <div>
          <form action={formAction} className="flex flex-col gap-y-8">
            <div className="flex flex-col items-start">
              <label
                htmlFor="text"
                className="text-sm text-colorGrayOne font-semibold mb-2"
              >
                User name or email address
              </label>
              <input
                type="text"
                id="email"
                name="identifier"
                className="w-full outline outline-1 outline-colorGrayTwo focus:outline-colorPink rounded-lg py-3 px-4"
              />
              <ValidationError
                errorMessage={formState.zodErrors?.identifier[0]}
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm text-colorGrayOne font-semibold mb-2"
                >
                  Password
                </label>
                <button onClick={handleShowPassword}>
                  {showPassword ? (
                    <div className="flex items-center text-colorGrayTwo">
                      <BsEyeSlash className="mr-1" />
                      <h6>Hidden Password</h6>
                    </div>
                  ) : (
                    <div className="flex items-center text-colorGrayTwo">
                      <BsEye className="mr-1" />
                      <h6>Show Password</h6>
                    </div>
                  )}
                </button>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full outline outline-1 outline-colorGrayTwo focus:outline-colorPink rounded-lg py-3 px-4"
              />
              <div
                className={`flex ${
                  formState.zodErrors?.password[0]
                    ? "items-center justify-between"
                    : "items-end justify-between"
                } items-center justify-center w-full mt-1`}
              >
                <ValidationError
                  errorMessage={formState.zodErrors?.password[0]}
                />
                <button className=" max-w-fit underline text-xs">
                  Forget your password
                </button>
              </div>
            </div>
            <div>
              <div>
                <input
                  type="submit"
                  value={"Sign In"}
                  className="px-6 py-2 bg-colorPink rounded-lg text-white cursor-pointer"
                />
                <p className="mt-1 text-sm text-colorGrayOne">
                  Don’t have an account?{" "}
                  <span className="underline text-colorPink mt-1">
                    <Link href={"/auth/signup"}>Sign up</Link>
                  </span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SigninForm;
