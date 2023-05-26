import { AddWorkspaceMember } from '@/controllers/WorkspaceController';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const workspace = await AddWorkspaceMember(
      body.workspaceId,
      body.customerId
    );
    return NextResponse.json(workspace);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ msg: 'WORKING' });
}
