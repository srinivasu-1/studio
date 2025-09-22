
'use client';
import { PlaceRecommendation } from '@/components/place-recommendation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Camera, Route, Star } from 'lucide-react';
import Link from 'next/link';
import { BookingPortal } from '@/components/booking-portal';
import { useTranslation } from '@/hooks/use-translation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';


const popularTours = [
  { id: 1, title: 'Golden Triangle Delight', location: 'Delhi, Agra, Jaipur', duration: '7 Days', rating: 4.8, imageId: 'trip-delhi-agra-jaipur' },
  { id: 2, title: 'Kerala Backwater Bliss', location: 'Alleppey, Kerala', duration: '5 Days', rating: 4.9, imageId: 'trip-kerala' },
  { id: 3, title: 'Himalayan Adventure', location: 'Manali, Himachal Pradesh', duration: '10 Days', rating: 4.7, imageId: 'trip-himalayas' },
  { id: 4, title: 'Forest Escape', location: 'Jim Corbett, Uttarakhand', duration: '4 Days', rating: 4.6, imageId: 'trip-forest' },
];


export default function Home() {
  const { t } = useTranslation();
  
  const planTripImage = PlaceHolderImages.find(p => p.id === 'home-plan-trip');
  const captureTripImage = PlaceHolderImages.find(p => p.id === 'home-capture-trip');

  return (
    <div className="space-y-12">
      <section className="relative flex flex-col items-center justify-center rounded-xl bg-card p-8 text-center md:min-h-[350px] overflow-hidden shadow-lg">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2070&auto=format&fit=crop')"}}
          data-ai-hint="valley hike"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold tracking-tight font-headline md:text-6xl text-foreground">
            {t('home.hero.title')}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground md:text-xl">
            {t('home.hero.description')}
          </p>
        </div>
      </section>

      <section id="booking-portal">
        <BookingPortal />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="relative flex flex-col text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden group">
              {planTripImage && (
                <div className="absolute inset-0">
                  <Image src={planTripImage.imageUrl} alt={planTripImage.description} fill className="object-cover transition-transform duration-500 group-hover:scale-110" data-ai-hint={planTripImage.imageHint} />
                  <div className="absolute inset-0 bg-black/50"></div>
                </div>
              )}
              <CardHeader className="relative text-white">
                  <div className="mx-auto bg-white/20 p-4 rounded-full w-fit">
                      <Route className="h-8 w-8 text-white"/>
                  </div>
              </CardHeader>
              <CardContent className="relative flex flex-col flex-grow text-white">
                  <CardTitle className="text-2xl font-bold font-headline">{t('home.plan.title')}</CardTitle>
                  <p className="mt-2 flex-grow">{t('home.plan.description')}</p>
                  <Button asChild size="lg" className="mt-6 text-lg h-12 bg-white/90 text-black hover:bg-white">
                      <Link href="#recommendations">
                          {t('home.plan.button')} <ArrowRight className="ml-2" />
                      </Link>
                  </Button>
              </CardContent>
          </Card>

          <Card className="relative flex flex-col text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden group">
              {captureTripImage && (
                <div className="absolute inset-0">
                  <Image src={captureTripImage.imageUrl} alt={captureTripImage.description} fill className="object-cover transition-transform duration-500 group-hover:scale-110" data-ai-hint={captureTripImage.imageHint} />
                   <div className="absolute inset-0 bg-black/50"></div>
                </div>
              )}
              <CardHeader className="relative text-white">
                  <div className="mx-auto bg-white/20 p-4 rounded-full w-fit">
                      <Camera className="h-8 w-8 text-white"/>
                  </div>
              </CardHeader>
              <CardContent className="relative flex flex-col flex-grow text-white">
                  <CardTitle className="text-2xl font-bold font-headline">{t('home.capture.title')}</CardTitle>
                  <p className="mt-2 flex-grow">{t('home.capture.description')}</p>
                  <Button asChild size="lg" className="mt-6 text-lg h-12 bg-white/20 border-white text-white hover:bg-white/30" variant="outline">
                      <Link href="/capture">
                          {t('home.capture.button')} <ArrowRight className="ml-2" />
                      </Link>
                  </Button>
              </CardContent>
          </Card>
      </div>

      <section>
          <div className="space-y-2 mb-8 text-center">
            <h2 className="text-4xl font-bold tracking-tight font-headline">Popular Tours</h2>
            <p className="text-xl text-muted-foreground">Explore our most sought-after travel packages across India.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {popularTours.map((tour) => {
              const placeholder = PlaceHolderImages.find(p => p.id === tour.imageId);
              return (
                <Card key={tour.id} className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group">
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
                         <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/50 px-3 py-1 text-white text-sm">
                           <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                           <span>{tour.rating}</span>
                         </div>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg font-bold font-headline truncate">{tour.title}</CardTitle>
                    <CardDescription className="mt-1 text-base">{tour.location} &bull; {tour.duration}</CardDescription>
                    <Button variant="outline" className="mt-4 w-full">View Details</Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
      </section>

      <section id="recommendations">
        <PlaceRecommendation />
      </section>
    </div>
  );
}
