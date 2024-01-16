import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const { completed }: { completed: boolean } = await request.json();
  // リクエストのidを元にcompletedを反転させる
  const response = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      completed: !completed,
    },
  });
  return Response.json(response);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  // リクエストのidを元に削除
  const response = await prisma.todo.delete({
    where: {
      id,
    },
  });
  return Response.json(response);
}
