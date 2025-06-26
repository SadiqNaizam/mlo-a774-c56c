import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingInputProps {
  /**
   * The current rating value.
   */
  rating: number;
  /**
   * Function to call when the rating changes.
   */
  setRating: (rating: number) => void;
  /**
   * The total number of stars to display.
   * @default 5
   */
  totalStars?: number;
  /**
   * The size of the star icons in pixels.
   * @default 24
   */
  size?: number;
  /**
   * Optional additional class names.
   */
  className?: string;
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({
  rating,
  setRating,
  totalStars = 5,
  size = 24,
  className,
}) => {
  const [hover, setHover] = useState(0);
  console.log('StarRatingInput loaded');

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1;
        const isFilled = ratingValue <= (hover || rating);

        return (
          <button
            type="button" // Prevents submitting a form when clicked
            key={ratingValue}
            onClick={() => setRating(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
            className="cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none"
            aria-label={`Rate ${ratingValue} out of ${totalStars} stars`}
          >
            <Star
              size={size}
              className={cn(
                'transition-all duration-200',
                isFilled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              )}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRatingInput;