import { UpdateWorkspaceName } from '@/controllers/WorkspaceController';
import { WorkspaceBody } from '@/types/WorkspaceTypes';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body: WorkspaceBody = await req.json();
  try {
    const workspace = await UpdateWorkspaceName(body.id, body.name);
    return NextResponse.json(workspace);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ msg: 'WORKING' });
}
