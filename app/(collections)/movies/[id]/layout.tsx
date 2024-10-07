import { Service } from "@/services/api";
import kebabCase from "lodash/kebabCase";
import { RedirectType, notFound, redirect } from "next/navigation";

interface DetailLayoutProps {
  params: {
    id: string;
  };
  children: React.ReactNode;
}

export default async function DetailLayout({
  params,
  children,
}: DetailLayoutProps) {
  const { id } = params;
  const [movie_id, ...args] = id.split("-");
  if (isNaN(parseInt(movie_id))) return notFound();

  const movie = await Service.movie.detail(parseInt(movie_id));

  if (kebabCase(movie.original_title) !== kebabCase(args.join("-"))) {
    redirect(
      `/movies/${movie_id}-${kebabCase(movie.original_title)}`,
      RedirectType.replace
    );
  }

  return <div>{children}</div>;
}
