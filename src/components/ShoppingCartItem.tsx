import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface ShoppingCartItemProps {
  id: string | number;
  name: string;
  price: number; // Price per single item
  quantity: number;
  imageUrl?: string;
  onIncrease: (id: string | number) => void;
  onDecrease: (id: string | number) => void;
  onRemove: (id: string | number) => void;
}

const ShoppingCartItem: React.FC<ShoppingCartItemProps> = ({
  id,
  name,
  price,
  quantity,
  imageUrl,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  console.log(`ShoppingCartItem loaded for: ${name}`);

  const totalPrice = (price * quantity).toFixed(2);

  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="w-16 h-16 object-cover rounded-md"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate" title={name}>{name}</p>
          <p className="text-sm text-muted-foreground">${price.toFixed(2)} each</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onDecrease(id)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="font-bold text-center w-8" aria-live="polite">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onIncrease(id)}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Total Price */}
        <div className="w-20 text-right font-semibold">
          <p>${totalPrice}</p>
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive"
          onClick={() => onRemove(id)}
          aria-label="Remove item"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ShoppingCartItem;