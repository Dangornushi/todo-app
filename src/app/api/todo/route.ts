import { PrismaClient, Todo } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  // todoテーブルから全件取得
  const todos: Todo[] = await prisma.todo.findMany();
  return Response.json(todos);
}

export async function POST(request: Request) {
  const requestJson = await request.json();
  const requestJson2 = requestJson;
  const { title }: { title: string } = requestJson;
  const { contents }: { contents: string } = requestJson2;

  const response = await prisma.todo.create({
    data: {
      title,
      contents,
    },
  });

  return Response.json(response);
}
