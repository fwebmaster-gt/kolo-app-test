"use client";

import {
  Button,
  Chip,
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

export interface FormData {
  nombre: string;
  codigo: string;
  precio: string;
  tipo: TipoItem;
}

const FormItem = ({ data }: { data?: Item }) => {
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

  const onSubmit = (formData: FormData) => {
    console.log(formData);
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
          label={`Actualizando Producto`}
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
            />
          )}
        />

        <div>
          <Link href={"/"}>
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
      </Paper>
    </div>
  );
};

export default FormItem;