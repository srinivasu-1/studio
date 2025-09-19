type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="space-y-1.5">
      <h2 className="text-2xl font-bold tracking-tight font-headline">{title}</h2>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
}
