
'use client';

import { PageHeader } from '@/components/page-header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, ShieldAlert, HeartPulse } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const safetyTips = [
  { title: "Research Your Destination", content: "Before you go, learn about local laws, customs, and any travel advisories for your destination." },
  { title: "Keep Important Documents Safe", content: "Make copies of your passport, visa, and other important documents. Keep them separate from the originals." },
  { title: "Be Aware of Your Surroundings", content: "Stay alert in crowded places to avoid pickpockets. Don't display expensive items openly." },
  { title: "Use Reputable Transportation", content: "Stick to licensed taxis or well-known ride-sharing services. Avoid unmarked vehicles." },
];

const emergencyContacts = [
    { location: "National Emergency Helpline", number: "112" },
    { location: "Police", number: "100" },
    { location: "Ambulance", number: "102" },
    { location: "Women Helpline", number: "1091" },
    { location: "Tour Guide Dispatch", number: "987-654-3210" },
    { location: "Local Guide Support", number: "987-654-3211" },
]

export default function SafetyPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader
        title={t('pages.safety.title')}
        description={t('pages.safety.description')}
      />
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                    <ShieldAlert className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Top Safety Tips</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {safetyTips.map((tip, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-base font-medium">{tip.title}</AccordionTrigger>
                            <AccordionContent className="text-base">{tip.content}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
        <div className="space-y-8">
            <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center gap-4">
                     <div className="bg-destructive/10 p-3 rounded-xl">
                        <Phone className="h-7 w-7 text-destructive" />
                    </div>
                    <CardTitle className="text-xl">Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {emergencyContacts.map((contact, index) => (
                            <li key={index} className="flex justify-between items-center border-b pb-3 text-base">
                                <span className="font-medium">{contact.location}</span>
                                <span className="font-mono text-muted-foreground">{contact.number}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-green-500/10 p-3 rounded-xl">
                        <HeartPulse className="h-7 w-7 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">Local Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="bg-muted/50 p-6 rounded-lg text-center">
                      <p className="text-base text-muted-foreground">
                          No active alerts for your current location. Stay tuned for real-time updates.
                      </p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
