import { CustomerBody } from '@/types/CustomerTypes';
import prisma from '../../prisma/prisma';
import { CreateWorkspace, DeleteWorkspace } from './WorkspaceController';

export const createCustomer = async (body: CustomerBody) => {
  const { uid, email, displayName, phoneNumber, photoURL } = body;
  try {
    const customer = await prisma.customer.create({
      data: {
        uid,
        email,
        displayName,
        phoneNumber,
        photoURL,
        workspaceIds: [],
      },
    });
    const workspaceId = await CreateWorkspace('Personal', customer.id);
    const updatedCustomer = await prisma.customer.update({
      where: { id: customer.id },
      data: { workspaceIds: { push: workspaceId } },
      include: { ownedWorkspace: true, workspaces: true },
    });
    return updatedCustomer;
  } catch (error) {
    throw error;
  }
};

export const getCustomerByUid = async (uid: string) => {
  try {
    const user = await prisma.customer.findFirst({
      where: { uid },
      include: { ownedWorkspace: true, workspaces: true },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const deleteCustomerWorkspace = async (workspaceId: string) => {
  try {
    const customers = await prisma.customer.findMany({
      where: { workspaceIds: { has: workspaceId } },
    });
    await DeleteWorkspace(workspaceId);
    await Promise.all(
      customers.map((customer) =>
        prisma.customer.update({
          where: { id: customer.id },
          data: {
            workspaceIds: {
              set: customer.workspaceIds.filter((id) => id !== workspaceId),
            },
          },
        })
      )
    );
  } catch (error) {
    throw error;
  }
};

export const CreateNewWorkspace = async (customerId: string, name: string) => {
  try {
    const workspaceId = await CreateWorkspace(name, customerId);
    const updatedCustomer = await prisma.customer.update({
      where: { id: customerId },
      data: { workspaceIds: { push: workspaceId } },
    });
    return updatedCustomer;
  } catch (error) {
    throw error;
  }
};
