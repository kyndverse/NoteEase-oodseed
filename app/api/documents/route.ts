import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { createDocumentSchema } from "@/schemas/documents/create-document-schema";
import { flattenError } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedField = createDocumentSchema.safeParse(body);

    if (!validatedField.success) {
      return NextResponse.json(
        {
          error: flattenError(validatedField.error),
        },
        {
          status: 400,
        },
      );
    }

    const document = await prisma.document.create({
      data: {
        title: validatedField.data.title,
        content: body.content || [
          {
            id: uuid(),
            type: "paragraph",
            content: [],
          },
        ],
      },
    });

    return NextResponse.json(document);
  } catch {
    return NextResponse.json(
      {
        error: "Failed to create document",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET() {
  const documents = await prisma.document.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  return NextResponse.json(documents);
}
