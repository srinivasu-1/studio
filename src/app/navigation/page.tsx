import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function NavigationPage() {
  const mapImage = PlaceHolderImages.find(p => p.id === 'navigation-map');

  return (
    <>
      <PageHeader
        title="Navigation Portal"
        description="Find your way, online or offline."
      />
      <Card className="mt-8">
        <CardContent className="p-4">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted flex items-center justify-center">
            {mapImage ? (
                <Image
                  src={mapImage.imageUrl}
                  alt={mapImage.description}
                  width={1200}
                  height={800}
                  className="object-cover"
                  data-ai-hint={mapImage.imageHint}
                />
            ) : (
                <p className="text-muted-foreground">Map will be displayed here</p>
            )}
          </div>
          <p className="mt-4 text-center text-muted-foreground">
            Map navigation interface coming soon.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
