"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function PaymentSuccess() {
  const router = useRouter();
  return (
    <div className=" max-w-screen-xl mx-auto py-[120px] flex flex-col items-center justify-center">
      <div className="relative">
        <div className="absolute bg-black w-full h-full top-0 left-0 opacity-0" />
        <Image
          src={"/payment_image.png"}
          width={400}
          height={600}
          alt="payment image"
        />
      </div>
      <h1 className="text-2xl font-bold text-colorGrayOne my-2 tracking-wide">
        Payment Successful
      </h1>
      <p className="text-sm text-colorGrayThree tracking-wide mb-6">
        Order number: #{12}.
      </p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-2 rounded-md font-bold text-base text-colorGrayFive bg-colorPink"
      >
        Go To HomePage
      </button>
    </div>
  );
}

export default PaymentSuccess;
