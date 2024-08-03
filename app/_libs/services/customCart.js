import axios from "axios";

export async function handleCart({ userId, our_products, size, token }) {
  const userPath = `api/users/${userId}?populate[cart][populate][productDetails][populate][size][populate]=id&populate[cart][populate][productDetails][populate][our_product][populate]=*`;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const user = await axios({
    url: new URL(userPath, baseUrl),
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!user.data) {
    return "somthing happend";
  } else {
    if (!user.data.cart) {
      const createCart = await axios({
        url: new URL("/api/carts", baseUrl),
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          data: {
            users_permissions_user: userId,
            productDetails: [
              {
                our_product: our_products,
                size,
                subTotal: our_products.attributes.price,
              },
            ],
          },
        },
      });
      if (!createCart.data) {
        return {
          ok: false,
          data: null,
          error: data.error,
        };
      }
      return { ok: true, data: createCart.data, error: false, add: true };
    } else if (user.data.cart.productDetails.length === 0) {
      const updateCartPath = `/api/carts/${user.data.cart.id}?populate[productDetails][populate][our_product][populate]=*&populate[productDetails][populate][size][populate]=*`;
      const newUrl = new URL(updateCartPath, baseUrl);
      const updateCart = await axios({
        url: newUrl,
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          data: {
            productDetails: [
              {
                our_product: our_products,
                size,
                subTotal: our_products.attributes.price,
              },
            ],
          },
        },
      });
      if (!updateCart.data) {
        return {
          ok: false,
          data: null,
          error: data.error,
        };
      }
      return { ok: true, data: updateCart.data, error: false, add: true };
    } else {
      let arrayOfId = [];
      for (
        let index = 0;
        index < user.data.cart.productDetails.length;
        index++
      ) {
        arrayOfId.push({
          our_product: user.data.cart.productDetails[index].our_product.id,
          amount: user.data.cart.productDetails[index].amount,
          size: user.data.cart.productDetails[index].size.id,
          subTotal: user.data.cart.productDetails[index].subTotal,
        });
      }
      if (
        arrayOfId.find(
          (ele) => ele.our_product === our_products.id && ele.size === size
        )
      ) {
        return { ok: true, data: null, exist: true, error: false, add: false };
      } else {
        const newArray = arrayOfId.concat({
          our_product: our_products,
          size,
          amount: 1,
          subTotal: our_products.attributes.price,
        });
        console.log(newArray);
        const updateCartPath = `/api/carts/${user.data.cart.id}?populate[productDetails][populate][our_product][populate]=*&populate[productDetails][populate][size][populate]=*`;
        const newUrl = new URL(updateCartPath, baseUrl);
        const updateCart = await axios({
          url: newUrl,
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            data: {
              productDetails: newArray,
            },
          },
        });
        if (!updateCart.data) {
          return {
            ok: false,
            data: null,
            error: data.error,
          };
        }
        return { ok: true, data: updateCart.data, error: false, add: true };
      }
    }
  }
}

// ....................  Remove product from cart  ................................

export async function removeFromCart({ userId, our_products, size, token }) {
  const userPath = `api/users/${userId}?populate[cart][populate][productDetails][populate][size][populate]=id&populate[cart][populate][productDetails][populate][our_product][populate]=*`;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const user = await axios({
    url: new URL(userPath, baseUrl),
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!user.data) {
    return "Somthing happend";
  } else {
    let arrayOfId = [];
    for (let index = 0; index < user.data.cart.productDetails.length; index++) {
      arrayOfId.push({
        our_product: user.data.cart.productDetails[index].our_product.id,
        amount: user.data.cart.productDetails[index].amount,
        size: user.data.cart.productDetails[index].size.id,
        subTotal: user.data.cart.productDetails[index].subTotal,
      });
    }
    const filterArrayOfId = arrayOfId.filter((objectOfId) => {
      if (objectOfId.our_product !== our_products) {
        return objectOfId;
      } else if (
        objectOfId.our_product === our_products &&
        objectOfId.size !== size
      ) {
        return objectOfId;
      }
    });
    const updateCartPath = `/api/carts/${user.data.cart.id}?populate[productDetails][populate][our_product][populate]=*&populate[productDetails][populate][size][populate]=*`;
    const newUrl = new URL(updateCartPath, baseUrl);
    const updateCart = await axios({
      url: newUrl,
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        data: {
          productDetails: filterArrayOfId,
        },
      },
    });
    if (!updateCart.data) {
      return {
        ok: false,
        data: null,
        error: data.error,
      };
    }
    return { ok: true, data: updateCart.data, error: false, add: true };
  }
}

// ....................  Handle product in cart  ................................

export async function incrementAndDecrementAmountOfProduct({
  userId,
  our_products,
  amount,
  subTotal,
  size,
  token,
}) {
  const userPath = `api/users/${userId}?populate[cart][populate][productDetails][populate][size][populate]=id&populate[cart][populate][productDetails][populate][our_product][populate]=*&populate=*`;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const user = await axios({
    url: new URL(userPath, baseUrl),
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!user.data) {
    return "Somthing happend";
  }
  let arrayOfId = [];
  for (let index = 0; index < user.data.cart.productDetails.length; index++) {
    if (
      user.data.cart.productDetails[index].our_product.id === our_products.id &&
      user.data.cart.productDetails[index].size.id === size.id
    ) {
      arrayOfId.push({
        our_product: our_products.id,
        amount,
        size: size.id,
        subTotal,
      });
    } else {
      arrayOfId.push({
        our_product: user.data.cart.productDetails[index].our_product.id,
        amount: user.data.cart.productDetails[index].amount,
        size: user.data.cart.productDetails[index].size.id,
        subTotal: user.data.cart.productDetails[index].subTotal,
      });
    }
  }
  const updateCartPath = `/api/carts/${user.data.cart.id}?populate[productDetails][populate][our_product][populate]=*&populate[productDetails][populate][size][populate]=*`;
  const newUrl = new URL(updateCartPath, baseUrl);
  const updateCart = await axios({
    url: newUrl,
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      data: {
        productDetails: arrayOfId,
      },
    },
  });
  if (!updateCart.data) {
    return {
      ok: false,
      data: null,
      error: data.error,
    };
  }
  return { ok: true, data: updateCart.data, error: false, add: true };
}
