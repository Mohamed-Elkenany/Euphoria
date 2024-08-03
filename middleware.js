import { NextResponse } from "next/server";
import getUserMeLoader from "./app/_data/actions/getUserMeLoader";


export const middleware = async (request) => {
    const user = await getUserMeLoader()
    const arrayPathname = request.nextUrl.pathname.split('/')
    if (user.data && (request.nextUrl.pathname === '/auth/signup' || request.nextUrl.pathname === '/auth/signin')) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    if (user.data && arrayPathname[arrayPathname.length - 1] === 'my_account') {
        return NextResponse.redirect(new URL('/my_account/Personal_Info', request.url));
    }
};


