
'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { Input } from '@/components/ui/input';
import { Send, Loader2, User, Sparkles } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { getChatReply } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth-context';
import { AppLogo } from '@/components/app-logo';

const formSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty.'),
});

type FormData = z.infer<typeof formSchema>;
type Message = {
    role: 'user' | 'model';
    text: string;
};

export default function ChatbotPage() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    const userMessage: Message = { role: 'user', text: values.message };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    form.reset();

    try {
      // The history needs to include the new user message.
      const historyForAI = newMessages.slice(0, -1);

      const result = await getChatReply({
          history: historyForAI.map(m => ({role: m.role, text: m.text})),
          message: values.message
      });
      const modelMessage: Message = { role: 'model', text: result.reply };
      setMessages([...newMessages, modelMessage]);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem communicating with the chatbot.',
      });
       setMessages(messages); // Revert to previous messages on error
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <PageHeader
        title={t('pages.chatbot.title')}
        description={t('pages.chatbot.description')}
      />
      <Card className="mt-8 shadow-lg h-[70vh] flex flex-col">
        <CardHeader>
           <div className="flex items-center gap-3">
              <div className="p-1 border rounded-full">
                <AppLogo />
              </div>
              <div>
                <h3 className="text-xl font-bold font-headline">Trip Mate Assistant</h3>
                <p className="text-sm text-muted-foreground">Ready to help you plan your trip in India.</p>
              </div>
           </div>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden p-0">
            <ScrollArea className="h-full p-6" ref={scrollAreaRef}>
                <div className="space-y-6">
                    {messages.length === 0 && (
                        <div className="text-center text-muted-foreground pt-16">
                            <Sparkles className="mx-auto h-12 w-12" />
                            <p className="mt-4">Ask me anything about traveling in India!</p>
                        </div>
                    )}
                    {messages.map((message, index) => (
                        <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                             {message.role === 'model' && (
                                <Avatar className="w-10 h-10 border">
                                    <div className="bg-primary flex items-center justify-center w-full h-full">
                                        <Sparkles className="w-6 h-6 text-primary-foreground" />
                                    </div>
                                </Avatar>
                            )}
                            <div className={`max-w-md p-4 rounded-2xl shadow-sm ${message.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none'}`}>
                                <p className="text-base">{message.text}</p>
                            </div>
                            {message.role === 'user' && (
                                 <Avatar className="w-10 h-10 border">
                                    <AvatarImage src={user?.photoURL || ''} />
                                    <AvatarFallback><User /></AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex items-start gap-4">
                            <Avatar className="w-10 h-10 border">
                                <div className="bg-primary flex items-center justify-center w-full h-full">
                                    <Sparkles className="w-6 h-6 text-primary-foreground" />
                                </div>
                            </Avatar>
                            <div className="max-w-md p-4 rounded-2xl shadow-sm bg-muted rounded-bl-none">
                                <Loader2 className="animate-spin" />
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </CardContent>
        <CardFooter className="pt-6 border-t">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4 w-full">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <div className="relative">
                      <Input
                        placeholder="e.g., 'What are the best places to visit in winter?'"
                        className="h-12 text-base pr-14"
                        {...field}
                        disabled={isLoading}
                      />
                       <Button type="submit" disabled={isLoading} className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-10 p-0">
                        {isLoading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            <span className="sr-only">Send</span>
                          </>
                        )}
                      </Button>
                    </div>
                    <FormMessage className="mt-2" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardFooter>
      </Card>
    </>
  );
}
