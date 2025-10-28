import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";


export async function GET(_request: NextRequest, ctx: RouteContext<'/api/documents/[id]'>): Promise<NextResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { id } = await ctx.params;
  if (!session) {
    return NextResponse.json(
      { error: "you are not authenticated" },
      { status: 401 },
    );
  }

  const document = await prisma.document.findFirst({
    where: {
        id: id
    },
    include: {
      owner: true,
      tag: true,
    },
  });

  return NextResponse.json(document, { status: 200 });
}


export async function PUT(request: NextRequest, ctx: RouteContext<'/api/documents/[id]'>): Promise<NextResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const body = await request.json();
  const { id } = await ctx.params;

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

  const updatedDocument = await prisma.document.update({
    where: {
      id: id,
    },
    data: {
        name: body.name,
        content: body.content,
        tagId: body.tagId,
    }
  });

  return NextResponse.json(updatedDocument, { status: 200 });
}


export async function DELETE(_request: NextRequest, ctx: RouteContext<'/api/documents/[id]'>): Promise<NextResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { id } = await ctx.params;

  if (!session) {
    return NextResponse.json(
      { error: "you are not authenticated" },
      { status: 401 },
    );
  }

  // only document owner can delete the document
  const document = await prisma.document.findUnique({
    where: {
      id: id,
    },
  });

  if (document?.ownerId !== session.user.id) {
    return NextResponse.json(
      { error: "You are not authorized to delete this document. Only the owner can delete." },
      { status: 403 },
    );
  }

  await prisma.document.delete({
    where: {
      id: id,
    }
  });

  return NextResponse.json("Successfully Deleted", { status: 200 });
}