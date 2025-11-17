"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Product = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to new products page
    router.replace("/products/sabiyarn");
  }, [router]);

  return (
    <div className="min-h-screen bg-light-beige flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-dark-green mb-4">Redirecting...</h2>
        <p className="text-dark-green-dark">Taking you to our new models page.</p>
      </div>
    </div>
  );
};

export default Product;

