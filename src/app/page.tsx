import { PlaceRecommendation } from '@/components/place-recommendation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="relative flex flex-col items-center justify-center rounded-xl bg-card p-8 text-center md:min-h-[400px] overflow-hidden shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop')"}}
          data-ai-hint="India landmark"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold tracking-tight font-headline md:text-6xl text-foreground">
            Discover Your Next Adventure in India
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Let our AI find the perfect spots for you. Just tell us your preferences and we'll handle the rest.
          </p>
          <Button size="lg" className="mt-8 text-lg h-12 px-10">
            Get Started
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      <div id="recommendations">
        <PlaceRecommendation />
      </div>
    </div>
  );
}
