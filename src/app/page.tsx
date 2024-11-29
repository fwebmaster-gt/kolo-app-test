// app/items/page.tsx
import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import Filter from "@/components/Filter";
import CustomPagination from "@/components/Pagination";
import TableItems from "@/components/TableItems";
import { apiClient } from "@/constants/axios";

export const dynamic = "force-dynamic"; // Garantiza que la página se regenere en cada request si está en cache

// Este es un componente que usa SSR
export default async function Home({
  searchParams,
}: {
  searchParams: {
    search?: string;
    tipo?: string;
    startDate?: string;
    endDate?: string;
    page?: string;
    pageSize?: string;
  };
}) {
  const {
    search = "",
    tipo = "",
    startDate = "",
    endDate = "",
    page = "1",
    pageSize = "10",
  } = searchParams;

  // Llama a la API desde el servidor para obtener los datos
  const response = await apiClient.get(
    `/items?page=${page}&pageSize=${pageSize}&search=${search}&tipo=${tipo}&startDate=${startDate}&endDate=${endDate}`
  );

  const data = response.data;

  return (
    <Container>
      <Typography variant="h5" component="h2">
        Listado de Items
      </Typography>

      <Filter />

      <div style={{ margin: "1rem 0" }}>
        <Link href={"/items/create"}>
          <Button variant={"outlined"}>Crear nuevo</Button>
        </Link>
      </div>

      <TableItems items={data.results} />

      <CustomPagination
        currentPage={+data.page} // Página actual (desde SSR)
        totalItems={+data.totalItems} // Total de items (desde SSR)
        pageSize={+data.pageSize} // Items por página
      />
    </Container>
  );
}
