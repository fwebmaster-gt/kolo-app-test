/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

const validTypes = ["bien", "servicio"];

export function validateItemToCreate(body: any) {
  if (!body.nombre) {
    return "Nombre es requerido";
  }

  if (!body.precio) {
    return "Precio es requerido";
  }

  if (!body.tipo) {
    return "Tipo es requerido";
  }

  if (body.tipo && !validTypes.includes(body.tipo)) {
    return `El tipo ${
      body.tipo
    } no es compatible; Validos: ${validTypes.toString()}`;
  }

  return null;
}

export function cleanItemBody(body: any) {
  let data: { [key: string]: any } = {};

  if (body.nombre) {
    data.nombre = body.nombre;
  }

  if (body.precio) {
    data.precio = body.precio;
  }

  if (body.codigo) {
    data.precio = body.precio;
  }

  if (body.tipo) {
    data.tipo = body.tipo;
  }

  return data;
}
