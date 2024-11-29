import { NextRequest, NextResponse } from "next/server";

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
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const itemId = params.id;

  if (!itemId) {
    return NextResponse.json({ error: "Item id not found" }, { status: 404 });
  }

  return NextResponse.json({ msg: "Actualizando " + params.id });
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
    return NextResponse.json(
      { message: "Item ya fue eliminado" },
      { status: 404 }
    );
  }

  await prisma.item.delete({ where: { id: itemId } });

  return NextResponse.json({ msg: "Eliminando " + params.id });
}
