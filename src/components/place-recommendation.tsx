
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wand2, Loader2,Sparkles } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getRecommendations } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RecommendPlacesOfInterestOutput } from '@/ai/flows/recommend-places-of-interest';

const formSchema = z.object({
  currentLocation: z.string().min(1, 'Current location is required.'),
  pastTravelHistory: z.string().min(1, 'Past travel history is required.'),
  statedPreferences: z.string().min(1, 'Preferences are required.'),
  realTimeWeatherConditions: z
    .string()
    .min(1, 'Weather conditions are required.'),
  timeOfDay: z.string().min(1, 'Time of day is required.'),
});

type FormData = z.infer<typeof formSchema>;

export function PlaceRecommendation() {
  const [recommendations, setRecommendations] = useState<RecommendPlacesOfInterestOutput['recommendations'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentLocation: 'Delhi, India',
      pastTravelHistory: 'Weekend trips to hill stations, visited historical sites in Rajasthan.',
      statedPreferences: 'Interested in local cuisine, vibrant markets, and spiritual places.',
      realTimeWeatherConditions: 'Clear sky, 32°C',
      timeOfDay: 'Afternoon',
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setRecommendations(null);
    try {
      const result = await getRecommendations(values);
      setRecommendations(result.recommendations);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="border-2 border-primary/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Find Your Next Adventure</CardTitle>
          <CardDescription>Fill in your details below to get personalized travel suggestions within India.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="currentLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Mumbai, India" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pastTravelHistory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Past Travel History</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Visited Goa for beaches, explored temples in South India..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="statedPreferences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Preferences</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Street food, hiking, cultural festivals..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="realTimeWeatherConditions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weather</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Sunny, 35°C" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="timeOfDay"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time of Day</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Morning">Morning</SelectItem>
                              <SelectItem value="Afternoon">Afternoon</SelectItem>
                              <SelectItem value="Evening">Evening</SelectItem>
                              <SelectItem value="Night">Night</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" disabled={isLoading} size="lg" className="w-full text-lg h-12">
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-5 w-5" /> Get Recommendations
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            <div className="flex flex-col bg-muted/30 rounded-xl">
                <div className="p-6">
                    <h3 className="text-2xl font-headline">Your Personalized Suggestions</h3>
                    <p className="text-base text-muted-foreground">Our AI is crafting the perfect itinerary for you in India.</p>
                </div>
                <div className="flex flex-grow items-center justify-center p-6 pt-0">
                {isLoading && (
                    <div className="flex h-full flex-col items-center justify-center w-full text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                    <p className='text-lg font-medium text-foreground'>Generating recommendations...</p>
                    <p className="text-base text-muted-foreground">This may take a moment.</p>
                    </div>
                )}
                {recommendations && (
                    <div className="w-full space-y-6">
                    {recommendations.map((rec, index) => (
                        <div key={index} className="flex gap-4 items-start">
                        <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                            <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold font-headline text-foreground">{rec.title}</h3>
                            <p className="text-base text-muted-foreground">{rec.description}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                )}
                {!isLoading && !recommendations && (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                        <div className="relative w-full aspect-square max-w-sm">
                            <Image 
                                src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2000&auto=format&fit=crop" 
                                alt="Trip planning desk with a map" 
                                fill 
                                className="object-contain"
                                data-ai-hint="planning trip"
                            />
                        </div>
                      <p className="mt-4 text-center text-muted-foreground">
                        Fill out the form and let our AI magic happen!
                      </p>
                    </div>
                )}
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
