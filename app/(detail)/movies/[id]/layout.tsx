interface DetailLayoutProps {
  params: {
    id: string;
  };
  children: React.ReactNode;
}

export default async function DetailLayout({ children }: DetailLayoutProps) {
  return <div className="container">{children}</div>;
}
