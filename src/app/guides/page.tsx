
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const guides = [
  { id: 1, title: 'Guide to the Taj Mahal', description: 'Discover the history and beauty of the iconic symbol of love in Agra.', imageId: 'guide-taj-mahal' },
  { id: 2, title: 'Exploring Jaipur\'s Palaces', description: 'A tour of the Pink City\'s majestic forts and royal residences.', imageId: 'guide-jaipur' },
  { id: 3, title: 'Varanasi & the Ganges', description: 'Experience the spiritual heart of India along the sacred river.', imageId: 'guide-varanasi' },
];

export default function GuidesPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuides = guides.filter(guide =>
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <PageHeader
        title={t('pages.guides.title')}
        description={t('pages.guides.description')}
      />
      <div className="mt-8 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search guides..."
            className="pl-10 h-12 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {filteredGuides.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGuides.map((guide) => {
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
      ) : (
        <div className="text-center py-16">
          <h3 className="text-2xl font-bold font-headline">No Guides Found</h3>
          <p className="mt-2 text-muted-foreground">
            Try a different search term to find the guide you're looking for.
          </p>
        </div>
      )}
    </>
  );
}
