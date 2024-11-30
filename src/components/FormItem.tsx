/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { Item, TipoItem } from "@prisma/client";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import InfoIcon from "@mui/icons-material/Info";
import { apiClient } from "@/constants/axios";
import toast from "react-hot-toast";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";

export interface FormData {
  nombre: string;
  codigo: string;
  precio: string;
  tipo: TipoItem;
}

const FormItem = ({ data }: { data?: Item }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nombre: data ? data.nombre : "",
      codigo: data ? data.codigo : "",
      precio: data ? `${data.precio}` : "",
      tipo: data ? data.tipo : "bien",
    },
  });

  const onSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      if (data) {
        await apiClient.put(`/items/${data.id}`, formData);
      } else {
        await apiClient.post("/items", formData);
      }

      toast.success("Creado correctamente");

      router.push("/");

      router.refresh();
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        toast.error(
          error.response.data.message === "CODE_EXIST"
            ? "El código ya está en uso. Por favor, elige otro código."
            : error.response.data.message
        );
      }

      setLoading(false);
    }
  };

  return (
    <div>
      <Paper
        className="centered-lg-third"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          padding: "1rem",
          margin: "2rem 0 0 0",
        }}
      >
        <Chip
          icon={<InfoIcon color="primary" />}
          label={`${data ? "Actualizando" : "Creando"} Producto`}
          variant="outlined"
        />
        <Controller
          name="nombre"
          control={control}
          rules={{ required: "El nombre es obligatorio" }}
          render={({ field }) => (
            <TextField
              {...field}
              size="small"
              label="Nombre *"
              variant="outlined"
              error={!!errors.nombre}
              helperText={errors.nombre?.message}
              disabled={loading}
            />
          )}
        />

        <Controller
          name="codigo"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size="small"
              label="Código"
              variant="outlined"
              error={!!errors.codigo}
              helperText={errors.codigo?.message}
              disabled={loading}
            />
          )}
        />

        <FormControl>
          <InputLabel id="tipo-label">Tipo</InputLabel>
          <Controller
            name="tipo"
            control={control}
            rules={{ required: "El tipo es requerido" }}
            render={({ field }) => (
              <Select
                {...field}
                size="small"
                labelId="tipo-label"
                id="tipo"
                label="Tipo"
                error={!!errors.tipo}
                style={{ width: "100%" }}
                disabled={loading}
              >
                <MenuItem value="servicio">Servicio</MenuItem>
                <MenuItem value="bien">Bien</MenuItem>
              </Select>
            )}
          />
        </FormControl>
        {errors.tipo && (
          <p style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.tipo.message}
          </p>
        )}

        <Controller
          name="precio"
          control={control}
          rules={{
            required: "El precio es requerido",
            pattern: {
              value: /^[0-9]*\.?[0-9]+$/,
              message: "Precio invalido",
            },
            validate: (value) =>
              +value > 0 || "El precio debe ser mayor a cero",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              size="small"
              label="Precio (Q)"
              variant="outlined"
              error={!!errors.precio}
              helperText={errors.precio?.message}
              disabled={loading}
            />
          )}
        />

        {loading ? (
          <div style={{ margin: "0 auto" }}>
            <CircularProgress />
          </div>
        ) : (
          <div>
            <Link href={data ? `/items/${data.id}` : "/"}>
              <Button
                style={{ margin: "0 1.6rem 0 0" }}
                color="error"
                type="button"
              >
                Cancelar
              </Button>
            </Link>

            <Button type={"submit"} color="primary">
              Guardar
            </Button>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default FormItem;
