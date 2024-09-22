# Waptcha SDK

This repo contains the source code for the JavaScript SDK for the [Waptcha platform](https://github.com/omnimarket-eth/waptcha/).

## Installation

```
npm i waptcha-sdk
```

## Usage

This SDK should work in most server-side JavaScript frameworks. The example below uses Next.js as the web framework:

```
// src/middleware.js
import { WaptchaSDK } from "waptcha-sdk"
import { NextResponse } from "next/server"

export async function middleware(request) {
  // Add Waptcha protection with just a few lines of code
  const waptcha = new WaptchaSDK(process.env.WAPTCHA_URL, process.env.WAPTCHA_ID)
  const isVerified = await waptcha.verify()

  // Redirection needs to be handled manually since this is framework specific
  if (!isVerified) return Response.redirect(waptcha.getWaptchaVerifyUrl())

  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  })
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
```

## More

The Waptcha SDK is a part of the [Waptcha Project](https://github.com/omnimarket-eth/waptcha/)
