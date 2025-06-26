import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';

// shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Icons
import { Search, Pizza, Salad, Fish, Beef, Wheat, Carrot } from 'lucide-react';

// Placeholder data for featured restaurants
const featuredRestaurants = [
  {
    slug: 'marios-pizzeria',
    name: "Mario's Pizzeria",
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=870&auto=format&fit=crop',
    cuisine: 'Italian',
    rating: 4.5,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
  },
  {
    slug: 'sakura-sushi',
    name: 'Sakura Sushi',
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=774&auto=format&fit=crop',
    cuisine: 'Japanese',
    rating: 4.8,
    deliveryTime: '30-40 min',
    deliveryFee: 4.50,
  },
  {
    slug: 'the-burger-joint',
    name: 'The Burger Joint',
    imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=870&auto=format&fit=crop',
    cuisine: 'American',
    rating: 4.3,
    deliveryTime: '20-30 min',
    deliveryFee: 0,
  },
  {
    slug: 'green-leaf-salads',
    name: 'Green Leaf Salads',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=870&auto=format&fit=crop',
    cuisine: 'Healthy',
    rating: 4.9,
    deliveryTime: '15-25 min',
    deliveryFee: 3.00,
  },
];

const foodCategories = [
    { name: 'Pizza', icon: <Pizza className="mr-2 h-5 w-5" />, slug: 'pizza' },
    { name: 'Sushi', icon: <Fish className="mr-2 h-5 w-5" />, slug: 'sushi' },
    { name: 'Burgers', icon: <Beef className="mr-2 h-5 w-5" />, slug: 'burgers' },
    { name: 'Healthy', icon: <Salad className="mr-2 h-5 w-5" />, slug: 'healthy' },
    { name: 'Vegan', icon: <Carrot className="mr-2 h-5 w-5" />, slug: 'vegan' },
    { name: 'Desserts', icon: <Wheat className="mr-2 h-5 w-5" />, slug: 'desserts' },
];

const HomePage = () => {
  console.log('HomePage loaded');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurant-listing?query=${searchQuery.trim()}`);
    } else {
      navigate('/restaurant-listing');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-cover bg-center py-20 md:py-32" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1740&auto=format&fit=crop')" }}>
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="container relative z-10 text-center text-white">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Your next meal, delivered</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200">Find your favorite local restaurants and get it delivered right to your door.</p>
                <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto flex gap-2">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Enter your address, city, or zip code"
                            className="w-full h-12 pl-10 text-base"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button type="submit" size="lg" className="h-12">Find Food</Button>
                </form>
            </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 md:py-16 bg-white">
            <div className="container">
                <h2 className="text-3xl font-bold text-center mb-8">Browse by Category</h2>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                    {foodCategories.map((category) => (
                        <Button asChild key={category.slug} variant="outline" className="h-12 text-base">
                            <Link to={`/restaurant-listing?category=${category.slug}`}>
                                {category.icon} {category.name}
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>
        </section>

        {/* Featured Restaurants Section */}
        <section className="py-12 md:py-16">
            <div className="container">
                <h2 className="text-3xl font-bold text-center mb-8">Featured Restaurants</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredRestaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant.slug} {...restaurant} />
                    ))}
                </div>
                 <div className="text-center mt-12">
                    <Button asChild size="lg">
                        <Link to="/restaurant-listing">View All Restaurants</Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default HomePage;