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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      currentLocation: 'Paris, France',
      pastTravelHistory: 'Beach vacations, historical sites in Italy and Greece.',
      statedPreferences: 'Interested in art museums, quiet cafes, and scenic walks.',
      realTimeWeatherConditions: 'Sunny, 22°C',
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
      <Card>
        <CardHeader>
          <CardTitle>Find Your Next Adventure</CardTitle>
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
                      <Input placeholder="e.g., Paris, France" {...field} />
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
                        placeholder="e.g., Beach vacations, historical sites..."
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
                        placeholder="e.g., Art museums, quiet cafes..."
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
                        <Input placeholder="e.g., Sunny, 22°C" {...field} />
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

              <Button type="submit" disabled={isLoading} className="w-full" variant="default">
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" /> Get Recommendations
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Your Personalized Suggestions</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          {isLoading && (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {recommendations && (
            <div className="space-y-3 text-sm text-foreground">
              {recommendations.split('\n').filter(line => line.trim() !== '').map((line, index) => (
                <p key={index} className="leading-relaxed">{line}</p>
              ))}
            </div>
          )}
          {!isLoading && !recommendations && (
            <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 p-8 text-center text-muted-foreground">
              <Wand2 className="mb-4 h-12 w-12" />
              <p className='font-medium'>Your travel recommendations will appear here.</p>
              <p className="text-xs">
                Fill out the form and let our AI do the magic!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
