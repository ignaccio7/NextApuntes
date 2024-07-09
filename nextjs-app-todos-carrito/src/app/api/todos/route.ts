import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = +(searchParams.get("skip") ?? "0");

  if (isNaN(take)) {
    return NextResponse.json(
      {
        success: false,
        message: "Take must be a number",
      },
      { status: 400 }
    );
  }

  if (isNaN(skip)) {
    return NextResponse.json(
      {
        success: false,
        message: "Skip must be a number",
      },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    take,
    skip,
  });

  return NextResponse.json({
    success: true,
    data: todos,
  });
}

// Validaciones con yup
const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: NextRequest) {
  // const body = await request.json()

  try {
    const { description, complete } = await postSchema.validate(await request.json());

    const newTodo = await prisma.todo.create({
      data: { description, complete },
    });

    return NextResponse.json({
      success: true,
      data: newTodo,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `Error: ${error}`
    }, { status: 400 });
  }
}

export async function DELETE() {
  try {
    const deleteTodos = await prisma.todo.deleteMany({
      where: { complete: true }
    })
    return NextResponse.json({
      success:true,
      message: deleteTodos
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `Error: ${error}`
    }, { status: 400 });
  }
}
