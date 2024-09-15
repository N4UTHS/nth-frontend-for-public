'use client';

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DraggableStateSnapshot } from 'react-beautiful-dnd';
import LoadingSpinner from '@/components/UI/Loading';
import { useRouter } from 'next/navigation';
import { ImageProps } from '@/types/Props';

const ImageManagement: React.FC = () => {
    const router = useRouter();
    const [images, setImages] = useState<ImageProps[]>([]);
    const [originalImages, setOriginalImages] = useState<ImageProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasChanges, setHasChanges] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${process.env.NEXT_PUBLIC_ADMIN_URL}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                credentials: 'include',
            });

            if (!response.ok) {
                router.push('/');
                throw new Error('Failed to fetch images');
            }

            const data = await response.json();

            if (Array.isArray(data)) {
                setImages(data);
                setOriginalImages(data);
            } else {
                console.error('Fetched data is not an array:', data);
                setImages([]);
                setOriginalImages([]);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            setImages([]);
            setOriginalImages([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const newImage: ImageProps = {
                _id: Date.now().toString(),
                url: e.target?.result as string,
            };
            setImages(prevImages => [...prevImages, newImage]);
            setHasChanges(true);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = (id: string) => {
        setImages(prevImages => prevImages.filter(image => image._id !== id));
        setHasChanges(true);
    };

    const onDragEnd = (result: DropResult) => {
        setIsDragging(false);

        if (!result.destination) {
            return;
        }

        const items = Array.from(images);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setImages(items);
        setHasChanges(true);
    };

    const handleApply = async () => {
        if (window.confirm('이미지를 적용하시겠습니까?')) {
            try {
                const formData = new FormData();

                images.forEach((image, index) => {
                    const blob = new Blob([dataURItoBlob(image.url)], { type: 'image/jpeg' });
                    formData.append('files', blob, `image-${index}.jpg`);
                });

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${process.env.NEXT_PUBLIC_ADMIN_URL}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    credentials: 'include',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('변경 사항 적용 실패');
                }

                const result = await response.json();
                setOriginalImages(images);
                setHasChanges(false);
                alert('변경 사항이 성공적으로 적용되었습니다.');
                router.push(`${process.env.NEXT_PUBLIC_ADMIN_URL}/announcement`);
            } catch (error) {
                console.error('변경 사항 적용 중 오류 발생:', error);
                alert('변경 사항 적용에 실패했습니다. 다시 시도해 주세요.');
            }
        }
    };

    const handleCancel = () => {
        if (window.confirm('이미지 변경을 취소하시겠습니까?')) {
            router.push(`${process.env.NEXT_PUBLIC_ADMIN_URL}/announcement`);
        }
    };

    function dataURItoBlob(dataURI: string): Blob {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }

    return (
        <div className="container mx-auto p-4 min-h-screen flex flex-col justify-start pt-[2cm] md:pt-[3cm]">
            <div className="mb-8 text-center">
                <h1 className="text-xl md:text-3xl font-bold text-gray-800">메인 페이지 이미지 관리</h1>
                <h1 className="text-xs md:text-s font-bold text-gray-400">위에서 아래 순서대로 이미지가 적용됩니다.</h1>
            </div>

            <div className="container mx-auto px-4">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <DragDropContext
                            onDragEnd={onDragEnd}
                            onDragStart={() => setIsDragging(true)}
                        >
                            <Droppable droppableId="images">
                                {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col items-center gap-4">
                                        {images.map((image, index) => (
                                            <Draggable key={image._id} draggableId={image._id} index={index}>
                                                {(provided, snapshot: DraggableStateSnapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`relative w-full max-w-lg ${snapshot.isDragging ? 'border-2 border-black' : ''}`}
                                                        style={{
                                                            ...provided.draggableProps.style,
                                                            height: 'auto',
                                                            transform: snapshot.isDragging
                                                                ? `${provided.draggableProps.style?.transform} scale(0.95)`
                                                                : provided.draggableProps.style?.transform,
                                                        }}
                                                    >
                                                        <img
                                                            src={image.url}
                                                            alt="Uploaded"
                                                            className="w-full h-full object-cover rounded"
                                                        />
                                                        <button
                                                            onClick={() => handleRemoveImage(image._id)}
                                                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center text-2xl"
                                                        >
                                                            -
                                                        </button>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <label className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg w-full max-w-lg pb-[25%] relative mt-4 mx-auto">
                            <input type="file" className="hidden" onChange={handleAddImage} accept="image/*" />
                            <span className="text-4xl text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">+</span>
                        </label>
                        <div className="mt-8 flex justify-center space-x-4">
                            <button
                                onClick={handleApply}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                disabled={!hasChanges}
                            >
                                적용
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                취소
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ImageManagement;
