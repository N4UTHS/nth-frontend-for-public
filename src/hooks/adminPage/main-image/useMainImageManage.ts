import { useState, useEffect } from 'react';
import { fetchImages, applyImages } from '@/apis/adminPage/main-image/fetchForMainImages';
import { useRouter } from 'next/navigation';
import { ImageProps } from '@/types/Props';

const useImageManagement = () => {
    const [images, setImages] = useState<ImageProps[]>([]);
    const [originalImages, setOriginalImages] = useState<ImageProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasChanges, setHasChanges] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const loadImages = async () => {
            try {
                const data = await fetchImages();
                setImages(data);
                setOriginalImages(data);
            } catch (error) {
                console.error('Error fetching images:', error);
                setImages([]);
                setOriginalImages([]);
                router.push('/');
            } finally {
                setIsLoading(false);
            }
        };

        loadImages();
    }, [router]);

    const handleAddImage = (newImage: ImageProps) => {
        setImages(prevImages => [...prevImages, newImage]);
        setHasChanges(true);
    };

    const handleRemoveImage = (id: string) => {
        setImages(prevImages => prevImages.filter(image => image._id !== id));
        setHasChanges(true);
    };

    const handleApplyChanges = async () => {
        await applyImages(images);
        setOriginalImages(images);
        setHasChanges(false);
    };

    return {
        images,
        isLoading,
        hasChanges,
        isDragging,
        setIsDragging,
        handleAddImage,
        handleRemoveImage,
        handleApplyChanges,
    };
};

export default useImageManagement;
