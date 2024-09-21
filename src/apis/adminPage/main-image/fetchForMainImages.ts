import { ImageProps } from '@/types/Props';

export const fetchImages = async (): Promise<ImageProps[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${process.env.NEXT_PUBLIC_ADMIN_URL}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch images');
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
        throw new Error('Fetched data is not an array');
    }

    return data;
};

export const applyImages = async (images: ImageProps[]) => {
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
        throw new Error('Failed to apply changes');
    }

    return await response.json();
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
