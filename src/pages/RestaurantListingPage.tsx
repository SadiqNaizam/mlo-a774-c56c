import React, { useState, useEffect } from 'react';

// Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Custom Components
import RestaurantCard from '@/components/RestaurantCard';

// shadcn/ui Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

// Mock data for restaurants
const mockRestaurants = [
  {
    slug: 'bella-italia-trattoria',
    name: 'Bella Italia Trattoria',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=870&auto=format&fit=crop',
    cuisine: 'Italian',
    rating: 4.7,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
  },
  {
    slug: 'sushi-zen',
    name: 'Sushi Zen',
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=774&auto=format&fit=crop',
    cuisine: 'Japanese',
    rating: 4.9,
    deliveryTime: '30-40 min',
    deliveryFee: 4.50,
  },
  {
    slug: 'the-burger-joint',
    name: 'The Burger Joint',
    imageUrl: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=815&auto=format&fit=crop',
    cuisine: 'American',
    rating: 4.5,
    deliveryTime: '20-30 min',
    deliveryFee: 0,
  },
  {
    slug: 'curry-house',
    name: 'Curry House',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=774&auto=format&fit=crop',
    cuisine: 'Indian',
    rating: 4.6,
    deliveryTime: '35-45 min',
    deliveryFee: 1.99,
  },
  {
    slug: 'taco-fiesta',
    name: 'Taco Fiesta',
    imageUrl: 'https://images.unsplash.com/photo-1627907228175-2bf846a303b4?q=80&w=774&auto=format&fit=crop',
    cuisine: 'Mexican',
    rating: 4.8,
    deliveryTime: '25-35 min',
    deliveryFee: 3.00,
  },
  {
    slug: 'pho-king-good',
    name: 'Pho-king Good',
    imageUrl: 'https://images.unsplash.com/photo-1623961918323-43a7b5fb137a?q=80&w=870&auto=format&fit=crop',
    cuisine: 'Vietnamese',
    rating: 4.7,
    deliveryTime: '30-40 min',
    deliveryFee: 0,
  },
];

const cuisineFilters = [
  { id: 'italian', label: 'Italian' },
  { id: 'japanese', label: 'Japanese' },
  { id: 'american', label: 'American' },
  { id: 'indian', label: 'Indian' },
  { id: 'mexican', label: 'Mexican' },
  { id: 'vietnamese', label: 'Vietnamese' },
];

const RestaurantListingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('RestaurantListingPage loaded');
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Restaurants Near You</h1>
          <p className="text-muted-foreground">
            Found {mockRestaurants.length} places to eat in your area.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Filter & Sort</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="sort-by" className="text-sm font-medium">Sort by</Label>
                  <Select defaultValue="rating">
                    <SelectTrigger id="sort-by" className="w-full mt-2">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="delivery-time">Fastest Delivery</SelectItem>
                      <SelectItem value="delivery-fee">Lowest Delivery Fee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium mb-3">Cuisine</h4>
                  <div className="space-y-2">
                    {cuisineFilters.map((cuisine) => (
                      <div key={cuisine.id} className="flex items-center space-x-2">
                        <Checkbox id={cuisine.id} />
                        <Label htmlFor={cuisine.id} className="font-normal cursor-pointer">
                          {cuisine.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Restaurant Grid */}
          <section className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {isLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex flex-col space-y-3">
                      <Skeleton className="h-[170px] w-full rounded-xl" />
                      <div className="space-y-2 p-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  ))
                : mockRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.slug} {...restaurant} />
                  ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantListingPage;