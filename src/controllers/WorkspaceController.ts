import prisma from '../../prisma/prisma';

export const CreateWorkspace = async (name: string, ownerId: string) => {
  try {
    const workspace = await prisma.workspace.create({
      data: {
        name,
        ownerId,
        memberIds: [ownerId],
      },
    });

    return workspace.id;
  } catch (error) {
    throw error;
  }
};

export const DeleteWorkspace = async (workspaceId: string) => {
  try {
    await prisma.workspace.delete({ where: { id: workspaceId } });
  } catch (error) {
    throw error;
  }
};

export const UpdateWorkspaceName = async (
  workspaceId: string,
  name: string
) => {
  try {
    const workspace = await prisma.workspace.update({
      where: { id: workspaceId },
      data: { name },
    });
    return workspace;
  } catch (error) {
    throw error;
  }
};
export const AddWorkspaceMember = async (
  workspaceId: string,
  customerId: string
) => {
  try {
    const workspace = await prisma.workspace.update({
      where: { id: workspaceId },
      data: { memberIds: { push: customerId } },
    });
    return workspace;
  } catch (error) {
    throw error;
  }
};
