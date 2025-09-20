
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { Input } from '@/components/ui/input';
import { Search, Loader2, Wand2, Sparkles } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { getGuide } from '@/app/actions';
import type { GenerateGuideOutput } from '@/ai/flows/generate-guide-flow';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  query: z.string().min(3, 'Please enter at least 3 characters.'),
});

type FormData = z.infer<typeof formSchema>;

export default function GuidesPage() {
  const { t } = useTranslation();
  const [generatedGuide, setGeneratedGuide] = useState<GenerateGuideOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setGeneratedGuide(null);
    try {
      const result = await getGuide(values);
      setGeneratedGuide(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem generating your guide.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <PageHeader
        title={t('pages.guides.title')}
        description={t('pages.guides.description')}
      />
      <Card className="mt-8 shadow-lg">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        placeholder="e.g., 'Best beaches in Goa' or 'Hill stations near Mumbai'"
                        className="pl-10 h-12 text-base"
                        {...field}
                      />
                    </div>
                    <FormMessage className="mt-2" />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="h-12 text-base">
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Wand2 className="mr-2 h-5 w-5" /> Generate Guide
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="mt-8">
        {isLoading && (
          <div className="flex flex-col items-center justify-center text-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <h3 className="text-2xl font-bold font-headline">Generating Your Guide...</h3>
            <p className="mt-2 text-muted-foreground">
              Our AI is exploring the best spots for you. This might take a moment.
            </p>
          </div>
        )}

        {generatedGuide && (
          <Card className="shadow-2xl animate-in fade-in-50">
            <CardHeader>
              <CardTitle className="text-3xl font-bold font-headline">{generatedGuide.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-muted-foreground">{generatedGuide.description}</p>
              <div>
                <h3 className="text-xl font-bold font-headline mb-4">Key Highlights</h3>
                <ul className="space-y-3">
                  {generatedGuide.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span className="text-base">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {!isLoading && !generatedGuide && (
          <div className="text-center py-16 border-2 border-dashed rounded-xl">
            <Wand2 className="mx-auto h-16 w-16 text-primary/50" />
            <h3 className="mt-4 text-2xl font-bold font-headline">Your Custom Guide Awaits</h3>
            <p className="mt-2 text-muted-foreground">
              Enter a topic above to generate a personalized travel guide with AI.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
