const Page = async ({ params }: { params: { id: string } }) => {
  return <div>detalle de {params.id}</div>;
};

export default Page;
