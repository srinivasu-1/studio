import Image from 'next/image';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';

const guides = [
  { id: 1, title: 'A Guide to Paris', description: 'Discover the city of lights, from the Eiffel Tower to hidden gems.', imageId: 'guide-eiffel' },
  { id: 2, title: 'Ancient Rome Revealed', description: 'Walk through history at the Colosseum, Forum, and more.', imageId: 'guide-colosseum' },
  { id: 3, title: 'The Wonders of Mount Fuji', description: 'Everything you need to know about Japan\'s iconic peak.', imageId: 'guide-fuji' },
];

export default function GuidesPage() {
  return (
    <>
      <PageHeader
        title="Travel Guides"
        description="Useful information about landmarks, culture, and local customs."
      />
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => {
          const placeholder = PlaceHolderImages.find(p => p.id === guide.imageId);
          return (
            <Card key={guide.id} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-2xl hover:-translate-y-1">
              {placeholder && (
                <CardHeader className="p-0">
                  <div className="relative h-56 w-full">
                    <Image
                      src={placeholder.imageUrl}
                      alt={placeholder.description}
                      fill
                      className="object-cover"
                      data-ai-hint={placeholder.imageHint}
                    />
                  </div>
                </CardHeader>
              )}
              <CardContent className="p-5 flex flex-col flex-grow">
                <CardTitle className="text-xl font-bold font-headline">{guide.title}</CardTitle>
                <p className="mt-2 text-base text-muted-foreground flex-grow">{guide.description}</p>
                <Button variant="outline" className="mt-4 w-full">Read Guide</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
