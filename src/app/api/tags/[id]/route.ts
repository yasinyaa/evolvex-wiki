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

export async function PUT(request: NextRequest, ctx: RouteContext<'/api/tags/[id]'>): Promise<NextResponse> {
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

  const updatedTag = await prisma.tag.update({
    where: {
      id: id,
    },
    data: {
        name: body.name,
        icon: body.icon,
    }
  });

  return NextResponse.json(updatedTag, { status: 200 });
}