import { cookies } from "next/headers";

const getUserToken = () => {
    const cookiesList = cookies()
    const token = cookiesList.get('jwt')?.value
    return token;
}

export default getUserToken;