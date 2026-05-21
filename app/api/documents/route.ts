import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(req: Request) {
  const body = await req.json();

  const document = await prisma.document.create({
    data: {
      title: body.title,
      content: [
        {
          id: uuid(),
          type: "paragraph",
          content: [],
        },
      ],
    },
  });

  return NextResponse.json(document);
}

export async function GET() {
  const documents = await prisma.document.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  return NextResponse.json(documents);
}
