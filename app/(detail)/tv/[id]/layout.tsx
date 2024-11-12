import { Service } from "@/services/api";
import { format } from "date-fns";
import { cookies } from "next/headers";

interface DetailLayoutProps {
  params: {
    id: string;
  };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: DetailLayoutProps) {
  const region = cookies().get("region")?.value || "en-US";
  const { name, first_air_date, last_air_date } = await Service.tv.detail(
    params.id,
    {
      language: region,
    }
  );

  return {
    title: `${name}(TV Series ${format(first_air_date, "yyyy")} - ${format(
      last_air_date,
      "yyyy"
    )})`,
  };
}

export default async function DetailLayout({ children }: DetailLayoutProps) {
  return <div className="h-full">{children}</div>;
}
