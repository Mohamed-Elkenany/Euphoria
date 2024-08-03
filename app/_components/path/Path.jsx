"use client";
import { useGetProductIdMutation } from "@/app/_utitly/RTKQAPI/appApi";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Path() {
  const [producyFun, productFunOperation] = useGetProductIdMutation();
  const pathname = usePathname();
  const params = useParams();
  const [path, setPath] = useState([]);
  const [product, setProduct] = useState();
  useEffect(() => {
    const arrayOfPath = pathname.split("/");
    if (params.productId) {
      const productId = params.productId;
      async function getProduct() {
        const product = await producyFun(productId).then(
          (data) => data.data.data
        );
        setProduct(product);
      }
      getProduct();
    }
    setPath(arrayOfPath);
  }, [pathname, params, producyFun]);
  return (
    <div className="my-4 flex items-center">
      {path.map((pathElement, i) => (
        <div
          key={i}
          className={`flex items-center gap-x-1 ml-1 first-letter:uppercase ${
            pathElement === path[path.length - 1]
              ? "text-colorGrayOne font-bold"
              : "text-colorGrayThree font-medium"
          }`}
        >
          <Link
            href={`${
              pathname
                .split("/")
                .slice(0, i + 1)
                .join("/") === ""
                ? "/"
                : pathname
                    .split("/")
                    .slice(0, i + 1)
                    .join("/")
            }`}
          >
            <button className={`first-letter:uppercase`}>
              {pathElement == ""
                ? "home"
                : !isNaN(pathElement) && pathElement !== ""
                ? product?.attributes?.productName
                : pathElement.split("_").join(" ")}
            </button>
          </Link>
          <div
            className={`${
              pathElement === path[path.length - 1]
                ? "hidden"
                : pathElement === path[path.length - 2]
                ? "text-colorGrayOne"
                : "text-colorGrayThree"
            }`}
          >
            {">"}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Path;
