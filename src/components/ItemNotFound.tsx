"use client";

import { Button } from "@mui/material";
import { useRouter } from "nextjs-toploader/app";

const ItemNotFound = ({ id }: { id: string }) => {
  const router = useRouter();

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
        <pre style={{ color: "gray", fontSize: ".9rem" }}>{id}</pre>
      </h1>

      <Button
        onClick={() => {
          router.push("/");
          router.refresh();
        }}
      >
        Ir a un lugar seguro
      </Button>
    </div>
  );
};

export default ItemNotFound;
