import { apiClient } from "@/constants/axios";
import { Container } from "@mui/material";
import ItemNotFound from "@/components/ItemNotFound";
import ItemDetails from "@/components/ItemDetails";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

const Page = async ({ params }: { params: { id: string } }) => {
  try {
    const response = await apiClient.get(`/items/${params.id}`);

    return (
      <Container>
        <ItemDetails data={response.data} />
      </Container>
    );
  } catch {
    return <ItemNotFound id={params.id} />;
  }
};

export default Page;
