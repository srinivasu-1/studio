import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Bus, Car, Train } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const transportOptions = [
  { type: 'Bus', icon: Bus, details: 'Local routes and schedules.', imageId: 'transport-bus' },
  { type: 'Taxi/Rideshare', icon: Car, details: 'Find a ride quickly.', imageId: 'transport-taxi' },
  { type: 'Train', icon: Train, details: 'Regional & long-distance.', imageId: 'transport-train' },
];

export default function TransportPage() {
  return (
    <>
      <PageHeader
        title="Transport Facility Finder"
        description="Find local taxis, shuttles, buses, and more."
      />
      <div className="mt-8 space-y-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search for transportation..." className="pl-10 h-12 text-base" />
          <Button className="absolute right-2 top-1/2 -translate-y-1/2" variant="default">Search</Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {transportOptions.map((option) => {
            const placeholder = PlaceHolderImages.find(p => p.id === option.imageId);
            return (
                <Card key={option.type} className="transition-shadow hover:shadow-lg">
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                    <div className="bg-primary/20 p-3 rounded-lg">
                        <option.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-lg font-bold font-headline">{option.type}</CardTitle>
                        <CardDescription>{option.details}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    {placeholder && (
                        <div className="relative h-40 w-full overflow-hidden rounded-md">
                            <Image
                            src={placeholder.imageUrl}
                            alt={placeholder.description}
                            fill
                            className="object-cover"
                            data-ai-hint={placeholder.imageHint}
                            />
                        </div>
                    )}
                </CardContent>
                </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
