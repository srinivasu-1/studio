
'use client';

import Image from 'next/image';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

const guides = [
  { id: 1, title: 'Guide to the Taj Mahal', description: 'Discover the history and beauty of the iconic symbol of love in Agra.', imageId: 'guide-taj-mahal' },
  { id: 2, title: 'Exploring Jaipur\'s Palaces', description: 'A tour of the Pink City\'s majestic forts and royal residences.', imageId: 'guide-jaipur' },
  { id: 3, title: 'Varanasi & the Ganges', description: 'Experience the spiritual heart of India along the sacred river.', imageId: 'guide-varanasi' },
];

export default function GuidesPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader
        title={t('pages.guides.title')}
        description={t('pages.guides.description')}
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
