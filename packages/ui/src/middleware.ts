import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(async (_, next) => {
  const response = await next();

  // response.headers.append("Content-Security-Policy", "script-src 'self'");

  return response;
});
