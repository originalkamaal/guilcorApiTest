import { deleteCustomerWorkspace } from '@/controllers/CustomerController';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await deleteCustomerWorkspace(id);
    return NextResponse.json({ msg: 'Workspace deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ msg: 'WORKING' });
}
