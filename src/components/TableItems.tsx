import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Item } from "@prisma/client";
import ItemActions from "./ItemActions";
import { Alert, Stack } from "@mui/material";

export default function TableItems({ items }: { items: Item[] }) {
  return (
    <>
      <TableContainer content="hola" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Nombre</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Precio</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Tipo</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Codigo</TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="info">Sin registros</Alert>
                  </Stack>
                </TableCell>
              </TableRow>
            )}
            {items.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.nombre}</TableCell>
                <TableCell>
                  Q
                  {row.precio.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell style={{ textTransform: "capitalize" }}>
                  {row.tipo}
                </TableCell>
                <TableCell>{row.codigo}</TableCell>
                <ItemActions data={row} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
