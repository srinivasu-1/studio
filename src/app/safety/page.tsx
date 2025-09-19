import { PageHeader } from '@/components/page-header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, ShieldAlert, HeartPulse } from 'lucide-react';

const safetyTips = [
  { title: "Research Your Destination", content: "Before you go, learn about local laws, customs, and any travel advisories for your destination." },
  { title: "Keep Important Documents Safe", content: "Make copies of your passport, visa, and other important documents. Keep them separate from the originals." },
  { title: "Be Aware of Your Surroundings", content: "Stay alert in crowded places to avoid pickpockets. Don't display expensive items openly." },
  { title: "Use Reputable Transportation", content: "Stick to licensed taxis or well-known ride-sharing services. Avoid unmarked vehicles." },
];

const emergencyContacts = [
    { location: "Local Police", number: "112 / 911 (check local)" },
    { location: "Ambulance / Medical", number: "112 / 911 (check local)" },
    { location: "Your Embassy/Consulate", number: "Varies by location" },
]

export default function SafetyPage() {
  return (
    <>
      <PageHeader
        title="Safety Information"
        description="Your guide to staying safe while you explore the world."
      />
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <Card>
            <CardHeader className="flex flex-row items-center gap-3">
                <ShieldAlert className="h-6 w-6 text-primary" />
                <CardTitle>Top Safety Tips</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {safetyTips.map((tip, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger>{tip.title}</AccordionTrigger>
                            <AccordionContent>{tip.content}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
        <div className="space-y-8">
            <Card>
                <CardHeader className="flex flex-row items-center gap-3">
                    <Phone className="h-6 w-6 text-destructive" />
                    <CardTitle>Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {emergencyContacts.map((contact, index) => (
                            <li key={index} className="flex justify-between items-center border-b pb-2">
                                <span className="font-medium">{contact.location}</span>
                                <span className="text-sm text-muted-foreground">{contact.number}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center gap-3">
                    <HeartPulse className="h-6 w-6 text-green-600" />
                    <CardTitle>Local Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                      <p className="text-muted-foreground">
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
