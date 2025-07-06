export const loadImage = async (src: string): Promise<HTMLImageElement> => {
    return new Promise((res, rej) => {
        const image = new Image();
        image.onload = () => res(image);
        image.onerror = () => rej(new Error(`Failed to load image: ${src}`));
        image.src = src;
    })
}