import prisma from "@/database/prisma";
import { validateItemToCreate } from "@/database/validations/items";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const itemId = params.id;

  if (!itemId) {
    return NextResponse.json({ error: "Item id not found" }, { status: 404 });
  }

  const data = await prisma.item.findUnique({ where: { id: itemId } });

  if (!data) {
    return NextResponse.json(
      { message: "Not Found: Item not exist" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const itemId = params.id;

  if (!itemId) {
    return NextResponse.json({ error: "Item id not found" }, { status: 404 });
  }

  const body = await req.json();

  const validationError = validateItemToCreate(body);

  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 });
  }

  const codigo = body.codigo
    ? body.codigo
    : `${slugify(body.nombre)}-P${nanoid(5)}F`;

  const existingItem = await prisma.item.findUnique({
    where: { codigo },
  });

  if (existingItem && existingItem.id !== itemId) {
    return NextResponse.json({ message: "CODE_EXIST" }, { status: 400 });
  }

  const result = await prisma.item.update({
    data: {
      nombre: body.nombre,
      precio: +body.precio,
      tipo: body.tipo,
      codigo,
    },
    where: {
      id: itemId,
    },
  });

  return NextResponse.json(result);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const itemId = params.id;

  if (!itemId) {
    return NextResponse.json({ message: "ItemId Invalido" }, { status: 400 });
  }

  const toDelete = await prisma.item.findUnique({ where: { id: itemId } });

  if (!toDelete) {
    return NextResponse.json({ message: "Producto no existe" });
  }

  await prisma.item.update({
    where: { id: itemId },
    data: {
      deleted: true,
      deletedAt: new Date(Date.now()),
    },
  });

  return NextResponse.json({ message: "Eliminando Correctamente" });
}
