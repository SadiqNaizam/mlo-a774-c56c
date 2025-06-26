import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList, ChefHat, Bike, CheckCircle2 } from 'lucide-react';

const statusSteps = [
  { name: 'Order Placed', icon: ClipboardList },
  { name: 'In the Kitchen', icon: ChefHat },
  { name: 'Out for Delivery', icon: Bike },
  { name: 'Delivered', icon: CheckCircle2 },
];

type OrderStatus = 'Order Placed' | 'In the Kitchen' | 'Out for Delivery' | 'Delivered';

interface OrderTrackerProps {
  // In a real app, you would pass the current status from your backend data.
  // This prop is defined to show how the component would be used.
  // Example: activeStatus: OrderStatus;
}

const OrderTracker: React.FC<OrderTrackerProps> = (/* { activeStatus } */) => {
  console.log('OrderTracker loaded');

  // For demonstration purposes, we simulate live updates.
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    // In a real application, you would derive `currentStepIndex` from the `activeStatus` prop.
    // For example:
    // const initialIndex = statusSteps.findIndex(step => step.name === activeStatus);
    // setCurrentStepIndex(initialIndex >= 0 ? initialIndex : 0);

    // This interval is purely for this demonstration to show the tracker's states.
    // It advances the status every 3 seconds until the final step is reached.
    const interval = setInterval(() => {
      setCurrentStepIndex(prevIndex => {
        if (prevIndex < statusSteps.length - 1) {
          return prevIndex + 1;
        }
        clearInterval(interval); // Stop the interval when the last step is reached
        return prevIndex;
      });
    }, 3000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl text-center">Track Your Order</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between">
          {statusSteps.map((step, index) => {
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;

            return (
              <React.Fragment key={step.name}>
                <div className="flex flex-col items-center text-center w-24">
                  <div
                    className={cn(
                      'flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 transition-all duration-300',
                      isCompleted ? 'bg-green-500 border-green-600 text-white' : 'bg-gray-100 border-gray-300',
                      isActive ? 'bg-green-100 border-green-500 animate-pulse' : ''
                    )}
                  >
                    <step.icon
                      className={cn(
                        'w-6 h-6 sm:w-7 sm:h-7',
                        isCompleted ? 'text-white' : 'text-gray-400',
                        isActive ? 'text-green-600' : ''
                      )}
                    />
                  </div>
                  <p
                    className={cn(
                      'mt-2 text-xs sm:text-sm font-medium',
                      isCompleted || isActive ? 'text-gray-900' : 'text-gray-500'
                    )}
                  >
                    {step.name}
                  </p>
                </div>

                {index < statusSteps.length - 1 && (
                  <div
                    className={cn(
                      'flex-1 h-1 mt-6 sm:mt-7 mx-2 rounded-full transition-all duration-500',
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    )}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTracker;