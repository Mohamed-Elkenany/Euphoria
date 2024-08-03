"use client";
import { filterBySizeFun } from "@/app/_utitly/slices/filterSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
function Sizes({ filter }) {
  const dispatch = useDispatch();
  const sizes = ["s", "m", "l", "xl", "2xl", "3xl"];
  const cutomProduct = useSelector(
    (state) => state.rootReducer.filterProductSlice
  );
  console.log(cutomProduct);
  const filterSize = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      dispatch(filterBySizeFun([...cutomProduct.filterBySize, value]));
    } else {
      const filter = cutomProduct.filterBySize.filter((size) => {
        return size !== value;
      });
      dispatch(filterBySizeFun(filter));
    }
  };
  return (
    <div className="px-4">
      <div
        className={`${
          filter !== "size" && "hidden"
        } border-t border-colorGrayFour py-4 grid grid-cols-6 items-center content-center gap-5`}
      >
        {sizes.map((size, i) => (
          <label key={i} htmlFor={size}>
            <div
              className={`${
                cutomProduct.filterBySize.includes(size)
                  ? "bg-colorGrayOne text-colorGrayFive"
                  : "bg-colorGrayFive"
              } flex items-center justify-center shadow-md text-[16px] p-1 cursor-pointer rounded`}
            >
              <input
                onChange={filterSize}
                type="checkbox"
                name="filter"
                id={size}
                className="hidden"
                value={size}
              />
              <h6 className="uppercase">{size}</h6>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default Sizes;
