'use client'

import Image from "next/image";
import LoadingSpinner from "@/components/UI/Loading";
import { useEffect, useState } from 'react';

interface ImageData {
  Key: string;
  Body: string;
  ContentType: string;
}

export default function Home() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/main`, { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch main page');
      }

      const data = await res.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Unexpected data format');
      }

      setImages(data); 
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        images.map((image, index) => (
          <div key={image.Key} className="relative w-full aspect-video">
            <Image
              src={`data:${image.ContentType};base64,${image.Body}`}
              alt={`Image ${index + 1}`}
              fill
              sizes="100vw"
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
              priority={index < 6}
            />
          </div>
        ))
      )}
    </div>
  );
}