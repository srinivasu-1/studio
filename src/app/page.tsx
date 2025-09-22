
'use client';
import { PlaceRecommendation } from '@/components/place-recommendation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Camera, Route } from 'lucide-react';
import Link from 'next/link';
import { BookingPortal } from '@/components/booking-portal';
import { useTranslation } from '@/hooks/use-translation';

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="space-y-12">
      <section className="relative flex flex-col items-center justify-center rounded-xl bg-card p-8 text-center md:min-h-[350px] overflow-hidden shadow-lg">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{backgroundImage: "url('https://picsum.photos/seed/forest/1920/1080')"}}
          data-ai-hint="lush forest"
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
        <Card className="flex flex-col text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    <Route className="h-8 w-8 text-primary"/>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
                <CardTitle className="text-2xl font-bold font-headline">{t('home.plan.title')}</CardTitle>
                <p className="mt-2 text-muted-foreground flex-grow">{t('home.plan.description')}</p>
                <Button asChild size="lg" className="mt-6 text-lg h-12">
                    <Link href="#recommendations">
                        {t('home.plan.button')} <ArrowRight className="ml-2" />
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
                <CardTitle className="text-2xl font-bold font-headline">{t('home.capture.title')}</CardTitle>
                <p className="mt-2 text-muted-foreground flex-grow">{t('home.capture.description')}</p>
                 <Button asChild size="lg" className="mt-6 text-lg h-12" variant="outline">
                    <Link href="/capture">
                        {t('home.capture.button')} <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </div>

      <section id="recommendations">
        <PlaceRecommendation />
      </section>
    </div>
  );
}
