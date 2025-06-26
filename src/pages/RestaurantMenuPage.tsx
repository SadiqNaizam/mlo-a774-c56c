import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, ShoppingCart, Minus, Plus, X } from 'lucide-react';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuItem from '@/components/MenuItem';

// Shadcn/UI Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

// Placeholder data for the restaurant menu
const menuData = {
  restaurant: {
    name: "Pizzeria del Angelo",
    logoUrl: "https://i.pravatar.cc/150?u=pizzeria",
    coverImageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    reviews: 1250,
    cuisine: "Italian",
    address: "123 Pizza Lane, Flavor Town",
    openingHours: "11:00 AM - 10:00 PM",
  },
  categories: [
    {
      name: 'Appetizers',
      items: [
        { id: 1, name: 'Garlic Bread with Cheese', description: 'Toasted baguette with garlic butter, melted mozzarella, and a side of marinara.', price: 8.50, imageUrl: 'https://images.unsplash.com/photo-1627308595186-e6336f38e698?q=80&w=1974&auto=format&fit=crop' },
        { id: 2, name: 'Bruschetta', description: 'Grilled bread topped with fresh tomatoes, garlic, basil, and olive oil.', price: 9.00, imageUrl: 'https://images.unsplash.com/photo-1505253716362-afb542c38548?q=80&w=2070&auto=format&fit=crop' },
      ],
    },
    {
      name: 'Pizzas',
      items: [
        { id: 3, name: 'Margherita Pizza', description: 'Classic pizza with San Marzano tomatoes, fresh mozzarella, basil, and a drizzle of olive oil.', price: 16.00, imageUrl: 'https://images.unsplash.com/photo-1598021680942-8aa391d76a5b?q=80&w=1964&auto=format&fit=crop' },
        { id: 4, name: 'Pepperoni Pizza', description: 'A crowd-pleaser with a generous layer of spicy pepperoni and mozzarella cheese.', price: 18.00, imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=2076&auto=format&fit=crop' },
        { id: 5, name: 'Veggie Supreme', description: 'Loaded with bell peppers, onions, olives, mushrooms, and fresh mozzarella.', price: 17.50, imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop' },
      ],
    },
    {
        name: 'Desserts',
        items: [
            { id: 6, name: 'Tiramisu', description: 'A creamy dessert of espresso-soaked ladyfingers, mascarpone cheese, and cocoa powder.', price: 7.50, imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=2070&auto=format&fit=crop' },
        ]
    }
  ],
};

// Placeholder for cart items to show in the sheet
const cartItems = [
    { id: 3, name: 'Margherita Pizza', price: 16.00, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1598021680942-8aa391d76a5b?q=80&w=1964&auto=format&fit=crop' },
    { id: 1, name: 'Garlic Bread with Cheese', price: 8.50, quantity: 2, imageUrl: 'https://images.unsplash.com/photo-1627308595186-e6336f38e698?q=80&w=1974&auto=format&fit=crop' },
];

const RestaurantMenuPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  console.log('RestaurantMenuPage loaded');

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 5.00;
  const total = subtotal + deliveryFee;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Restaurant Hero Section */}
        <section className="relative h-48 md:h-64">
          <img src={menuData.restaurant.coverImageUrl} alt={`${menuData.restaurant.name} cover`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </section>

        <div className="container -mt-16 md:-mt-24 pb-12">
          {/* Restaurant Info Card */}
          <div className="bg-card p-6 rounded-lg shadow-lg flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background">
              <AvatarImage src={menuData.restaurant.logoUrl} alt={menuData.restaurant.name} />
              <AvatarFallback>{menuData.restaurant.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold">{menuData.restaurant.name}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{menuData.restaurant.rating} ({menuData.restaurant.reviews}+ reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{menuData.restaurant.address}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{menuData.restaurant.openingHours}</span>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Badge>{menuData.restaurant.cuisine}</Badge>
                <Badge variant="secondary">Top Rated</Badge>
              </div>
            </div>
            <Button onClick={() => setIsCartOpen(true)} className="w-full sm:w-auto mt-4 sm:mt-0">
                <ShoppingCart className="mr-2 h-4 w-4" /> View Cart ({cartItems.length})
            </Button>
          </div>

          {/* Menu Items Section */}
          <section className="mt-8">
            {menuData.categories.map((category) => (
              <div key={category.name} className="mb-8">
                <h2 className="text-2xl font-bold border-b pb-2 mb-4">{category.name}</h2>
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <MenuItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      imageUrl={item.imageUrl}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>

      {/* Cart Sheet */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle>Your Order</SheetTitle>
          </SheetHeader>
          <div className="flex-grow overflow-y-auto -mx-6 px-6">
            {cartItems.length === 0 ? (
                <p className="text-muted-foreground text-center mt-8">Your cart is empty.</p>
            ) : (
                <div className="divide-y">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex items-center py-4 gap-4">
                            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                            <div className="flex-1">
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                                <div className="flex items-center mt-2">
                                  <Button variant="outline" size="icon" className="h-6 w-6"><Minus className="h-3 w-3"/></Button>
                                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                  <Button variant="outline" size="icon" className="h-6 w-6"><Plus className="h-3 w-3"/></Button>
                                </div>
                            </div>
                            <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                            <Button variant="ghost" size="icon" className="text-muted-foreground h-8 w-8"><X className="h-4 w-4"/></Button>
                        </div>
                    ))}
                </div>
            )}
          </div>
          <SheetFooter className="mt-auto">
            <div className="w-full space-y-4">
                <Separator />
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <Button asChild size="lg" className="w-full">
                  <Link to="/checkout">Go to Checkout</Link>
                </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Footer />
    </div>
  );
};

export default RestaurantMenuPage;