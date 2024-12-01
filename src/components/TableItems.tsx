import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Item } from "@prisma/client";
import { Alert, Button, Chip, Stack } from "@mui/material";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import { formatPrice } from "@/constants/price";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { formatDateEs } from "@/constants/dates";

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
              <TableCell style={{ fontWeight: "bold" }}>Creado</TableCell>
              <TableCell
                style={{ fontWeight: "bold" }}
                align="center"
              ></TableCell>
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
                <TableCell>Q{formatPrice(row.precio)}</TableCell>
                <TableCell style={{ textTransform: "capitalize" }}>
                  <Chip
                    icon={
                      row.tipo === "servicio" ? (
                        <HomeRepairServiceIcon style={{ fontSize: "1rem" }} />
                      ) : (
                        <AssuredWorkloadIcon style={{ fontSize: "1rem" }} />
                      )
                    }
                    label={row.tipo}
                  />
                </TableCell>
                <TableCell>{row.codigo}</TableCell>
                <TableCell>{formatDateEs(row.createdAt)}</TableCell>
                <TableCell align="center">
                  <Link href={`/items/${row.id}`}>
                    <Button>
                      <VisibilityIcon />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
