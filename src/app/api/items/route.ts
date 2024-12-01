/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from "@/database/prisma";
import { validateItemToCreate } from "@/database/validations/items";
import { addDays } from "date-fns";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const search = searchParams.get("search") || "";
    const tipo = searchParams.get("tipo") as "bien" | "servicio" | undefined;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const skip = (page - 1) * pageSize;

    const filters: any = {
      deleted: false,
    };

    if (search) {
      filters.OR = [
        { nombre: { contains: search, mode: "insensitive" } },
        { codigo: { contains: search, mode: "insensitive" } },
      ];
    }
    if (tipo) filters.tipo = tipo;

    if (startDate && endDate) {
      filters.createdAt = {
        gte: new Date(startDate),
        lte: addDays(new Date(endDate), 1),
      };
    } else if (startDate) {
      filters.createdAt = { gte: new Date(startDate) };
    } else if (endDate) {
      filters.createdAt = { lte: new Date(endDate) };
    }

    const results = await prisma.item.findMany({
      where: filters,
      skip,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalItems = await prisma.item.count({
      where: filters,
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    return NextResponse.json({
      results,
      page,
      pageSize,
      totalItems,
      totalPages,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al obtener los items" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validationError = validateItemToCreate(body);

  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 });
  }

  const codigo = body.codigo
    ? body.codigo
    : `${slugify(body.nombre)}-${nanoid(5)}`;

  const existingItem = await prisma.item.findUnique({
    where: { codigo },
  });

  if (existingItem) {
    return NextResponse.json({ message: "CODE_EXIST" }, { status: 400 });
  }

  const result = await prisma.item.create({
    data: {
      nombre: body.nombre,
      precio: +body.precio,
      tipo: body.tipo,
      codigo,
    },
  });

  return NextResponse.json(result);
}
