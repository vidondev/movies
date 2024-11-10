export default async function NowPlaying() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 5000);
  });

  const value = await promise;

  return <div>Now Playing</div>;
}
