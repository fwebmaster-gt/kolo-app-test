/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/constants/axios";
import { Button, Container } from "@mui/material";
import Link from "next/link";
import FormItem from "@/components/FormItem";

export const fetchCache = "force-no-store";

const Page = async ({ params }: { params: { id: string } }) => {
  try {
    const response = await apiClient.get(`/items/${params.id}`);
    const data = response.data;

    return (
      <Container>
        <FormItem data={data} />
      </Container>
    );
  } catch {
    return (
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexDirection: "column",
          padding: "1rem",
          alignItems: "center",
          margin: "3rem 0",
        }}
      >
        <img
          width={300}
          height={220}
          alt="error-page"
          src={
            "https://cdni.iconscout.com/illustration/premium/thumb/nothing-found-here-illustration-download-in-svg-png-gif-file-formats--connection-error-404-not-pack-design-development-illustrations-6209371.png"
          }
        />
        <h1 style={{ textAlign: "center" }}>
          Error al cargar el producto{" "}
          <pre style={{ color: "gray", fontSize: ".9rem" }}>{params.id}</pre>
        </h1>

        <Link href={"/"}>
          <Button>Ir a un lugar seguro</Button>
        </Link>
      </div>
    );
  }
};

export default Page;
