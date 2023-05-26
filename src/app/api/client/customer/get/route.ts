import { NextRequest, NextResponse } from 'next/server';
import { getCustomerByUid } from '@/controllers/CustomerController';
import JwtSign from '@/utils/JwtSign';
import withValidations from '@/utils/withValidations';

export async function POST(req: NextRequest) {
  console.log(req.headers);
  try {
    const body: { uid: string } = await withValidations(
      req.nextUrl.pathname,
      await req.json()
    );
    const user = await getCustomerByUid(body.uid);
    if (user) {
      const token = await JwtSign(user);
      return NextResponse.json('Sign-in successful', {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    return NextResponse.json({ error: 'No Customer Found' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ msg: 'WORKING' });
}
