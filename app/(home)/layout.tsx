interface HomeLayoutProps {
  children: React.ReactNode;
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <div className="lg:rounded-tl-lg bg-accent fixed w-full h-full -z-10" />
      <div className="lg:rounded-tl-lg bg-accent fixed w-full h-[var(--radius)] z-20 lg:block hidden" />
      <div className="pt-[var(--radius)] py-4">{children}</div>
    </>
  );
}
