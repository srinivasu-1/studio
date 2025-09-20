
'use client';

import { useEffect, useState } from 'react';
import { QRCode } from 'qrcode.react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export default function SharePage() {
  const [url, setUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setUrl(window.location.origin);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'Copied to clipboard!',
      description: 'You can now share the link with others.',
    });
  };

  return (
    <>
      <PageHeader
        title="Share Trip Mate"
        description="Share this app with your friends and fellow travelers."
      />
      <div className="mt-8 flex justify-center">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold font-headline">Scan the QR Code</CardTitle>
            <CardDescription>
              Point your camera at the code to open the app.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="rounded-lg bg-white p-4 shadow-inner">
              {url ? (
                <QRCode value={url} size={256} level="H" />
              ) : (
                <Skeleton className="h-[256px] w-[256px]" />
              )}
            </div>
            <div className="w-full space-y-2 text-center">
                 <p className="text-sm font-medium text-muted-foreground">Or copy the link</p>
                <div className="flex w-full items-center space-x-2">
                    <Input
                        value={url}
                        readOnly
                        className="flex-1 bg-muted/50 text-base"
                    />
                    <Button type="button" size="icon" onClick={handleCopy} disabled={!url}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
