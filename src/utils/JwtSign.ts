import * as jose from 'jose';

export default async function JwtSign(payload: object) {
  const token = await new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .sign(new TextEncoder().encode(`${process.env.JWT_SECRET_KEY}`));
  return token;
}
