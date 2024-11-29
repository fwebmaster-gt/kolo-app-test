import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Item } from "@prisma/client";

export default function TableItems({ items }: { items: Item[] }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Codigo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.nombre}</TableCell>
              <TableCell>
                Q
                {row.precio.toLocaleString("en-US", {
                  minimumFractionDigits: 2, // Asegura siempre 2 decimales
                  maximumFractionDigits: 2, // Limita a 2 decimales
                })}
              </TableCell>
              <TableCell style={{ textTransform: "capitalize" }}>
                {row.tipo}
              </TableCell>
              <TableCell>{row.codigo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
