"use client";
import {
  useGetProductIdMutation,
  useGetProductsCodeMutation,
} from "@/app/_utitly/RTKQAPI/appApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";
import ProductDescription from "@/app/_components/productDescription/ProductDescription";
import SliderForProduct from "@/app/_components/sliderForProduct/SliderForProduct";
import RateCustomer from "@/app/_components/Rate/RateCustomer";
import WebInfo from "@/app/_components/webInfo/WebInfo";
import SimilarProducts from "@/app/_components/similarProducts/SimilarProducts";
import ButtonAddToCart from "@/app/_components/buttonAddToCart/ButtonAddToCart";
import { useDispatch } from "react-redux";
import { getProductFun } from "@/app/_utitly/slices/aboutProductSlice";
function MenProductId() {
  const dispatch = useDispatch()
  const [productCodeFun, productCodeFunOperation] =
    useGetProductsCodeMutation();
  const [productIdFun, productIdFunOperation] = useGetProductIdMutation();
  const [product, setProduct] = useState();
  const [colorOfProduct, setColorOfProduct] = useState([]);
  const [Size, setSize] = useState(null);
  const params = useParams();
  const productId = params.productId;

  useEffect(() => {
    async function getProductCode() {
      const resonse = await productIdFun(productId);
      if (!resonse.data) {
        return (
          <div>
            <h2>Somthing happend try again</h2>
          </div>
        );
      }
      const productCodeResponse = await productCodeFun();
      if (!productCodeResponse.data) {
        return (
          <div>
            <h2>Somthing happend try again</h2>
          </div>
        );
      }
      dispatch(getProductFun(resonse.data.data))
      setProduct(resonse.data.data);
      const filterProductColor = productCodeResponse.data.data.find(
        (product) => {
          return (
            product.attributes.code ===
            resonse.data.data.attributes.product_code.data.attributes.code
          );
        }
      );
      setColorOfProduct(filterProductColor.attributes.our_products.data);
    }
    getProductCode();
  }, [dispatch, productCodeFun, productId, productIdFun]);
  return (
    <div className="cartPrduct w-full">
      {productCodeFunOperation.isLoading ||
        (productIdFunOperation.isLoading && (
          <div className="py-[20px] flex items-center justify-center text-2xl font-semibold text-colorGrayThree">
            <h1>Loading...</h1>
          </div>
        ))}
      {product && (
        <div>
          <div className="flex w-full mb-[70px] gap-x-16">
            <div className="flex-1 flex items-center justify-start gap-x-10 max-w-fit">
              <SliderForProduct
                arrayOfImage={product.attributes.arrayOfImage.data}
              />
            </div>
            <div className="flex-1 flex flex-col items-start justify-between min-h-full">
              <h1 className="text-[34px] font-bold tracking-wide text-colorGrayOne">
                {product.attributes.productName}
              </h1>
              <div className="text-colorGrayTwo font-medium flex items-center gap-x-3">
                <div>
                  <RateCustomer rate={product.attributes.rate} />
                </div>
                <div>{product.attributes.rate}</div>
                <div className="flex items-center gap-x-1">
                  <BiCommentDetail />
                  <span>120 Comment</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-x-4">
                  <h5 className="text-[18px] font-semibold">Select Size</h5>
                  <h6 className="text-colorGrayTwo flex items-end gap-1">
                    <span>Size Guide</span> <FaArrowRightLong />
                  </h6>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  {product.attributes.sizes.data.map((size, i) => (
                    <button
                      onClick={() => setSize(size.id)}
                      key={i}
                      className={`${
                        Size === size.id && "bg-colorGrayOne text-white"
                      } size-10 rounded-md uppercase shadow-md`}
                    >
                      {size.attributes.productSize}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex flex-col items-start gap-x-4">
                  <h5 className="text-[18px] font-semibold">
                    Colours Available
                  </h5>
                  <h5 className="text-[16px] font-semibold text-colorGrayOne tracking-wide py-2">
                    {product.attributes.color}
                  </h5>
                </div>
                <div className="flex items-center gap-2">
                  {colorOfProduct.map(
                    (color, i) =>
                      color.attributes.forMen && (
                        <button
                          onClick={() => setProduct(color)}
                          key={i}
                          className={`color relative ${
                            product.id === color.id &&
                            `border-2 border-colorPink rounded`
                          } w-[55px] p-1`}
                        >
                          <Image
                            src={
                              color.attributes.imageColor.data.attributes.url
                            }
                            width={
                              color.attributes.imageColor.data.attributes.width
                            }
                            height={
                              color.attributes.imageColor.data.attributes.height
                            }
                            alt="product color"
                            className="w-full rounded"
                          />
                        </button>
                      )
                  )}
                </div>
              </div>
              <div className="flex items-center gap-x-6">
                <ButtonAddToCart product={product} size={Size} />
                <div className="flex items-center justify-center px-6 py-2 rounded-lg border border-colorGrayOne">
                  <span>EGP {product.attributes.price}</span>
                </div>
              </div>
              <WebInfo />
            </div>
          </div>
          <ProductDescription />
          <SimilarProducts />
        </div>
      )}
    </div>
  );
}

export default MenProductId;
