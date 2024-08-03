"use client";
import React, { useRef, useState } from "react";
import Sizes from "./Sizes";
import Colors from "./Colors";
import { IoMdClose } from "react-icons/io";
import {
  setFilterTypeFun,
  setMaxPriceFun,
  setMinPriceFun,
} from "@/app/_utitly/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
function Filtering() {
  const cutomProduct = useSelector(
    (state) => state.rootReducer.filterProductSlice
  );
  const dispatch = useDispatch();
  const filterRef = useRef();
  const [minFocus, setMinFocus] = useState(false);
  const [maxFocus, setMaxFocus] = useState(false);
  const filterType = ["price", "color", "size"];
  return (
    <div
      ref={filterRef}
      className="relative flex items-center gap-3 mb-4 w-1/3 z-30"
    >
      {filterType.map((type, i) => (
        <div
          onClick={() =>
            cutomProduct.filterType === type
              ? dispatch(setFilterTypeFun(null))
              : dispatch(setFilterTypeFun(type))
          }
          key={i}
          className={`${
            cutomProduct.filterType === type
              ? "bg-colorGrayOne text-colorGrayFive"
              : " text-colorGrayOne"
          } flex items-center justify-center px-4 py-1 border border-colorGrayOne rounded-[4px] text-[18px] tracking-wide font-medium cursor-pointer select-none`}
        >
          <h3 className="first-letter:uppercase">{type}</h3>
        </div>
      ))}
      <div
        className={`${
          !cutomProduct.filterType && "hidden"
        } absolute left-0 top-12 z-10 max-w-full bg-white rounded shadow-lg shadow-colorGrayOne`}
      >
        <div className="relative w-full">
          <button
            onClick={() => dispatch(setFilterTypeFun(null))}
            className="absolute top-0 right-0 text-colorGrayOne flex items-center justify-center border border-r-0 border-t-0 hover:bg-colorGrayOne hover:text-colorGrayFive rounded-md rounded-br-none duration-100 p-[1px] text-[18px]"
          >
            <IoMdClose />
          </button>
        </div>
        <div className="px-2 py-1">
          <h1 className=" first-letter:uppercase font-semibold text-colorGrayThree text-[24px] tracking-wider p-2">
            {cutomProduct.filterType}
          </h1>
          <div
            className={`${
              cutomProduct.filterType !== "price" && "hidden"
            } flex items-center gap-x-4 border-t p-4`}
          >
            <label htmlFor="min" className="flex flex-col">
              <h2>Min</h2>
              <div
                className={`${
                  minFocus
                    ? "outline outline-2 outline-colorPink"
                    : "outline-none"
                } flex items-center border rounded-sm pl-1 w-[100px] duration-100`}
              >
                <span className="text-colorGrayThree font-semibold">EGP</span>
                <input
                  onChange={(e) => dispatch(setMinPriceFun(e.target.value))}
                  onBlur={() => setMinFocus(false)}
                  onFocus={() => setMinFocus(true)}
                  type="number"
                  name=""
                  id="min"
                  className="outline-none h-[30px] pl-1 placeholder:text-xs rounded-sm w-full"
                  placeholder="Mini value"
                  defaultValue={300}
                />
              </div>
              <span className="text-xs text-colorGrayThree">
                (min value: 300)
              </span>
            </label>
            <label htmlFor="max" className="flex flex-col">
              <h2>Max </h2>
              <div
                className={`${
                  maxFocus
                    ? "outline outline-2 outline-colorPink"
                    : "outline-none"
                } flex items-center border rounded-sm pl-1 w-[100px] duration-100`}
              >
                <span className="text-colorGrayThree font-semibold">EGP</span>
                <input
                  onChange={(e) => dispatch(setMaxPriceFun(e.target.value))}
                  onBlur={() => setMaxFocus(false)}
                  onFocus={() => setMaxFocus(true)}
                  type="number"
                  name=""
                  id="max"
                  className="outline-none h-[30px] pl-1 placeholder:text-xs rounded-sm w-full"
                  placeholder="Mini value"
                  defaultValue={300}
                />
              </div>
              <span className="text-xs text-colorGrayThree">
                (max value: 1000)
              </span>
            </label>
          </div>
        </div>
        <Sizes filter={cutomProduct.filterType} />
        <Colors filter={cutomProduct.filterType} />
      </div>
    </div>
  );
}

export default Filtering;
