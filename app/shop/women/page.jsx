"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/app/_components/ProductCard";
import FilterByCategoies from "@/app/_components/filterProducts/FilterByCategoies";
import { useDispatch, useSelector } from "react-redux";
import { handleWishlist } from "@/app/_libs/services/customWishlist";
import { wishlistFun } from "@/app/_utitly/slices/userSlice";

function WomenShopPage() {
  const dispatch = useDispatch();
  const mainUser = useSelector((state) => state.rootReducer?.userSlice.user);
  const customProducts = useSelector(
    (state) => state.rootReducer.filterProductSlice
  );
  const [allCategories, setAllCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const handleFilterByCate = (cates) => {
    const filterProduct = customProducts.allProducts.filter((product) => {
      if (
        cates.find(
          (ele) =>
            ele === product.attributes.our_category.data.attributes.cateName
        ) &&
        !product.attributes.forMen
      ) {
        return product;
      }
    });
    console.log(filterProduct);
    if (filterProduct.length) {
      setProducts(filterProduct);
    } else {
      const filterProductForWomen = customProducts.allProducts.filter(
        (product) => {
          return !product.attributes.forMen;
        }
      );
      setProducts(filterProductForWomen);
    }
  };
  const customWishlist = async ({ id, setWishlist }) => {
    if (mainUser.jwt) {
      const wishlist = await handleWishlist({
        userId: mainUser.user.id,
        our_products: id,
        token: mainUser.jwt,
      });
      if (wishlist.add) {
        setWishlist(true);
      } else {
        setWishlist(false);
      }
      dispatch(wishlistFun(wishlist.data.data.attributes.our_products.data));
    } else {
      if (localStorage.getItem("wishlist")) {
        const arrayOfProduct = JSON.parse(localStorage.getItem("wishlist"));
        if (arrayOfProduct.includes(id)) {
          const filterProduct = arrayOfProduct.filter((product) => {
            return product !== id;
          });
          setWishlist(false);
          localStorage.removeItem("wishlist");
          localStorage.setItem("wishlist", JSON.stringify(filterProduct));
          dispatch(wishlistFun(filterProduct));
        } else {
          setWishlist(true);
          arrayOfProduct.push(id);
          localStorage.removeItem("wishlist");
          localStorage.setItem("wishlist", JSON.stringify(arrayOfProduct));
          dispatch(wishlistFun(arrayOfProduct));
        }
      } else {
        setWishlist(true);
        localStorage.setItem("wishlist", JSON.stringify([id]));
        dispatch(wishlistFun([id]));
      }
    }
  };
  useEffect(() => {
    if (customProducts?.allProducts?.length) {
      const filterProductForWomen = customProducts.allProducts.filter(
        (product) => {
          return !product.attributes.forMen;
        }
      );
      setProducts(filterProductForWomen);
      setAllCategories(filterProductForWomen);
    }
  }, [customProducts?.allProducts]);
  return (
    <div>
      {products.length && (
        <div className="mb-[120px]">
          <FilterByCategoies
            categories={allCategories}
            handleFilterByCate={handleFilterByCate}
          />
          <div className="grid grid-cols-4 gap-8 mt-12">
            {products
              .filter((products) => {
                if (!customProducts.minPrice && !customProducts.MaxPrice) {
                  return products;
                } else if (
                  parseFloat(customProducts.minPrice) >= 300 &&
                  !customProducts.MaxPrice
                ) {
                  return (
                    products.attributes.price >=
                    parseFloat(customProducts.minPrice)
                  );
                } else if (
                  !customProducts.minPrice &&
                  parseFloat(customProducts.MaxPrice) <= 1000
                ) {
                  return (
                    products.attributes.price <=
                    parseFloat(customProducts.MaxPrice)
                  );
                } else if (
                  parseFloat(customProducts.minPrice) >= 300 &&
                  parseFloat(customProducts.MaxPrice) <= 1000
                ) {
                  console.log(products);
                  return (
                    products.attributes.price >= customProducts.minPrice &&
                    products.attributes.price <= customProducts.MaxPrice
                  );
                } else {
                  return products;
                }
              })
              .filter((product) => {
                if (customProducts.filterByColor.length) {
                  if (
                    customProducts.filterByColor.find(
                      (ele) => ele === product.attributes.color
                    )
                  ) {
                    return product;
                  }
                } else {
                  return product;
                }
              })
              .filter((product) => {
                if (customProducts.filterBySize?.length) {
                  for (
                    let index = 0;
                    index < customProducts.filterBySize.length;
                    index++
                  ) {
                    const element = customProducts.filterBySize[index];
                    if (
                      product.attributes.sizes.data.find(
                        (ele) =>
                          ele.attributes.productSize.toLowerCase() === element
                      )
                    ) {
                      return product;
                    }
                  }
                } else {
                  return product;
                }
              })
              .map((product, i) => (
                <ProductCard
                  key={i}
                  product={product}
                  customWishlist={customWishlist}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WomenShopPage;
