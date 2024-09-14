"use client";
import { useGetOurProductsMutation } from "@/app/_utitly/RTKQAPI/appApi";
import { getAllProductFun } from "@/app/_utitly/slices/filterSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
function Search() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [search, setSearch] = useState(null);
  const [openSearch, setOpenSearch] = useState(false);
  const [allProductsFun] = useGetOurProductsMutation();
  const [allProducts, setAllProducts] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  useEffect(() => {
    async function getAllProducts() {
      const response = await allProductsFun().then((res) => res.data);
      if (!response) {
        return;
      }
      setAllProducts(response.data);
      dispatch(getAllProductFun(response.data));
    }
    getAllProducts();
  }, [allProductsFun, dispatch]);
  useEffect(() => {
    if (allProducts?.length && search) {
      const filterProducts = allProducts.filter((product) => {
        return (
          product.attributes.productName
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1
        );
      });
      setAllProduct(filterProducts);
    }
    if (search?.length > 0) {
      setOpenSearch(true);
    } else {
      setOpenSearch(false);
    }
  }, [setSearch, search, allProducts]);

  return (
    <div className="search w-full">
      <div
        htmlFor="search"
        className="relative border-b flex items-center md:w-2/3"
      >
        <input
          type="text"
          name="searchInput"
          id="sreach"
          className="outline-none max-sm:placeholder:text-sm max-sm:text-lg w-full"
          placeholder="What are you looking for?"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button className="text-colorGrayTwo max-sm:text-lg sm:text-2xl flex items-center justify-center hover:bg-colorPink hover:text-colorGrayFive rounded-full p-2 duration-75">
          <IoSearchOutline className="bg-transparent" />
        </button>
        <div
          className={`absolute ${
            !openSearch ? "hidden" : "block max-h-[300px]"
          } bg-colorGrayFive grid max-sm:grid-cols-1 shadow-md max-sm:w-screen max-md:px-6 -left-6 sm:w-full max-sm:top-[35px] sm:top-[50px] p-2 rounded-md overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-colorGrayOne`}
        >
          {allProduct.length ? (
            allProduct.map((product, i) => (
              <button
                onClick={() => {
                  router.push(
                    `/shop/${product.attributes.forMen ? "men" : "women"}/${
                      product.id
                    }`,
                    setOpenSearch(false)
                  );
                }}
                key={i}
                className="flex items-start gap-x-2 py-2"
              >
                <div className="w-[50px] rounded-md overflow-hidden">
                  <Image
                    src={product.attributes.defaulteImg.data.attributes.url}
                    width={product.attributes.defaulteImg.data.attributes.width}
                    height={
                      product.attributes.defaulteImg.data.attributes.height
                    }
                    alt="product Iamge"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs font-bold text-start text-colorGrayOne text-nowrap truncate max-sm:w-[200px] w-[120px]">
                    {product.attributes.productName}
                  </span>
                  <span className="text-xs text-colorGrayThree font-medium my-2">
                    Color: {product.attributes.color}
                  </span>
                  <div className="flex items-center gap-x-1">
                    {product.attributes.sizes.data.map((size, i) => (
                      <span
                        key={i}
                        className="text-[8px] uppercase w-[20px] h-[20px] flex items-center justify-center bg-colorGrayOne text-colorGrayFive rounded-md"
                      >
                        {size.attributes.productSize}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="text-xs text-colorGrayThree font-medium text-center">
              <h1>No product with this keyword `{search}`</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
