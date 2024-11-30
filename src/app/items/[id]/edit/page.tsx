import { apiClient } from "@/constants/axios";
import { Container } from "@mui/material";
import FormItem from "@/components/FormItem";
import ItemNotFound from "@/components/ItemNotFound";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

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
    return <ItemNotFound id={params.id} />;
  }
};

export default Page;
