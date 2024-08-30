import { NextResponse } from 'next/server';

// List of protected routes
const protectedRoutes = ['/dashboard', '/chats', '/explore', '/favourites', '/my-profiles', '/notifications', '/subscription-plan', '/new-dashboard', '/fundraising', '/business-development', '/verification', '/discount-portal', '/discount-portal/create', '/post-serach', 'business-development', '/profile-search'];

function isAuthenticated(request: any) {
    // Implement your authentication logic here
    // This could involve checking a session, a token, etc.
    return request.cookies.get('token') && request.cookies.get('userData') ? true : false;
}

export function middleware(request: any) {
    const url = request.nextUrl.clone();
    if (protectedRoutes.includes(url.pathname)) {
        console.log(!isAuthenticated(request), 'isAuthenticated');
        if (!isAuthenticated(request)) {
            console.log('User is not authenticated');
            // Redirect to login if the user is not authenticated
            return NextResponse.redirect(new URL('/signin', request.url));
        }
    }
}