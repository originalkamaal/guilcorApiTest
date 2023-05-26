import * as jose from 'jose';

export default async function JwtVerify(token: string) {
  try {
    await jose.jwtVerify(
      token,
      new TextEncoder().encode(`${process.env.JWT_SECRET_KEY}`)
    );
    return true;
  } catch (error) {
    return false;
  }
}
