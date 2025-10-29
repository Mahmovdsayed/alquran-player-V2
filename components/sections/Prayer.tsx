'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Loader2, MapPin, Calendar } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Prayer = () => {
    const [prayerTimes, setPrayerTimes] = useState<any>(null);
    const [locationName, setLocationName] = useState<string | null>("");
    const [date, setDate] = useState<any>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    function getCurrentDate(): string {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        return `${day}-${month}-${year}`;
    }

    function convertTo12Hour(time: string): string {
        let [hour, minute] = time.split(':').map(Number);
        let period = 'AM';

        if (hour >= 12) {
            period = 'PM';
            hour = hour > 12 ? hour - 12 : hour;
        } else if (hour === 0) {
            hour = 12;
        }

        return `${hour}:${minute.toString().padStart(2, '0')} ${period}`;
    }

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
                timeout: 10000,
            });
        } else {
            setError("Geolocation is not supported by this browser.");
            setLoading(false);
        }
    };

    const successCallback = async (position: GeolocationPosition) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        await GetPrayerTimes(latitude, longitude);
        await getLocationName(latitude, longitude);
    };

    const errorCallback = (error: GeolocationPositionError) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setError("User denied the request for geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                setError("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                setError("The request to get user location timed out.");
                break;
        }
        setLoading(false);
    };

    const GetPrayerTimes = async (latitude: number, longitude: number) => {
        const currentDate = getCurrentDate();

        try {
            const { data } = await axios.get(
                `https://api.aladhan.com/v1/timings/${currentDate}?latitude=${latitude}&longitude=${longitude}&method=5`
            );
            setDate(data);

            const formattedTimes = {
                Fajr: convertTo12Hour(data.data.timings.Fajr),
                Sunrise: convertTo12Hour(data.data.timings.Sunrise),
                Dhuhr: convertTo12Hour(data.data.timings.Dhuhr),
                Asr: convertTo12Hour(data.data.timings.Asr),
                Maghrib: convertTo12Hour(data.data.timings.Maghrib),
                Isha: convertTo12Hour(data.data.timings.Isha),
            };

            setPrayerTimes(formattedTimes);
        } catch (error) {
            setError('Error fetching prayer times');
        }
        setLoading(false);
    };

    const getLocationName = async (latitude: number, longitude: number) => {
        try {
            const { data } = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            setLocationName(data.display_name);
        } catch (error) {
            setError('Error fetching location name');
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    const prayerNames = [
        { name: 'Fajr', key: 'Fajr' },
        { name: 'Sunrise', key: 'Sunrise' },
        { name: 'Dhuhr', key: 'Dhuhr' },
        { name: 'Asr', key: 'Asr' },
        { name: 'Maghrib', key: 'Maghrib' },
        { name: 'Isha', key: 'Isha' },
    ];

    return (
        <div className='container mx-auto  max-w-2xl'>
            {loading && (
                <div className="flex flex-col items-center justify-center gap-4 py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <p className='text-center text-muted-foreground'>
                        Please allow location access to get prayer times.
                    </p>
                </div>
            )}

            {error && (
                <Alert className='rounded-4xl' variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {prayerTimes && (
                <div className="space-y-6">
                    <Card className='rounded-4xl'>
                        <CardHeader>
                            <CardTitle className="flex flex-col gap-2 text-lg md:text-xl">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                                    <span className="font-normal text-sm">Prayer Times at</span>
                                </div>
                                <span className="font-semibold truncate sm:max-w-md text-wrap text-sm">{locationName}</span>
                            </CardTitle>
                        </CardHeader>

                        <Separator />

                        <CardContent>
                            <div className="space-y-4">
                                {prayerNames.map((prayer, index) => (
                                    <div key={prayer.key}>
                                        <div className='flex justify-between items-center'>
                                            <span className="text-sm md:text-base">{prayer.name}</span>
                                            <span className='font-semibold text-sm md:text-base'>
                                                {prayerTimes[prayer.key]}
                                            </span>
                                        </div>
                                        {index < prayerNames.length - 1 && (
                                            <Separator className='mt-4' />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>

                        <Separator />

                        <CardFooter className='flex justify-center items-center'>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground text-center">
                                <Calendar className="h-4 w-4" />
                                <span>
                                    {date.data.date.hijri.weekday.en} {date.data.date.hijri.day}{' '}
                                    {date.data.date.hijri.month.en}, {date.data.date.hijri.year}
                                    <span className="mx-2">•</span>
                                    {date.data.date.readable}
                                </span>
                            </div>
                        </CardFooter>
                    </Card>

                    {/* <div className='flex items-center justify-center'>
                        <audio
                            src='https://cdn.aladhan.com/audio/adhans/a11-mansour-al-zahrani.mp3'
                            controls
                            className="w-full max-w-md"
                        />
                    </div> */}
                </div>
            )}
        </div>
    );
};

export default Prayer;