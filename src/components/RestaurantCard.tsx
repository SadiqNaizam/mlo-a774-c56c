import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RestaurantCardProps {
  slug: string;
  name: string;
  imageUrl: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  slug,
  name,
  imageUrl,
  cuisine,
  rating,
  deliveryTime,
  deliveryFee,
}) => {
  console.log('RestaurantCard loaded for:', name);

  return (
    <Link to={`/restaurant-menu?restaurant=${slug}`} className="block group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg">
      <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225?text=DelishDrop'}
              alt={`Photo of ${name}`}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">{name}</h3>
            <Badge variant="outline">{cuisine}</Badge>
          </div>
          <div className="flex-grow">
            {/* This space can be used for a short description if needed later */}
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-auto pt-2 border-t">
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
              <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
            </div>
            <span className="mx-2">•</span>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{deliveryTime}</span>
            </div>
            <span className="mx-2">•</span>
            <span>
              {deliveryFee === 0 ? 'Free delivery' : `$${deliveryFee.toFixed(2)}`}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;