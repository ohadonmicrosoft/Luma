import React, { useState } from "react";
import Link from "next/link";
import { AccountLayout } from "@/components/account/AccountLayout";
import { WishlistItem } from "@/components/account/WishlistItem";
import { Button } from "@/components/ui/Button";

// Mock data for wishlist items
const mockWishlistItems = [
  {
    id: "wish-1",
    name: "Premium Bluetooth Headphones",
    price: 129.99,
    imageUrl: "/images/products/headphones.jpg",
    slug: "premium-bluetooth-headphones",
    inStock: true,
  },
  {
    id: "wish-2",
    name: "Ergonomic Office Chair",
    price: 249.99,
    imageUrl: "/images/products/chair.jpg",
    slug: "ergonomic-office-chair",
    inStock: true,
  },
  {
    id: "wish-3",
    name: "Smart Watch Pro",
    price: 299.99,
    imageUrl: "/images/products/smartwatch.jpg",
    slug: "smart-watch-pro",
    inStock: false,
  },
  {
    id: "wish-4",
    name: "Ultra HD 4K Monitor",
    price: 399.99,
    imageUrl: "/images/products/monitor.jpg",
    slug: "ultra-hd-4k-monitor",
    inStock: true,
  },
];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const handleRemoveItem = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const handleAddToCart = (id: string) => {
    // In a real app, this would add the item to the cart
    alert(`Added item ${id} to cart!`);
  };

  const handleShareWishlist = () => {
    const url = `${window.location.origin}/shared-wishlist/${Math.random()
      .toString(36)
      .substring(2, 15)}`;
    setShareUrl(url);

    // Copy to clipboard
    navigator.clipboard.writeText(url);
  };

  const handleClearWishlist = () => {
    if (confirm("Are you sure you want to clear your wishlist?")) {
      setWishlistItems([]);
    }
  };

  return (
    <AccountLayout title="My Wishlist">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold">My Wishlist</h1>
            <p className="text-neutral-600 mt-1">
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1 ? "item" : "items"} saved to your
              wishlist
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={handleShareWishlist}>
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share Wishlist
            </Button>

            {wishlistItems.length > 0 && (
              <Button
                variant="outline"
                className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                onClick={handleClearWishlist}
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear All
              </Button>
            )}
          </div>
        </div>

        {shareUrl && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mt-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-blue-800">
                  Wishlist shared successfully!
                </h3>
                <p className="text-blue-700 text-sm mt-1">
                  The link has been copied to your clipboard:
                </p>
                <p className="text-blue-900 text-sm mt-1 font-mono">
                  {shareUrl}
                </p>
              </div>
              <button
                onClick={() => setShareUrl(null)}
                className="text-blue-500 hover:text-blue-700"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {wishlistItems.length === 0 ? (
          <div className="text-center p-8 border border-dashed border-neutral-300 rounded-lg">
            <svg
              className="mx-auto h-12 w-12 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-neutral-900">
              Your wishlist is empty
            </h3>
            <p className="mt-1 text-sm text-neutral-500">
              Start adding products you love to your wishlist.
            </p>
            <div className="mt-6">
              <Link href="/products">
                <Button>Browse Products</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <WishlistItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
                slug={item.slug}
                inStock={item.inStock}
                onRemove={handleRemoveItem}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

        {wishlistItems.length > 0 && (
          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => {
                // In a real app, this would add all in-stock items to the cart
                const inStockItems = wishlistItems.filter(
                  (item) => item.inStock
                );
                alert(`Added ${inStockItems.length} items to your cart!`);
              }}
            >
              Add All In-Stock Items to Cart
            </Button>
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
