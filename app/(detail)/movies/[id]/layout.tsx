import { Service } from "@/services/api";

interface DetailLayoutProps {
  params: {
    id: string;
  };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: DetailLayoutProps) {
  const { title } = await Service.movie.detail(params.id);

  return {
    title,
  };
}

export default async function DetailLayout({ children }: DetailLayoutProps) {
  return <div className="h-full">{children}</div>;
}
