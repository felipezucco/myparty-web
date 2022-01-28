import { AuthContext } from './../contexts/AuthContext';
import { useContext } from 'react';
import { apiInstance } from './../services/api';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {


  const { 'eventweb.token': token } = req.cookies;

  console.log('req.nextUrl.pathname', req.nextUrl.pathname);
  if (req.nextUrl.pathname === '/login') {
    console.log('entrou aqui');
    if (!!token) {
      return NextResponse.redirect('/dashboard')
    }
    //return NextResponse.redirect('/zones')
  }

  return NextResponse.next()
}
