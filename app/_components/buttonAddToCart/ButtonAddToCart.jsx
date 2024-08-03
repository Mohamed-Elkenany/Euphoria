import react from "react";
import { handleCart } from "@/app/_libs/services/customCart";
import { cartFun } from "@/app/_utitly/slices/userSlice";
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
function ButtonAddToCart({ product, size }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const tostSetting = {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };
  const mainUser = useSelector((state) => state.rootReducer.userSlice?.user);
  console.log(mainUser);
  const handleAddToCart = async () => {
    if (mainUser.user) {
      if (product === null || size === null) {
        return toast.warn(
          <>
            <h1 className="w-fit mx-auto text-white">
              Size of product is required
            </h1>
          </>,
          tostSetting
        );
      } else {
        const cartOfProducts = await handleCart({
          userId: mainUser.user.id,
          our_products: product,
          size,
          token: mainUser.jwt,
        });
        if (!cartOfProducts) {
          return toast.error(
            <>
              <h1 className="w-fit mx-auto text-white">
                Somthing wrong try again
              </h1>
            </>,
            tostSetting
          );
        } else if (cartOfProducts.ok && cartOfProducts.data) {
          dispatch(cartFun(cartOfProducts.data.data.attributes));
          return toast.success(
            <>
              <h1 className="w-fit mx-auto text-sm text-center text-white">
                {" "}
                Product add your cart successfully
              </h1>
            </>,
            tostSetting
          );
        } else if (cartOfProducts.ok && cartOfProducts.exist) {
          return toast.warn(
            <>
              <h1 className="w-fit mx-auto text-center text-white">
                This product exist in your cart with the same size
              </h1>
            </>,
            tostSetting
          );
        }
      }
    } else {
      router.push("/auth/signin");
    }
  };
  return (
    <>
      <button
        onClick={handleAddToCart}
        className="flex items-center gap-2 px-8 py-2 rounded-lg bg-colorPink text-colorGrayFive"
      >
        <BsCart3 />
        <h6>Add to cart</h6>
      </button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default ButtonAddToCart;
