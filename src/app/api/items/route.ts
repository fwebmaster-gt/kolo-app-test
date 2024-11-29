/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from "@/database/prisma";
import { validateItemToCreate } from "@/database/validations/items";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

// Listar items con paginación y filtros
export async function GET(req: NextRequest) {
  try {
    // Obtener los parámetros de consulta para la paginación y filtros
    const { searchParams } = req.nextUrl;

    const page = parseInt(searchParams.get("page") || "1", 10); // Página actual (default: 1)
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10); // Tamaño de página (default: 10)
    const search = searchParams.get("search") || ""; // Filtro combinado por nombre y código
    const tipo = searchParams.get("tipo") as "bien" | "servicio" | undefined; // Filtro por tipo (bien o servicio)
    const startDate = searchParams.get("startDate"); // Filtro por fecha de inicio
    const endDate = searchParams.get("endDate"); // Filtro por fecha de fin

    // Calculamos el salto (offset) para la paginación
    const skip = (page - 1) * pageSize;

    // Construimos el filtro
    const filters: any = {};

    if (search) {
      filters.OR = [
        { nombre: { contains: search, mode: "insensitive" } },
        { codigo: { contains: search, mode: "insensitive" } },
      ]; // Filtrar por nombre o código
    }
    if (tipo) filters.tipo = tipo; // Filtrar por tipo (bien o servicio)
    if (startDate && endDate) {
      filters.createdAt = {
        gte: new Date(startDate), // Fecha de inicio mayor o igual a startDate
        lte: new Date(endDate), // Fecha de fin menor o igual a endDate
      };
    } else if (startDate) {
      filters.createdAt = { gte: new Date(startDate) }; // Solo fecha de inicio
    } else if (endDate) {
      filters.createdAt = { lte: new Date(endDate) }; // Solo fecha de fin
    }

    // Realizamos la consulta con filtros y paginación
    const results = await prisma.item.findMany({
      where: filters,
      skip, // Salto de los primeros registros
      take: pageSize, // Número de registros a devolver
    });

    // Contamos el total de registros que coinciden con los filtros
    const totalItems = await prisma.item.count({
      where: filters,
    });

    // Calculamos el total de páginas disponibles
    const totalPages = Math.ceil(totalItems / pageSize);

    // Retornamos los resultados con la información de paginación
    return NextResponse.json({
      results,
      page,
      pageSize,
      totalItems,
      totalPages,
    });
  } catch (error) {
    // En caso de error, retornamos un error con código 500

    console.log(error);

    return NextResponse.json(
      { error: "Error al obtener los items" },
      { status: 500 }
    );
  }
}

// Crear Item
export async function POST(req: NextRequest) {
  const body = await req.json();

  const validationError = validateItemToCreate(body);

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const codigo = body.codigo
    ? body.codigo
    : `${slugify(body.nombre)}-${nanoid(5)}`;

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
