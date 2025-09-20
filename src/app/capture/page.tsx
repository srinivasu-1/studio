'use client';

import { useState, useRef, useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Wand2, Loader2, Camera } from 'lucide-react';
import Image from 'next/image';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';


export default function CapturePage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [story, setStory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { toast } = useToast();

    useEffect(() => {
        const getCameraPermission = async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({video: true});
            setHasCameraPermission(true);
    
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
          }
        };
    
        getCameraPermission();
      }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
            setStory(''); // Reset story when new image is uploaded
        }
    };
    
    const handleTakePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if(context) {
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                const dataUrl = canvas.toDataURL('image/png');
                setPreviewUrl(dataUrl);
                fetch(dataUrl)
                    .then(res => res.blob())
                    .then(blob => {
                        const file = new File([blob], "capture.png", { type: "image/png" });
                        setSelectedFile(file);
                    });
                setStory(''); 
            }
        }
    };

    const handleGenerateStory = async () => {
        if (!selectedFile) return;
        setIsLoading(true);
        // Simulate AI story generation
        await new Promise(resolve => setTimeout(resolve, 1500));
        const generatedStory = `This photo captures a serene moment from my travels. The vibrant colors and beautiful scenery remind me of the amazing experiences I had. This was taken during a golden hour, casting a warm glow over everything and creating a truly magical atmosphere. I will always cherish this memory.`;
        setStory(generatedStory);
        setIsLoading(false);
    };

    return (
        <>
            <PageHeader
                title="Capture Your Trip"
                description="Create a visual diary of your travels. Upload a photo and let our AI tell your story."
            />
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl">Upload Your Moment</CardTitle>
                        <CardDescription>Choose a photo from your device, or use your camera to take a new one.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div 
                            className="relative flex justify-center items-center w-full h-64 border-2 border-dashed border-muted-foreground/30 rounded-lg cursor-pointer hover:bg-muted/50"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {previewUrl ? (
                                <Image src={previewUrl} alt="Selected preview" fill className="object-contain rounded-lg" />
                            ) : (
                                <div className="text-center text-muted-foreground">
                                    <Upload className="mx-auto h-12 w-12" />
                                    <p className="mt-2">Click to upload an image</p>
                                    <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            )}
                            <Input 
                                ref={fileInputRef}
                                id="picture" 
                                type="file" 
                                className="hidden" 
                                onChange={handleFileChange} 
                                accept="image/*"
                            />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Or Use Your Camera</h3>
                            <div className="p-4 bg-muted/50 rounded-lg">
                                <video ref={videoRef} className="w-full aspect-video rounded-md bg-black" autoPlay muted playsInline />
                                {hasCameraPermission === false && (
                                    <Alert variant="destructive" className="mt-4">
                                        <AlertTitle>Camera Access Denied</AlertTitle>
                                        <AlertDescription>
                                            Please enable camera permissions in your browser settings to use this feature.
                                        </AlertDescription>
                                    </Alert>
                                )}
                                <Button onClick={handleTakePhoto} disabled={hasCameraPermission !== true} className="w-full mt-4">
                                    <Camera className="mr-2" />
                                    Take Photo
                                </Button>
                                <canvas ref={canvasRef} className="hidden"></canvas>
                            </div>
                        </div>

                    </CardContent>
                </Card>
                <Card className="shadow-lg flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-xl">Your Travel Story</CardTitle>
                         <CardDescription>Once you've selected a photo, generate a story about your memory.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col space-y-4">
                        <Textarea 
                            placeholder="Your generated story will appear here..."
                            value={story}
                            onChange={(e) => setStory(e.target.value)}
                            className="flex-grow text-base"
                            rows={10}
                        />
                         <Button onClick={handleGenerateStory} disabled={!selectedFile || isLoading} size="lg" className="w-full text-lg h-12">
                            {isLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    <Wand2 className="mr-2" /> Generate Story
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
