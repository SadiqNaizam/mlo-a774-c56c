import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Plus, Minus } from 'lucide-react';

interface MenuItemProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ id, name, description, price, imageUrl }) => {
  const [quantity, setQuantity] = useState(0);

  console.log(`MenuItem loaded for: ${name}`);

  const handleInitialAdd = () => {
    setQuantity(1);
    toast.success(`${name} added to your cart!`);
    // In a real app, you'd also dispatch an action to a global state (e.g., Redux, Zustand)
    // console.log(`Added item ${id} to cart`);
  };

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

  return (
    <div className="flex gap-4 py-4 border-b last:border-b-0">
      <div className="flex-1">
        <h4 className="text-lg font-semibold">{name}</h4>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
        <p className="text-md font-bold mt-2">{formattedPrice}</p>
      </div>
      <div className="flex flex-col items-center justify-between w-28">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-20 object-cover rounded-md"
          />
        )}
        <div className={`flex items-center justify-center ${imageUrl ? 'mt-2' : 'mt-auto'}`}>
          {quantity === 0 ? (
            <Button onClick={handleInitialAdd} className="w-full">
              Add
            </Button>
          ) : (
            <div className="flex items-center gap-2 p-1 border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDecrement}
                className="h-7 w-7"
                aria-label="Remove one item"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-bold w-6 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleIncrement}
                className="h-7 w-7"
                aria-label="Add one more item"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;