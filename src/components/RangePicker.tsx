"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  DateRangePicker,
  defaultInputRanges,
  defaultStaticRanges,
  Range,
  RangeKeyDict,
} from "react-date-range";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";

export default function DateRangePickerCustom() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [isPicking, setIsPicking] = React.useState(false);

  const [dateValues, setDateValues] = React.useState<Range[]>([
    {
      startDate: new Date(searchParams.get("startDate") || new Date()),
      endDate: new Date(searchParams.get("endDate") || new Date()),
      key: "selection",
    },
  ]);

  const handleFilterDates = () => {
    const params = new URLSearchParams(searchParams.toString());
    const startDateFormatted = format(dateValues[0].startDate!, "MM-dd-yyyy");
    const endDateFormatted = format(dateValues[0].endDate!, "MM-dd-yyyy");

    params.set("startDate", startDateFormatted);
    params.set("endDate", endDateFormatted);
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
    setIsPicking(false);
  };

  const handleClearFilter = () => {
    router.push("/");
    setIsPicking(false);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("startDate");
    params.delete("endDate");
    params.set("page", "1");
    setDateValues([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);

    router.push(`/?${params.toString()}`);
  };

  const handleDateChange = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;
    if (selection) {
      setDateValues([selection]);
    }
  };

  return (
    <React.Fragment>
      <div>
        <p
          style={{ fontSize: "12px", fontWeight: "bold", textAlign: "center" }}
        >
          Rango de fechas
        </p>

        {searchParams.get("startDate") && searchParams.get("endDate") ? (
          <div>
            <p style={{ fontSize: "10px", textAlign: "center" }}>
              <b>Desde</b> {searchParams.get("startDate") || "Sin fecha"}
            </p>
            <p style={{ fontSize: "10px", textAlign: "center" }}>
              <b>Hasta</b> {searchParams.get("endDate") || "Sin fecha"}
            </p>
            <Button fullWidth onClick={() => setIsPicking(true)}>
              Editar
            </Button>
          </div>
        ) : (
          <Button size="small" onClick={() => setIsPicking(true)}>
            Establecer
          </Button>
        )}
      </div>
      <Dialog
        open={isPicking}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Rango de fechas</DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{ marginBottom: "1rem" }}
            id="alert-dialog-description"
          >
            Elige un rango de fechas para la búsqueda
          </DialogContentText>

          <DateRangePicker
            locale={es}
            ranges={dateValues}
            onChange={handleDateChange}
            staticRanges={defaultStaticRanges.map((range) => ({
              ...range,
              label: (range.label as string)
                .replace("Today", "Hoy")
                .replace("Yesterday", "Ayer")
                .replace("This Week", "Esta semana")
                .replace("Last Week", "La semana pasada")
                .replace("This Month", "Este mes")
                .replace("Last Month", "El mes pasado"),
            }))}
            inputRanges={defaultInputRanges.map((range) => ({
              ...range,
              label: (range.label as string)
                .replace("days up to today", "días hasta hoy")
                .replace("days starting today", "días desde hoy"),
            }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClearFilter} color="inherit">
            Limpiar
          </Button>
          <Button onClick={() => setIsPicking(false)} color="error">
            Cancelar
          </Button>
          <Button onClick={handleFilterDates} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
