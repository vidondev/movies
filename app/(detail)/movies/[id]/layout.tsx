import { Service } from "@/services/api";

interface DetailLayoutProps {
  params: {
    id: string;
  };
  children: React.ReactNode;
  team: React.ReactNode;
}

export async function generateMetadata({ params }: DetailLayoutProps) {
  const { title } = await Service.movie.detail(params.id);

  return {
    title,
  };
}

export default async function DetailLayout({
  children,
  team,
}: DetailLayoutProps) {
  return <div className="h-full">{children}</div>;
}
