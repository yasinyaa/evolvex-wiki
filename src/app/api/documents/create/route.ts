import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const body = await request.json();

  if (!session) {
    return NextResponse.json(
      { error: "you are not authenticated" },
      { status: 401 },
    );
  }

  if (!body) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 },
    );
  }

  const createdDocument = await prisma.document.create({
    data: {
      name: body.name as string,
      content: body.content as string,
      ownerId: session.user.id,
      tagId: body.tagId as string
    },
  });

  return NextResponse.json(createdDocument, { status: 200 });
}
