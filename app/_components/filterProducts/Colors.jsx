"use client";
import { filterByColorFun } from "@/app/_utitly/slices/filterSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import stc from "string-to-color";
function Colors({ filter }) {
  const dispatch = useDispatch();
  const coustomProduct = useSelector(
    (state) => state.rootReducer.filterProductSlice
  );
  const [filterColors, setFilterColors] = useState([]);
  const [colors, setColors] = useState([]);
  const filterColor = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      dispatch(filterByColorFun([...coustomProduct.filterByColor, value]));
    } else {
      const filter = coustomProduct.filterByColor.filter((color) => {
        return color !== value;
      });
      dispatch(filterByColorFun(filter));
    }
  };
  useEffect(() => {
    let color = [];
    if (coustomProduct?.allProducts?.length) {
      for (let index = 0; index < coustomProduct.allProducts.length; index++) {
        const element = coustomProduct.allProducts[index].attributes.color;
        if (!color.includes(element)) {
          color.push(element);
        }
      }
    }
    setColors(color);
  }, [coustomProduct?.allProducts]);
  return (
    <div className="Colors px-4">
      <div
        className={`${
          filter !== "color" && "hidden"
        } border-t border-colorGrayFour py-4 grid grid-cols-5 items-center content-center gap-3`}
      >
        {colors?.length
          ? colors.map((color, i) => (
              <label
                style={{
                  border: coustomProduct?.filterByColor?.includes(color)
                    ? `2px solid ${
                        color === "white"
                          ? "white"
                          : color === "black"
                          ? "black"
                          : stc(color)
                      }`
                    : "none",
                }}
                key={i}
                htmlFor={color}
                className={`box-border flex items-center justify-center ${
                  coustomProduct?.filterByColor?.includes(color)
                    ? `rounded-full p-[1px]`
                    : ""
                }`}
              >
                <div
                  style={{
                    backgroundColor:
                      color === "white"
                        ? "white"
                        : color === "black"
                        ? "black"
                        : stc(color),
                  }}
                  className={`checked relative after:border-t-[8px] 
                flex items-center justify-center shadow-md text-[18px] p-2 cursor-pointer rounded-full w-[35px] h-[35px] group`}
                >
                  <div className="absolute -top-[35px] text-colorGrayOne bg-colorGrayFive px-4 text-nowrap hidden group-hover:block rounded-md duration-700 font-semibold first-letter:uppercase">
                    {color}
                  </div>
                  <input
                    onChange={filterColor}
                    type="checkbox"
                    name="filter"
                    id={color}
                    className="hidden"
                    value={color}
                  />
                </div>
              </label>
            ))
          : ""}
      </div>
    </div>
  );
}

export default Colors;
