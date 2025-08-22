interface HeaderPageProps {
  children?: React.ReactNode;
  headerTitle: string;
  headerSubtitle?: string;
  headerActions?: React.ReactElement;
}

export function HeaderPage({ headerTitle, headerActions }: HeaderPageProps) {
  return (
    <div className="my-10 flex w-full justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{headerTitle}</h1>
        <p className="text-muted-foreground">
          Track your jewelry sales earnings and manage payout requests
        </p>
      </div>

      <div>
        <div className="flex justify-end">{headerActions}</div>
      </div>
    </div>
  );
}
