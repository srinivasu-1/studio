type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-4xl font-bold tracking-tight font-headline">{title}</h2>
      {description && <p className="text-xl text-muted-foreground">{description}</p>}
    </div>
  );
}
