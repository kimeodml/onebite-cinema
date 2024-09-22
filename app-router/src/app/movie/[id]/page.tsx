export default function Page({
  params,
}: {
  params: {
    id: string | string[];
  };
}) {
  return <div>movie : {params.id}</div>;
}
