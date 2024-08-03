"use client";
import { useGetUserByIdMutation } from "@/app/_utitly/RTKQAPI/appApi";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function UserAddress({ id, token }) {
  const [getUserInfoFun, getUserInfoOperations] = useGetUserByIdMutation();
  const [addresses, setAddresses] = useState([]);
  const [mainAddress, setMainAddress] = useState(null);
  const handleSetDefault = (address) => {
    if (localStorage.getItem("defaultAddress")) {
      localStorage.removeItem("defaultAddress");
      localStorage.setItem("defaultAddress", JSON.stringify(address));
      setMainAddress(address);
    } else {
      localStorage.setItem("defaultAddress", JSON.stringify(address));
      setMainAddress(address);
    }
  };
  const handleRemaove = async (id) => {
    const baseUrl = new URL(
      `/api/addresses/${id}`,
      process.env.NEXT_PUBLIC_API_URL
    );
    const response = await axios({
      url: baseUrl,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.data) {
      return {
        data: null,
        error: true,
      };
    }
    const arrayOfAddress = addresses.filter((address) => {
      return address.id !== id;
    });
    setAddresses(arrayOfAddress);
    localStorage.removeItem("defaultAddress");
    if (id === mainAddress.id) {
      setMainAddress(null);
    }
  };
  useEffect(() => {
    async function getUserInfo() {
      const response = await getUserInfoFun({ id, token }).then(
        (res) => res.data
      );
      setAddresses(response.addresses);
      localStorage?.getItem("defaultAddress") &&
        setMainAddress(JSON.parse(localStorage.getItem("defaultAddress")));
    }
    getUserInfo();
  }, [getUserInfoFun, id, token]);
  return (
    <div className="mt-2">
      <div className="flex items-center justify-end">
        <Link href={"/my_account/delivery_address"}>
          <button className="text-colorPink underline">Add Address</button>
        </Link>
      </div>
      {getUserInfoOperations.isSuccess && !addresses.length ? (
        <div className="flex items-center justify-center text-3xl font-bold text-colorGrayThree tracking-wide">
          <h1>You do not add your address yet</h1>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-12 mt-12">
          {addresses.map((address, i) => (
            <div
              key={i}
              className={`${
                mainAddress?.id === address.id &&
                "border-[2px] border-colorGrayOne p-1 rounded-lg shadow"
              }`}
            >
              <div className="bg-colorGrayFour flex flex-col gap-y-6 p-8 rounded-md shadow">
                <div>
                  <h3 className="first-letter:uppercase text-colorGrayOne font-medium">
                    {address.Fname}{" "}
                    <span className="first-letter:uppercase">
                      {" "}
                      {address.Lname}
                    </span>
                  </h3>
                </div>
                <div className="text-colorGrayThree">+{address.phone}</div>
                <div>
                  <p className="text-colorGrayThree text-sm leading-6">
                    {address.apt ? `${address.apt},` : ""} {address.street},{" "}
                    {address.city}, {address.state}, {address.country}
                  </p>
                </div>
                <div className="flex items-center gap-x-3">
                  <h3 className="border-b border-colorGrayOne text-colorGrayOne py-1 w-fit">
                    {!address.company ? "Home" : "Company"}
                  </h3>
                  {address.default_billing && address.default_shipping ? (
                    <div className="flex items-center">
                      <h3 className="border border-colorGrayOne text-colorGrayOne rounded-lg px-2 py-1 w-fit duration-100 mr-3">
                        Default Billing
                      </h3>
                      <h3 className="border border-colorGrayOne text-colorGrayOne rounded-lg px-2 py-1 w-fit duration-100">
                        Default Shipping
                      </h3>
                    </div>
                  ) : address.default_billing && !address.default_shipping ? (
                    <h3 className="border border-colorGrayOne text-colorGrayOne rounded-lg px-2 py-1 w-fit duration-100 mr-3">
                      Default Billing
                    </h3>
                  ) : (
                    address.default_billing &&
                    !address.default_shipping && (
                      <h3 className="border border-colorGrayOne text-colorGrayOne rounded-lg px-2 py-1 w-fit duration-100">
                        Default Shipping
                      </h3>
                    )
                  )}
                </div>
                <div className="text-colorGrayTwo flex items-center">
                  <button
                    onClick={() => handleRemaove(address.id)}
                    className={`${
                      mainAddress?.id === address.id
                        ? "border rounded-md"
                        : "border-r"
                    } border-r border-colorGrayTwo px-2`}
                  >
                    Remove
                  </button>
                  {mainAddress?.id !==
                    address.id && (
                    <button
                      onClick={() => handleSetDefault(address)}
                      className="px-2"
                    >
                      Set as default
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserAddress;
