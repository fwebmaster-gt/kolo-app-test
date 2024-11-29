"use client";

import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSearchParams } from "next/navigation";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useRouter } from "nextjs-toploader/app";

export default function CustomPagination({
  currentPage,
  totalItems,
  pageSize,
}: {
  currentPage: number;
  totalItems: number;
  pageSize: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalItems / pageSize);

  const handleChangePageSize = (pageSize: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageSize", pageSize);
    params.set("page", "1");

    router.push(`/?${params.toString()}`);
  };

  const handleChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    router.push(`/?${params.toString()}`);
  };

  return (
    <Stack
      sx={{
        margin: "2rem 0",
        width: "100%",
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        alignItems: "center",
        gap: "1rem",
      }}
      spacing={2}
    >
      <div>
        <FormControl>
          <InputLabel id="per-page">Por pagina</InputLabel>
          <Select
            size="small"
            value={searchParams.get("pageSize") || "10"}
            defaultValue={"10"}
            style={{ width: "100px" }}
            labelId="per-page"
            label="pageSize"
            onChange={(e) => handleChangePageSize(e.target.value)}
          >
            <MenuItem value={"5"}>5</MenuItem>
            <MenuItem value={"10"}>10</MenuItem>
            <MenuItem value={"15"}>15</MenuItem>
            <MenuItem value={"20"}>20</MenuItem>
            <MenuItem value={"25"}>25</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
}
