import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

interface Arguments {
  params: {
    id: string;
  };
}

// export async function GET(request:NextRequest, args : Arguments) {
export async function GET(request: NextRequest, { params }: Arguments) {
  const { id } = params;

  const todo = await prisma.todo.findFirst({
    where: {
      id,
    },
  });

  if (!todo) {
    return NextResponse.json(
      {
        success: false,
        message: `Todo with id: ${id} not found`,
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    data: todo,
  });
}

const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
});

export async function PUT(request: NextRequest, { params }: Arguments) {
  const { id } = params;

  const todo = await prisma.todo.findFirst({
    where: {
      id,
    },
  });

  if (!todo) {
    return NextResponse.json(
      {
        success: false,
        message: `Todo with id: ${id} not found`,
      },
      { status: 400 }
    );
  }

  // const { complete, description, ...rest } = await request.json()
  try {
    const { complete, description } = await putSchema.validate(
      await request.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        complete,
        description,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedTodo,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    }, { status:400 });
  }
}
