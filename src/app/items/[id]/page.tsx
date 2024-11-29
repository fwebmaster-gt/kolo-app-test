const Page = async ({ params }: { params: { id: string } }) => {
  return <div>detalle de {params.id}</div>;
};
export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    id: params.id,
  };
}

export default Page;
