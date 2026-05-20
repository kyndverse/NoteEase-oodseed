import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  const { id } = await context.params;

  const document = await prisma.document.findUnique({
    where: {
      id,
    },
  });

  return NextResponse.json(document);
}

export async function PATCH(
  req: Request,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  const { id } = await context.params;
  const body = await req.json();

  const document = await prisma.document.update({
    where: {
      id,
    },
    data: {
      content: body.content,
    },
  });

  return NextResponse.json(document);
}
