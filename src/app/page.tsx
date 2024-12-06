import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import Filter from "@/components/Filter";
import CustomPagination from "@/components/Pagination";

import { apiClient } from "@/constants/axios";
import TableItems from "@/components/TableItems";
import ListError from "@/components/ListError";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

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
  try {
    const {
      search = "",
      tipo = "",
      startDate = "",
      endDate = "",
      page = "1",
      pageSize = "10",
    } = searchParams;

    const response = await apiClient.get(
      `/items?page=${page}&pageSize=${pageSize}&search=${search}&tipo=${tipo}&startDate=${startDate}&endDate=${endDate}`
    );

    const data = response.data;

    return (
      <Container>
        <Typography variant="h5" component="h2">
          Listado de productos
        </Typography>

        <Filter />

        <div style={{ margin: "1rem 0" }}>
          <Link href={"/items/create"}>
            <Button variant={"outlined"}>Crear nuevo</Button>
          </Link>
        </div>

        <TableItems items={data.results} />

        <CustomPagination
          currentPage={+data.page}
          totalItems={+data.totalItems}
          pageSize={+data.pageSize}
        />
      </Container>
    );
  } catch {
    return <ListError />;
  }
}
