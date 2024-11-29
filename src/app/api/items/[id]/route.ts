import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const itemId = params.id;

  if (!itemId) {
    return NextResponse.json({ error: "Item id not found" }, { status: 404 });
  }

  return NextResponse.json({ msg: "Detalles de " + params.id });
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
    return NextResponse.json({ error: "Item id not found" }, { status: 404 });
  }

  return NextResponse.json({ msg: "Eliminando " + params.id });
}
