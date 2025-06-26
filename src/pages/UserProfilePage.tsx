import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderTracker from '@/components/OrderTracker';
import StarRatingInput from '@/components/StarRatingInput';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Home, PlusCircle, Trash2, Pencil } from 'lucide-react';

// --- Placeholder Data ---
const pastOrders = [
  {
    id: 'po1',
    restaurant: 'Pizza Palace',
    date: '2023-10-26',
    total: '$25.50',
    items: '1x Pepperoni Pizza, 1x Garden Salad',
    status: 'Delivered',
  },
  {
    id: 'po2',
    restaurant: 'Sushi Central',
    date: '2023-10-15',
    total: '$45.00',
    items: '1x Dragon Roll, 1x Miso Soup',
    status: 'Delivered',
  },
];

const savedAddresses = [
    { id: 'addr1', type: 'Home', address: '123 Main St, Anytown, USA 12345', default: true },
    { id: 'addr2', type: 'Work', address: '456 Business Ave, Workville, USA 54321', default: false },
];

const paymentMethods = [
    { id: 'pay1', type: 'Visa', last4: '1234', expiry: '12/25' },
    { id: 'pay2', type: 'Mastercard', last4: '5678', expiry: '08/26' },
];
// --- End Placeholder Data ---


const UserProfilePage = () => {
    console.log('UserProfilePage loaded');
    const [reviewRating, setReviewRating] = useState(0);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow bg-gray-50/50">
                <div className="container mx-auto px-4 py-8 md:py-12">
                    <h1 className="text-3xl font-bold tracking-tight mb-8">My Profile</h1>
                    <Tabs defaultValue="order-history" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="order-history">Order History</TabsTrigger>
                            <TabsTrigger value="manage-addresses">Manage Addresses</TabsTrigger>
                            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
                        </TabsList>
                        
                        {/* Order History Tab */}
                        <TabsContent value="order-history" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Current Order</CardTitle>
                                    <CardDescription>Your most recent order is on its way!</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <OrderTracker />
                                </CardContent>
                            </Card>
                            <Separator className="my-8" />
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold">Past Orders</h3>
                                {pastOrders.map((order) => (
                                    <Card key={order.id}>
                                        <CardHeader>
                                            <CardTitle>{order.restaurant}</CardTitle>
                                            <CardDescription>Ordered on {order.date} - Total: {order.total}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">{order.items}</p>
                                        </CardContent>
                                        <CardFooter className="flex justify-end space-x-2">
                                            <Button variant="outline">Reorder</Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button>Leave a Review</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Review your order from {order.restaurant}</AlertDialogTitle>
                                                        <AlertDialogDescription>Let us know how we did. Your feedback helps!</AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <div className="py-4 space-y-4">
                                                        <div>
                                                            <Label htmlFor="rating">Your Rating</Label>
                                                            <StarRatingInput rating={reviewRating} setRating={setReviewRating} />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="comments">Comments</Label>
                                                            <Textarea id="comments" placeholder="What did you like or dislike?" />
                                                        </div>
                                                    </div>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel onClick={() => setReviewRating(0)}>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction>Submit Review</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        {/* Manage Addresses Tab */}
                        <TabsContent value="manage-addresses" className="mt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold">Saved Addresses</h3>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Address
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {savedAddresses.map((addr) => (
                                    <Card key={addr.id} className="flex items-center justify-between p-4">
                                        <div className="flex items-center gap-4">
                                            <Home className="h-8 w-8 text-muted-foreground" />
                                            <div>
                                                <p className="font-semibold">{addr.type} {addr.default && <span className="text-xs text-primary font-normal">(Default)</span>}</p>
                                                <p className="text-sm text-muted-foreground">{addr.address}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                        
                        {/* Payment Methods Tab */}
                        <TabsContent value="payment-methods" className="mt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold">Payment Methods</h3>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Card
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {paymentMethods.map((pm) => (
                                    <Card key={pm.id} className="flex items-center justify-between p-4">
                                        <div className="flex items-center gap-4">
                                            <CreditCard className="h-8 w-8 text-muted-foreground" />
                                            <div>
                                                <p className="font-semibold">{pm.type} ending in {pm.last4}</p>
                                                <p className="text-sm text-muted-foreground">Expires {pm.expiry}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default UserProfilePage;