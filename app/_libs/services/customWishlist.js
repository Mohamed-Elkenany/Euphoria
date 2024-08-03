import axios from "axios";

export async function handleWishlist({ userId, our_products, token }) {
  const userPath = `api/users/${userId}?populate[wishlist][populate][our_products][populate]=*`;
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
    if (!user.data.wishlist) {
      const createWishlist = await axios({
        url: new URL("/api/wishlists", baseUrl),
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          data: {
            our_products,
            users_permissions_user: userId,
          },
        },
      });
      if (!createWishlist.data) {
        return {
          ok: false,
          data: null,
          error: data.error,
        };
      }
      return { ok: true, data: createWishlist.data, error: false, add: true };
    } else if (user.data.wishlist.our_products.length === 0) {
      const updateWishlistPath = `/api/wishlists/${user.data.wishlist.id}?populate[our_products][populate]=*`;
      const newUrl = new URL(updateWishlistPath, baseUrl);
      const updateWishlist = await axios({
        url: newUrl,
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          data: {
            our_products,
          },
        },
      });
      if (!updateWishlist.data) {
        return {
          ok: false,
          data: null,
          error: data.error,
        };
      }
      return { ok: true, data: updateWishlist.data, error: false, add: true };
    } else {
      let arrayOfId = [];
      for (
        let index = 0;
        index < user.data.wishlist.our_products.length;
        index++
      ) {
        arrayOfId.push(user.data.wishlist.our_products[index].id);
      }
      if (arrayOfId.includes(our_products)) {
        const filterArray = arrayOfId.filter((ele) => {
          return ele !== our_products;
        });
        const updateWishlistPath = `/api/wishlists/${user.data.wishlist.id}?populate[our_products][populate]=*`;
        const newUrl = new URL(updateWishlistPath, baseUrl);
        const updateWishlist = await axios({
          url: newUrl,
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            data: {
              our_products: filterArray,
            },
          },
        });
        if (!updateWishlist.data) {
          return {
            ok: false,
            data: null,
            error: data.error,
          };
        }
        return {
          ok: true,
          data: updateWishlist.data,
          error: false,
          add: false,
        };
      } else {
        const newArray = arrayOfId.concat(our_products);
        const updateWishlistPath = `/api/wishlists/${user.data.wishlist.id}?populate[our_products][populate]=*`;
        const newUrl = new URL(updateWishlistPath, baseUrl);
        const updateWishlist = await axios({
          url: newUrl,
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            data: {
              our_products: newArray,
            },
          },
        });
        if (!updateWishlist.data) {
          return {
            ok: false,
            data: null,
            error: data.error,
          };
        }
        return { ok: true, data: updateWishlist.data, error: false, add: true };
      }
    }
  }
}

export async function customWishlsitAfterLogIn({
  userId,
  wishlist,
  token,
  wishlistId,
  our_products,
}) {
  const updateWishlistPath = `/api/wishlists/${wishlistId}?populate[our_products][populate]=*`;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const newUrl = new URL(updateWishlistPath, baseUrl);
  if (!wishlist && !wishlistId) {
    const createWishlist = await axios({
      url: new URL("/api/wishlists", baseUrl),
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        data: {
          our_products,
          users_permissions_user: userId,
        },
      },
    });
    if (!createWishlist.data) {
      return {
        ok: false,
        data: null,
        error: data.error,
      };
    }
    return { ok: true, data: createWishlist.data, error: false, add: true };
    localStorage.removeItem("wishlist");
  } else if (!wishlist.length) {
    const updateWishlist = await axios({
      url: newUrl,
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        data: {
          our_products,
        },
      },
    });
    if (!updateWishlist.data) {
      return {
        ok: false,
        data: null,
        error: data.error,
      };
    }
    return { ok: true, data: updateWishlist.data, error: false, add: true };
    localStorage.removeItem('wishlist')
  } else {
    let arrayOfId = [];
    let newArrayOfId = [];
    for (let index = 0; index < wishlist.length; index++) {
      arrayOfId.push(wishlist[index].id);
    }
    for (let index = 0; index < our_products.length; index++) {
      if (arrayOfId.includes(our_products[index])) {
        continue;
      } else {
        newArrayOfId.push(our_products[index]);
      }
    }
    if (!newArrayOfId.length) {
      return;
    }
    const newArray = wishlist.concat(newArrayOfId);
    const updateWishlist = await axios({
      url: newUrl,
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        data: {
          our_products: newArray,
        },
      },
    });
    if (!updateWishlist.data) {
      return {
        ok: false,
        data: null,
        error: data.error,
      };
    }
    return { ok: true, data: updateWishlist.data, error: false, add: true };
    localStorage.removeItem('wishlist')
  }
}
