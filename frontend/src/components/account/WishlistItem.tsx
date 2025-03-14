import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export interface WishlistItemProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
  inStock: boolean;
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
}

export function WishlistItem({
  id,
  name,
  price,
  imageUrl,
  slug,
  inStock,
  onRemove,
  onAddToCart,
}: WishlistItemProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 border border-neutral-200 rounded-lg">
      <div className="w-full md:w-32 h-32 bg-neutral-100 rounded-md flex-shrink-0 relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 128px"
            className="object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400">
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <Link href={`/products/${slug}`} className="text-lg font-medium text-neutral-900 hover:text-primary-600">
              {name}
            </Link>
            <div className="mt-1 text-neutral-600">${price.toFixed(2)}</div>
            <div className="mt-2">
              {inStock ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Out of Stock
                </span>
              )}
            </div>
          </div>
          
          <button
            onClick={() => onRemove(id)}
            className="text-neutral-400 hover:text-neutral-600"
            aria-label="Remove from wishlist"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() => onAddToCart(id)}
            disabled={!inStock}
            className="flex-1"
          >
            {inStock ? 'Add to Cart' : 'Sold Out'}
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                // Copy the wishlist item URL to clipboard
                navigator.clipboard.writeText(window.location.origin + `/products/${slug}`);
              }}
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share
            </Button>
            
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                // This would typically show a notification UI when back in stock
                alert('You will be notified when this item is back in stock.');
              }}
              disabled={inStock}
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              Notify
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
