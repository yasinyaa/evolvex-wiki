import { headers } from "next/headers";
import { NextResponse } from "next/server";
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
