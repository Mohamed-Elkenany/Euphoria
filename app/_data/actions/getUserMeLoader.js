import getBaseUrl from "@/app/_utitly/getBaseUrl";
import getUserToken from "../services/getUserToken";


async function getUserMeLoader () {
    const path =
      "/api/users/me?populate[wishlist][populate][our_products][populate]=*&populate[cart][populate][productDetails][populate][our_product][populate]=imageColor&populate[cart][populate][productDetails][populate][size][populate]=id";
    const baseUrl = getBaseUrl(path);
    const token = getUserToken();
    if (!token) {
        return {
            ok: false,
            data: null,
            error: null
        }
    }
    try {
        const response = await fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache:'no-cache'
        })
        const data = await response.json();
        if (data.error) {
            return {
                ok: false,
                data: null,
                error:data.error
            }
        }
        return { ok: true, data: data, error: null, jwt: token };
    } catch(error) {
        return {
            ok: false,
            data: null,
            error:error
        }
    }
};

export default getUserMeLoader;


