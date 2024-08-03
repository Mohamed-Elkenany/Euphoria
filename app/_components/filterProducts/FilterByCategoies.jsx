"use client";
import React, { useEffect, useState } from "react";
import Filtering from "./Filtering";

function FilterByCategoies({ categories, handleFilterByCate }) {
  const [cateName, setCateName] = useState([]);
  const [allCates, setAllCates] = useState([]);
  const submitFilter = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCateName((cateName) => [...cateName, value]);
    } else {
      const filter = cateName.filter((cate) => {
        return cate !== value;
      });
      setCateName(filter);
    }
  };
  useEffect(() => {
    handleFilterByCate(cateName);
  }, [cateName]);
  useEffect(() => {
    const array = [];
    if (categories) {
      for (let index = 0; index < categories.length; index++) {
        const element = categories[index];
        if (
          !array.find(
            (ele) =>
              ele === element.attributes.our_category.data.attributes.cateName
          )
        ) {
          array.push(element.attributes.our_category.data.attributes.cateName);
        }
      }
      setAllCates(array);
    }
  }, [categories]);
  return (
    <div className="my-8">
      <div className="w-full flex items-center gap-3 mb-4">
        {allCates.map((cate, i) => (
          <label key={i} htmlFor={cate}>
            <div
              className={`${
                cateName.includes(cate)
                  ? "bg-colorGrayOne text-colorGrayFive"
                  : " text-colorGrayOne"
              } flex items-center justify-center px-4 py-1 border border-colorGrayOne rounded-[4px] text-[18px] tracking-wide font-medium cursor-pointer select-none`}
            >
              <input
                onChange={submitFilter}
                type="checkbox"
                name="filter product"
                id={cate}
                className="hidden"
                value={cate}
              />
              <h3 className="first-letter:uppercase">{cate}</h3>
            </div>
          </label>
        ))}
      </div>
      <Filtering />
    </div>
  );
}

export default FilterByCategoies;
