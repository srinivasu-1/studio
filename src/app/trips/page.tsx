import Image from 'next/image';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const trips = [
  { id: 1, title: 'Summer in Santorini', dates: 'June 10 - June 20, 2024', imageId: 'trip-1' },
  { id: 2, title: 'Tokyo Adventure', dates: 'September 5 - September 15, 2024', imageId: 'trip-2' },
  { id: 3, title: 'Exploring the Alps', dates: 'December 20 - December 30, 2024', imageId: 'trip-3' },
];

export default function TripsPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <PageHeader
          title="My Trips"
          description="Plan and manage your upcoming adventures."
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
            <Card key={trip.id} className="overflow-hidden transition-shadow duration-300 hover:shadow-2xl hover:-translate-y-1">
              <CardHeader className="p-0">
                {placeholder && (
                  <div className="relative h-56 w-full">
                    <Image
                      src={placeholder.imageUrl}
                      alt={placeholder.description}
                      fill
                      className="object-cover"
                      data-ai-hint={placeholder.imageHint}
                    />
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-5">
                <CardTitle className="text-xl font-bold font-headline">{trip.title}</CardTitle>
                <CardDescription className="mt-1 text-base">{trip.dates}</CardDescription>
                <Button variant="outline" className="mt-4 w-full">View Details</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
