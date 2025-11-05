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

  const createdTag = await prisma.tag.create({
    data: {
      name: body.name as string,
      icon: body.icon as string,
    },
  });

  return NextResponse.json(createdTag, { status: 200 });
}
