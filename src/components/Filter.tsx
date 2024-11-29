/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";

export default function Filter() {
  const [showFilters, setShowFilters] = useState(true);

  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleSearch = (e?: FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Preserva otros parámetros en la URL y actualiza solo "search"
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", search);
    params.set("page", "1"); // Reiniciar a la página 1 cuando hay un filtro nuevo

    // Actualizar la URL, desencadenando una nueva solicitud SSR
    router.push(`/?${params.toString()}`);
  };

  const handleFilterByTipo = (tipoParam: string) => {
    // Preserva otros parámetros en la URL y actualiza solo "search"
    const params = new URLSearchParams(searchParams.toString());
    params.set("tipo", tipoParam === "todos" ? "" : tipoParam);
    params.set("page", "1"); // Reiniciar a la página 1 cuando hay un filtro nuevo
    // Actualizar la URL, desencadenando una nueva solicitud SSR
    router.push(`/?${params.toString()}`);
  };

  // efecto; si el search esta vacio lo elimina
  useEffect(() => {
    setIsMounted(true);

    if (search === "" && isMounted) {
      handleSearch();
    }
  }, [search]);

  return (
    <div>
      <Paper
        component="form"
        onSubmit={handleSearch}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          margin: "1rem 0 0 0",
        }}
      >
        <IconButton
          onClick={() => setShowFilters(!showFilters)}
          color={showFilters ? "inherit" : "primary"}
          sx={{ p: "10px" }}
          aria-label="filter"
        >
          {showFilters ? <FilterListOffIcon /> : <FilterListIcon />}
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Nombre o código"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="search"
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      {showFilters && (
        <div
          style={{
            background: "white",
            border: "1px solid #E7E7E8",
            padding: "1rem",
            borderRadius: "0 0 5px 5px",
          }}
        >
          <FormControl>
            <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
            <Select
              value={searchParams.get("tipo") || "todos"}
              defaultValue={"todos"}
              style={{ width: "140px" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              onChange={(e) => handleFilterByTipo(e.target.value)}
            >
              <MenuItem value={"todos"}>Todos</MenuItem>
              <MenuItem value={"servicio"}>Servicio</MenuItem>
              <MenuItem value={"bien"}>Bien</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}
    </div>
  );
}
