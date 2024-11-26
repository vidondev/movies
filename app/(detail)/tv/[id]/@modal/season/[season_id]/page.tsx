import { TvSeasonDialog } from "@/components/tv-season-dialog";
import { Service } from "@/services/api";
import { cookies } from "next/headers";

export default async function SeasonDetail({
  params,
}: {
  params: { season_id: string; id: string };
}) {
  const region = cookies().get("region")?.value ?? "US";

  const tvShow = await Service.tv.detail(params.id, {
    language: region,
  });

  const seasonDetail = await Service.tvSeasons.details({
    id: params.id,
    season: params.season_id,
    params: {
      language: region,
    },
  });
  console.log("🚀 ~ seasonDetail:", seasonDetail);

  return (
    <TvSeasonDialog
      tvShow={tvShow}
      seriesId={params.id}
      seasonDetails={seasonDetail}
      closeHref={`/tv/${params.id}`}
    />
  );
}
