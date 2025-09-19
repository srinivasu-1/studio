'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wand2, Loader2 } from 'lucide-react';

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
  const [recommendations, setRecommendations] = useState<string | null>(null);
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
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card className="border-2 border-primary/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Find Your Next Adventure</CardTitle>
          <CardDescription>Fill in your details below to get personalized travel suggestions within India.</CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
      <Card className="flex flex-col bg-muted/30 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Your Personalized Suggestions</CardTitle>
           <CardDescription>Our AI is crafting the perfect itinerary for you in India.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-grow items-center justify-center">
          {isLoading && (
            <div className="flex h-full flex-col items-center justify-center w-full text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
               <p className='text-lg font-medium text-foreground'>Generating recommendations...</p>
              <p className="text-base text-muted-foreground">This may take a moment.</p>
            </div>
          )}
          {recommendations && (
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {recommendations.split('\n').filter(line => line.trim() !== '').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          )}
          {!isLoading && !recommendations && (
            <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 p-8 text-center text-muted-foreground">
              <Wand2 className="mb-4 h-16 w-16 text-primary" />
              <p className='text-xl font-medium'>Your recommendations will appear here.</p>
              <p className="text-base mt-2">
                Fill out the form and let our AI magic happen!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
