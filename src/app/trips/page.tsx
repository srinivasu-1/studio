
'use client';

import Image from 'next/image';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Star } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useTranslation } from '@/hooks/use-translation';

const trips = [
  { id: 1, title: 'Golden Triangle Delight', dates: 'October 10 - October 17, 2024', imageId: 'trip-delhi-agra-jaipur', description: 'Explore the iconic cities of Delhi, Agra, and Jaipur.', price: '$1,200' },
  { id: 2, title: 'Kerala Backwater Bliss', dates: 'November 5 - November 12, 2024', imageId: 'trip-kerala', description: 'Relax on a houseboat and enjoy the serene backwaters.', price: '$950' },
  { id: 3, title: 'Himalayan Adventure', dates: 'March 20 - March 30, 2025', imageId: 'trip-himalayas', description: 'Trek through breathtaking mountain landscapes.', price: '$1,500' },
  { id: 4, title: 'Forest Escape', dates: 'April 5 - April 10, 2025', imageId: 'trip-forest', description: 'Experience wildlife and nature in a dense forest reserve.', price: '$800' },
];

export default function TripsPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex items-center justify-between">
        <PageHeader
          title={t('pages.trips.title')}
          description={t('pages.trips.description')}
        />
        <Button variant="default" size="lg">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Trip
        </Button>
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => {
          const placeholder = PlaceHolderImages.find(p => p.id === trip.imageId);
          return (
            <Card key={trip.id} className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group">
              <CardHeader className="p-0">
                {placeholder && (
                  <div className="relative h-56 w-full">
                    <Image
                      src={placeholder.imageUrl}
                      alt={placeholder.description}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint={placeholder.imageHint}
                    />
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-5 flex flex-col flex-grow">
                <CardTitle className="text-xl font-bold font-headline">{trip.title}</CardTitle>
                <CardDescription className="mt-1 text-base">{trip.dates}</CardDescription>
                <p className="mt-2 text-muted-foreground text-sm flex-grow">{trip.description}</p>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-lg font-bold text-primary">{trip.price}</p>
                    <Button variant="outline">View Details</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
