import { CreateNewWorkspace } from '@/controllers/CustomerController';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const workspace = await CreateNewWorkspace(body.id, body.name);
    return NextResponse.json(workspace);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ msg: 'WORKING' });
}
