import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(): Promise<NextResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      { error: "you are not authenticated" },
      { status: 401 },
    );
  }

  const tags = await prisma.tag.findMany();

  return NextResponse.json(tags, { status: 200 });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
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

  const tags = await prisma.tag.findFirst({
    where: {
      id: body.id,
    },
    include: {
      documents: {
        include: {
          owner: true,
          tag: true
        }
      },
    },
  });

  return NextResponse.json(tags, { status: 200 });
}
