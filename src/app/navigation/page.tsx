'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin } from 'lucide-react';

export default function NavigationPage() {
  const [start, setStart] = useState('Mumbai');
  const [end, setEnd] = useState('Delhi');
  const [showRoute, setShowRoute] = useState(false);

  const mapImage = PlaceHolderImages.find(p => p.id === 'navigation-map');
  const routeImage = PlaceHolderImages.find(p => p.id === 'navigation-route-line');

  const handleGetDirections = () => {
    if (start && end) {
      setShowRoute(true);
    }
  };

  return (
    <>
      <PageHeader
        title="Navigation Portal"
        description="Find your way across India, online or offline."
      />
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
            <Card>
                <CardContent className="p-6">
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold font-headline">Plan Your Route</h3>
                        <div className="space-y-4">
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input 
                                    placeholder="Starting point" 
                                    className="pl-10 h-12 text-base" 
                                    value={start}
                                    onChange={(e) => { setStart(e.target.value); setShowRoute(false); }}
                                />
                            </div>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input 
                                    placeholder="Destination" 
                                    className="pl-10 h-12 text-base"
                                    value={end}
                                    onChange={(e) => { setEnd(e.target.value); setShowRoute(false); }}
                                />
                            </div>
                        </div>
                        <Button className="w-full h-12 text-lg" onClick={handleGetDirections} disabled={!start || !end}>
                            Get Directions
                            <ArrowRight className="ml-2" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                <CardContent className="p-4">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted flex items-center justify-center relative">
                    {mapImage && (
                        <Image
                        src={mapImage.imageUrl}
                        alt={mapImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={mapImage.imageHint}
                        />
                    )}
                    {showRoute && routeImage && (
                        <Image
                            src={routeImage.imageUrl}
                            alt={routeImage.description}
                            fill
                            className="object-contain"
                            data-ai-hint={routeImage.imageHint}
                        />
                    )}
                </div>
                {showRoute && (
                    <p className="mt-4 text-center text-lg font-medium text-foreground">
                        Displaying route from <span className="text-primary">{start}</span> to <span className="text-primary">{end}</span>.
                    </p>
                )}
                 {!showRoute && (
                    <p className="mt-4 text-center text-muted-foreground">
                        Enter a starting point and destination to see your route.
                    </p>
                )}

                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
