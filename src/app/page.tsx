import { PlaceRecommendation } from '@/components/place-recommendation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Camera, Route } from 'lucide-react';
import Link from 'next/link';
import { BookingPortal } from '@/components/booking-portal';

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="relative flex flex-col items-center justify-center rounded-xl bg-card p-8 text-center md:min-h-[350px] overflow-hidden shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop')"}}
          data-ai-hint="India landmark"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold tracking-tight font-headline md:text-6xl text-foreground">
            Your Journey, Reimagined
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground md:text-xl">
            From crafting the perfect itinerary to preserving your cherished memories, Trip Mate is with you every step of the way.
          </p>
        </div>
      </section>

      <div id="booking-portal">
        <BookingPortal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="flex flex-col text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    <Route className="h-8 w-8 text-primary"/>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
                <CardTitle className="text-2xl font-bold font-headline">Plan a Trip</CardTitle>
                <p className="mt-2 text-muted-foreground flex-grow">Let our AI find the perfect spots for you. Just tell us your preferences and we'll handle the rest.</p>
                <Button asChild size="lg" className="mt-6 text-lg h-12">
                    <Link href="#recommendations">
                        Get Started <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
        <Card className="flex flex-col text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <CardHeader>
                <div className="mx-auto bg-accent/20 p-4 rounded-full w-fit">
                    <Camera className="h-8 w-8 text-accent"/>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
                <CardTitle className="text-2xl font-bold font-headline">Capture Your Trip</CardTitle>
                <p className="mt-2 text-muted-foreground flex-grow">Create a beautiful visual diary of your travels. Upload photos and let our AI tell your story.</p>
                 <Button asChild size="lg" className="mt-6 text-lg h-12" variant="outline">
                    <Link href="/capture">
                        Start Capturing <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </div>

      <div id="recommendations">
        <PlaceRecommendation />
      </div>
    </div>
  );
}
