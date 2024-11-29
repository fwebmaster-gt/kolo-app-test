/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Button, TableCell } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiClient } from "@/constants/axios";
import toast from "react-hot-toast";
import { Item } from "@prisma/client";
import { useRouter } from "nextjs-toploader/app";
import ConfirmAlert from "./ConfirmAlert";
import { useState } from "react";
import Link from "next/link";

const ItemActions = ({ data }: { data: Item }) => {
  const router = useRouter();

  const [isDelete, setIsDelete] = useState<boolean>(false);

  const handleDelete = async () => {
    await toast.promise(apiClient.delete(`/items/${data.id}`), {
      error: "Error al eliminar, intente de nuevo",
      loading: "Eliminando...",
      success: "Eliminado",
    });
    router.refresh();
  };

  return (
    <TableCell align="center">
      <ConfirmAlert
        open={isDelete}
        title="Eliminar item?"
        description="No podra recuperar este registro NUNCA mas!"
        handleClose={() => setIsDelete(false)}
        onConfirm={handleDelete}
      >
        <Button onClick={() => setIsDelete(true)} color="error">
          <DeleteIcon />
        </Button>
      </ConfirmAlert>

      <Link href={`/items/${data.id}`}>
        <Button>
          <BorderColorIcon />
        </Button>
      </Link>
    </TableCell>
  );
};

export default ItemActions;
