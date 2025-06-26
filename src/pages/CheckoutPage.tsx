import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ShoppingCartItem from '@/components/ShoppingCartItem';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Icons
import { CreditCard, Home, Truck } from 'lucide-react';

const CheckoutPage = () => {
    console.log('CheckoutPage loaded');
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Margherita Pizza', price: 14.99, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1598021680925-92e1f8f25468?q=80&w=300' },
        { id: 2, name: 'Side Salad', price: 6.50, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=300' },
        { id: 3, name: 'Soda Can', price: 2.00, quantity: 2, imageUrl: 'https://images.unsplash.com/photo-1581636625402-29b2a7046c59?q=80&w=300' },
    ]);

    const handleIncrease = (id: string | number) => {
        setCartItems(items => items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    };

    const handleDecrease = (id: string | number) => {
        setCartItems(items => items.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
    };
    
    const handleRemove = (id: string | number) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const handlePlaceOrder = () => {
        // Here you would typically process the payment and save the order
        console.log("Placing order...");
        navigate('/user-profile'); // Navigate to profile/order history page
    };

    const subtotal = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [cartItems]);
    
    const deliveryFee = 5.00;
    const taxes = subtotal * 0.08; // 8% tax
    const total = subtotal + deliveryFee + taxes;

    return (
        <div className="flex flex-col min-h-screen bg-muted/20">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 lg:py-12">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Checkout</h1>
                    <p className="text-muted-foreground mt-2">Please review your order and complete the details below.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                    {/* Left side: Checkout Steps */}
                    <div className="lg:col-span-2">
                        <Accordion type="single" collapsible defaultValue="delivery-address" className="w-full">
                            <AccordionItem value="delivery-address">
                                <AccordionTrigger className="text-xl font-semibold"><div className="flex items-center gap-3"><Truck className="w-6 h-6 text-primary"/> Delivery Details</div></AccordionTrigger>
                                <AccordionContent>
                                    <Card className="border-none shadow-none">
                                        <CardContent className="pt-6">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="sm:col-span-2">
                                                    <Label htmlFor="address">Street Address</Label>
                                                    <Input id="address" placeholder="123 Main St" defaultValue="123 Tummy Lane" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="city">City</Label>
                                                    <Input id="city" placeholder="Anytown" defaultValue="Flavor Town" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="state">State / Province</Label>
                                                     <Select defaultValue="CA">
                                                        <SelectTrigger id="state">
                                                            <SelectValue placeholder="Select a state" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="CA">California</SelectItem>
                                                            <SelectItem value="NY">New York</SelectItem>
                                                            <SelectItem value="TX">Texas</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div>
                                                    <Label htmlFor="zip">ZIP / Postal Code</Label>
                                                    <Input id="zip" placeholder="12345" defaultValue="90210" />
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                                                    <Input id="instructions" placeholder="Leave at front door" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="payment-method">
                                <AccordionTrigger className="text-xl font-semibold"><div className="flex items-center gap-3"><CreditCard className="w-6 h-6 text-primary"/> Payment Method</div></AccordionTrigger>
                                <AccordionContent>
                                    <Card className="border-none shadow-none">
                                        <CardContent className="pt-6">
                                            <RadioGroup defaultValue="card-1" className="space-y-4">
                                                <Label className="flex items-center gap-4 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary">
                                                    <RadioGroupItem value="card-1" id="card-1" />
                                                    <CreditCard className="w-6 h-6" />
                                                    <div className="flex-grow">
                                                        <p className="font-semibold">Visa ending in 1234</p>
                                                        <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                                                    </div>
                                                </Label>
                                                <Label className="flex items-center gap-4 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary">
                                                    <RadioGroupItem value="card-2" id="card-2" />
                                                    <CreditCard className="w-6 h-6" />
                                                    <div className="flex-grow">
                                                        <p className="font-semibold">Mastercard ending in 5678</p>
                                                        <p className="text-sm text-muted-foreground">Expires 08/2026</p>
                                                    </div>
                                                </Label>
                                            </RadioGroup>
                                            <Button variant="link" className="mt-4 px-0">Add a new payment method</Button>
                                        </CardContent>
                                    </Card>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* Right side: Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                                <CardDescription>Review the items in your cart.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {cartItems.map(item => (
                                        <ShoppingCartItem 
                                            key={item.id}
                                            {...item}
                                            onIncrease={handleIncrease}
                                            onDecrease={handleDecrease}
                                            onRemove={handleRemove}
                                        />
                                    ))}
                                </div>
                                <Separator className="my-4" />
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Delivery Fee</span>
                                        <span>${deliveryFee.toFixed(2)}</span>
                                    </div>
                                     <div className="flex justify-between">
                                        <span>Taxes</span>
                                        <span>${taxes.toFixed(2)}</span>
                                    </div>
                                    <Separator className="my-2" />
                                    <div className="flex justify-between font-bold text-base">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <Input placeholder="Promo Code" />
                                    <Button variant="outline">Apply</Button>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" size="lg" onClick={handlePlaceOrder}>
                                    Place Order
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CheckoutPage;