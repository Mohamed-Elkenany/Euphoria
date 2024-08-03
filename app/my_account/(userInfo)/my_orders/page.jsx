"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

function MyOrders() {
  const router = useRouter();
  const orederList = useSelector((state) => state.rootReducer.userSlice.orders);
  return (
    <div>
      {orederList && orederList?.length ? (
        <div>
          {orederList.map((order, i) => (
            <div key={i}>
              <div className="bg-colorGrayFour p-6 rounded-lg">
                <div className="flex flex-col items-start gap-y-2">
                  <h1 className="text-2xl font-bold text-colorGrayOne">
                    Order No: #{order.id}
                  </h1>
                  <h3 className="text-lg text-colorGrayOne font-semibold tracking-wide">
                    Name: {order.address.Fname} {order.address.Lname}
                  </h3>
                  <h3 className="text-sm text-colorGrayThree font-semibold tracking-wide">
                    Phone: +{order.address.phone}
                  </h3>
                  <p className="text-colorGrayThree font-medium leading-6">
                    Address: {order.address.apt ? `${order.address.apt},` : ""}{" "}
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.state}, {order.address.country}
                  </p>
                </div>
              </div>
              <div>
                {order.productDetails.map((product, i) => (
                  <div
                    key={i}
                    className={`${
                      i !== order.productDetails.length - 1 &&
                      "border-b border-colorGrayFour"
                    } p-6 flex items-start gap-x-1`}
                  >
                    <div className="w-[70px]">
                      <Image
                        src={product.our_product.imageColor.url}
                        height={product.our_product.imageColor.height}
                        width={product.our_product.imageColor.height}
                        alt="product image"
                        className="w-full rounded-md"
                      />
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <h1 className="text-colorGrayOne font-medium text-base">
                        {product.our_product.productName}
                        <span className="text-xs"> x{product.amount}</span>
                      </h1>
                      <div className="text-sm font-semibold text-colorGrayThree">
                        <h3>Color: {product.our_product.color}</h3>
                        <h3 className="my-1">
                          Size:{" "}
                          <span className="uppercase">
                            {product.size.productSize}
                          </span>
                        </h3>
                        <h3>
                          SubTotal: <span className="text-xs">EGP</span>
                          <span>{product.subTotal}</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <div className="text-[60px] text-colorGrayThree font-bold">No order yet</div>
          <button
            onClick={() => router.push("/shop")}
            className="bg-colorPink px-4 py-1 rounded-md text-colorGrayFive"
          >
            Go to shopping now
          </button>
        </div>
      )}
    </div>
  );
}

export default MyOrders;
