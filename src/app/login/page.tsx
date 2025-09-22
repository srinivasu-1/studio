
'use client';

import { AppLogo } from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { signInWithEmailAndPassword, signUpWithEmailAndPassword, createUserProfile } from '@/app/auth/actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const loginSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

export default function LoginPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(isLoginView ? loginSchema : signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleFormSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      if (isLoginView) {
        await signInWithEmailAndPassword(values);
        toast({ title: 'Login Successful', description: 'Welcome back!' });
      } else {
        await signUpWithEmailAndPassword(values);
        toast({ title: 'Sign Up Successful', description: 'Your account has been created.' });
      }
      router.push('/');
      router.refresh();
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'An error occurred', description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        await createUserProfile(result.user);
        toast({ title: 'Google Sign-In Successful', description: 'Welcome!' });
        router.push('/');
        router.refresh();
    } catch (error: any) {
        toast({ variant: 'destructive', title: 'Google Sign-In Failed', description: error.message });
    } finally {
        setIsLoading(false);
    }
  }

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    form.reset();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop)'}} data-ai-hint='India landmark'></div>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      <Card className="relative z-10 mx-auto w-full max-w-sm shadow-2xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <AppLogo />
          </div>
          <CardTitle className="text-2xl font-bold font-headline">{isLoginView ? 'Welcome Back' : 'Create an Account'}</CardTitle>
          <CardDescription>{isLoginView ? 'Enter your email below to login' : 'Fill in the details to sign up'}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="grid gap-4">
              {!isLoginView && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="name">Name</Label>
                      <FormControl>
                        <Input id="name" placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">Email</Label>
                    <FormControl>
                      <Input id="email" type="email" placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="password">Password</Label>
                    <FormControl>
                      <Input id="password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                 {isLoading ? <Loader2 className="animate-spin" /> : (isLoginView ? 'Login' : 'Sign Up')}
              </Button>
            </form>
          </Form>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : 'Login with Google'}
          </Button>
          <div className="mt-4 text-center text-sm">
            {isLoginView ? "Don't have an account?" : "Already have an account?"}{' '}
            <Button variant="link" className="p-0 h-auto" onClick={toggleView}>
              {isLoginView ? 'Sign up' : 'Login'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
