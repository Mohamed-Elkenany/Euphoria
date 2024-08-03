import getBaseUrl from "@/app/_utitly/getBaseUrl";
import getUserMeLoader from "./getUserMeLoader";
import axios from "axios";

export async function getUserById() {
  const userInfo = await getUserMeLoader();
  const path = `api/users/${userInfo.data.id}?populate[wishlist][populate][our_products][populate]=*&populate[cart][populate][productDetails][populate][our_product][populate]=imageColor&populate[cart][populate][productDetails][populate][size][populate]=id&populate[addresses][populate]=*`;
  const baseUrl = getBaseUrl(path);
  if (userInfo) {
    const response = await axios({
      url: baseUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.jwt}`,
      },
    });
    return response.data
  }
}

