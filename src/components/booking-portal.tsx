'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bed, Car, Plane, Search } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

export function BookingPortal() {
  const [flightFrom, setFlightFrom] = useState('');
  const [flightTo, setFlightTo] = useState('');
  const [flightDepart, setFlightDepart] = useState<Date | undefined>(new Date());
  const [flightReturn, setFlightReturn] = useState<Date | undefined>();

  const [hotelLocation, setHotelLocation] = useState('');
  const [hotelCheckIn, setHotelCheckIn] = useState<Date | undefined>(new Date());
  const [hotelCheckOut, setHotelCheckOut] = useState<Date | undefined>(new Date(new Date().setDate(new Date().getDate() + 1)));

  const [carPickup, setCarPickup] = useState('');
  const [carPickupDate, setCarPickupDate] = useState<Date | undefined>(new Date());
  const [carDropoffDate, setCarDropoffDate] = useState<Date | undefined>(new Date());

  const handleSearchFlights = () => {
    const departDate = flightDepart ? format(flightDepart, 'yyyy-MM-dd') : '';
    const returnDate = flightReturn ? format(flightReturn, 'yyyy-MM-dd') : '';
    const url = `https://www.google.com/flights#flt=${flightFrom}.${flightTo}.${departDate}*${flightTo}.${flightFrom}.${returnDate}`;
    window.open(url, '_blank');
  };

  const handleSearchStays = () => {
    const checkIn = hotelCheckIn ? format(hotelCheckIn, 'yyyy-MM-dd') : '';
    const checkOut = hotelCheckOut ? format(hotelCheckOut, 'yyyy-MM-dd') : '';
    const url = `https://www.google.com/travel/hotels/${hotelLocation}?q=hotels%20in%20${hotelLocation}&checkin=${checkIn}&checkout=${checkOut}`;
    window.open(url, '_blank');
  };

  const handleSearchCars = () => {
    const pickup = carPickupDate ? format(carPickupDate, 'yyyy-MM-dd') : '';
    const dropoff = carDropoffDate ? format(carDropoffDate, 'yyyy-MM-dd') : '';
    const url = `https://www.google.com/travel/search?q=car%20rental%20in%20${carPickup}&entity=ChYI____________CRASFwoJL20vMDFfaDcQBGRhaXJvemFuGAE&ved=0CAAQ5JsGahcKEwjQjLqH9seDAQAAAAAHQAAAAAQaA&ts=CAESCAoCCAMKAggDGhoYagsQCgcyA2FpchIDCgEoCgcyA2FpchIDCgEoAg`;
    window.open(url, '_blank');
  };


  return (
    <Card className="w-full shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Booking Portal</CardTitle>
        <CardDescription>Find the best deals on flights, hotels, and car rentals.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="flights" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50 h-14 p-2">
            <TabsTrigger value="flights" className="text-base h-full flex gap-2 items-center"><Plane /> Flights</TabsTrigger>
            <TabsTrigger value="stays" className="text-base h-full flex gap-2 items-center"><Bed /> Stays</TabsTrigger>
            <TabsTrigger value="cars" className="text-base h-full flex gap-2 items-center"><Car /> Cars</TabsTrigger>
          </TabsList>
          
          <TabsContent value="flights" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div className="grid md:col-span-2 grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="From" className="h-12 text-base" value={flightFrom} onChange={(e) => setFlightFrom(e.target.value)} />
                <Input placeholder="To" className="h-12 text-base" value={flightTo} onChange={(e) => setFlightTo(e.target.value)} />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="h-12 text-base justify-start font-normal">
                    {flightDepart ? format(flightDepart, 'PPP') : "Depart"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={flightDepart} onSelect={setFlightDepart} initialFocus />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="h-12 text-base justify-start font-normal">
                    {flightReturn ? format(flightReturn, 'PPP') : "Return"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={flightReturn} onSelect={setFlightReturn} initialFocus />
                </PopoverContent>
              </Popover>
              <Button size="lg" className="h-12 text-lg md:col-span-2" onClick={handleSearchFlights}>
                <Search className="mr-2" /> Search Flights
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="stays" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div className="md:col-span-2">
                    <Input placeholder="Where are you going?" className="h-12 text-base" value={hotelLocation} onChange={(e) => setHotelLocation(e.target.value)} />
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button variant="outline" className="h-12 text-base justify-start font-normal">
                        {hotelCheckIn ? format(hotelCheckIn, 'PPP') : "Check-in"}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={hotelCheckIn} onSelect={setHotelCheckIn} initialFocus />
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button variant="outline" className="h-12 text-base justify-start font-normal">
                        {hotelCheckOut ? format(hotelCheckOut, 'PPP') : "Check-out"}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={hotelCheckOut} onSelect={setHotelCheckOut} initialFocus />
                    </PopoverContent>
                </Popover>
                <Button size="lg" className="h-12 text-lg md:col-span-2" onClick={handleSearchStays}>
                    <Search className="mr-2" /> Search Stays
                </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="cars" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div className="md:col-span-2">
                    <Input placeholder="Pick-up location" className="h-12 text-base" value={carPickup} onChange={(e) => setCarPickup(e.target.value)} />
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button variant="outline" className="h-12 text-base justify-start font-normal">
                        {carPickupDate ? format(carPickupDate, 'PPP') : "Pick-up Date"}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={carPickupDate} onSelect={setCarPickupDate} initialFocus />
                    </PopoverContent>
                </Popover>
                 <Popover>
                    <PopoverTrigger asChild>
                    <Button variant="outline" className="h-12 text-base justify-start font-normal">
                        {carDropoffDate ? format(carDropoffDate, 'PPP') : "Drop-off Date"}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={carDropoffDate} onSelect={setCarDropoffDate} initialFocus />
                    </PopoverContent>
                </Popover>
                <Button size="lg" className="h-12 text-lg md:col-span-2" onClick={handleSearchCars}>
                    <Search className="mr-2" /> Search Cars
                </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
