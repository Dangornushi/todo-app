import { PrismaClient, Todo } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  // todoテーブルから全件取得
  const todos: Todo[] = await prisma.todo.findMany();
  return Response.json(todos);
}

export async function POST(request: Request) {
  const { title }: { title: string } = await request.json();

  const response = await prisma.todo.create({
    data: {
      title,
    },
  });

  return Response.json(response);
}
