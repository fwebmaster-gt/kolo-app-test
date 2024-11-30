"use client";
import {
  Breadcrumbs,
  Button,
  Chip,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Item } from "@prisma/client";
import { formatPrice } from "@/constants/price";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import Link from "next/link";
import ConfirmAlert from "./ConfirmAlert";
import toast from "react-hot-toast";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { apiClient } from "@/constants/axios";

const ItemDetails = ({ data }: { data: Item }) => {
  const router = useRouter();

  const [isDelete, setIsDelete] = useState<boolean>(false);

  const handleDelete = async () => {
    await toast.promise(apiClient.delete(`/items/${data.id}`), {
      error: "Error al eliminar, intente de nuevo",
      loading: "Eliminando...",
      success: "Eliminado",
    });
    router.push("/");

    router.refresh();
  };

  return (
    <Paper
      className="centered-lg-third"
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "1rem",
        margin: "2rem 0 0 0",
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Productos
        </Link>

        <Typography sx={{ color: "text.primary" }}>{data.id}</Typography>
      </Breadcrumbs>
      <Chip
        icon={<InfoIcon color="primary" />}
        label={`Detalle De Producto`}
        variant="outlined"
      />

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <b>Nombre</b>
          <p> {data.nombre}</p>
        </div>

        <Divider orientation="horizontal" style={{ margin: "1rem 0" }} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <b>Codigo</b>
          <p> {data.codigo}</p>
        </div>

        <Divider orientation="horizontal" style={{ margin: "1rem 0" }} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <b>Tipo</b>
          <Chip
            style={{ textTransform: "capitalize" }}
            icon={
              data.tipo === "servicio" ? (
                <HomeRepairServiceIcon style={{ fontSize: "1rem" }} />
              ) : (
                <AssuredWorkloadIcon style={{ fontSize: "1rem" }} />
              )
            }
            label={data.tipo}
          />
        </div>

        <Divider orientation="horizontal" style={{ margin: "1rem 0" }} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <b>Precio</b>
          <p> Q{formatPrice(data.precio)}</p>
        </div>

        <Divider orientation="horizontal" style={{ margin: "1rem 0" }} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ConfirmAlert
            open={isDelete}
            title="Eliminar item?"
            description="No podra recuperar este registro NUNCA mas!"
            handleClose={() => setIsDelete(false)}
            onConfirm={handleDelete}
          >
            <Button onClick={() => setIsDelete(true)} color="error">
              Eliminar
            </Button>
          </ConfirmAlert>
          <Link href={`/items/${data.id}/edit`}>
            <Button color={"primary"}>Editar</Button>
          </Link>
        </div>
      </div>
    </Paper>
  );
};

export default ItemDetails;
