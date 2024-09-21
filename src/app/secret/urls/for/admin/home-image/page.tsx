'use client';

import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import LoadingSpinner from '@/components/UI/Loading';
import useImageManagement from '@/hooks/adminPage/main-image/useMainImageManage';
import { useRouter } from 'next/navigation';

const ImageManagement: React.FC = () => {
    const router = useRouter();
    const {
        images,
        isLoading,
        hasChanges,
        isDragging,
        setIsDragging,
        handleAddImage,
        handleRemoveImage,
        handleApplyChanges,
    } = useImageManagement();

    const onDragEnd = (result: DropResult) => {
        setIsDragging(false);

        if (!result.destination) {
            return;
        }

        const items = Array.from(images);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        handleApplyChanges();
    };

    return (
        <div className="container mx-auto p-4 min-h-screen flex flex-col justify-start pt-[2cm] md:pt-[3cm]">
            <div className="mb-8 text-center">
                <h1 className="text-xl md:text-3xl font-bold text-gray-800">메인 페이지 이미지 관리</h1>
                <h1 className="text-xs md:text-s font-bold text-gray-400">위에서 아래 순서대로 이미지가 적용됩니다.</h1>
            </div>

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
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`relative w-full max-w-lg ${snapshot.isDragging ? 'border-2 border-black' : ''}`}
                                                    style={{
                                                        ...provided.draggableProps.style,
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
                        <input type="file" className="hidden" onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    const newImage = {
                                        _id: Date.now().toString(),
                                        url: e.target?.result as string,
                                    };
                                    handleAddImage(newImage);
                                };
                                reader.readAsDataURL(file);
                            }
                        }} accept="image/*" />
                        <span className="text-4xl text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">+</span>
                    </label>

                    <div className="mt-8 flex justify-center space-x-4">
                        <button
                            onClick={handleApplyChanges}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            disabled={!hasChanges}
                        >
                            적용
                        </button>
                        <button
                            onClick={() => window.confirm('이미지 변경을 취소하시겠습니까?') && router.push(`${process.env.NEXT_PUBLIC_ADMIN_URL}/announcement`)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                            취소
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ImageManagement;
