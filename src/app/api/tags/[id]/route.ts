import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";


export async function GET(_request: NextRequest, ctx: RouteContext<'/api/tags/[id]'>): Promise<NextResponse> {
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

  const tag = await prisma.tag.findFirst({
    where: {
      id: id,
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

  return NextResponse.json(tag, { status: 200 });
}