import { NextRequest, NextResponse } from 'next/server';
import {
  createCustomer,
  getCustomerByUid,
} from '@/controllers/CustomerController';
import JwtSign from '@/utils/JwtSign';
import withValidations from '@/utils/withValidations';
import { CustomerBody } from '@/types/CustomerTypes';

export async function POST(req: NextRequest) {
  console.log(req.headers);
  try {
    const body: CustomerBody = await withValidations(
      req.nextUrl.pathname,
      await req.json()
    );
    const checkCustomer = await getCustomerByUid(body.uid);
    if (checkCustomer) {
      const token = await JwtSign(checkCustomer);
      return NextResponse.json('The email is already exist in DB', {
        headers: { Authorization: `Bearer ${token}` },
        status: 200,
      });
    }
    const customer = await createCustomer(body);
    const token = await JwtSign(customer);
    return NextResponse.json('Saved to db', {
      headers: { Authorization: `Bearer ${token}` },
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ msg: 'WORKING' });
}
