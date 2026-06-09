import puter from "@heyputer/puter.js";
import { ROOMIFY_RENDER_PROMPT } from "./constants";

// Type definition for the parameters
interface Generate3DViewParams {
  sourceImage: string;
}

export async function fetchasdataurl(url: string): Promise<string> {
  const response = await fetch(url);

  if (!response || !response.ok) {
    throw new Error(`Failed to fetch image from ${url}`);
  }

  const blob = await response.blob();

  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }
      reject(new Error("Failed to read blob as a data URL."));
    };

    reader.onerror = () => {
      reject(reader.error ?? new Error("An unknown error occurred while reading the blob."));
    };

    reader.readAsDataURL(blob);
  });
}

export const generate3DView = async ({ sourceImage }: Generate3DViewParams) => {
  const dataUrl = sourceImage.startsWith("data:")
    ? sourceImage
    : await fetchasdataurl(sourceImage);

  // Fixed the split delimiter (removed the space)
  const parts = dataUrl.split(',');
  const base64Data = parts[1];
  
  // Safely extract just the mime-type (e.g., "image/png") ignoring the ";base64" part
  const mimeTypeMatch = parts[0].match(/:(.*?);/);
  const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : null;

  if (!mimeType || !base64Data) {
    throw new Error('Invalid source image payload');
  }

  // Puter AI txt2img call
  const response = await puter.ai.txt2img(ROOMIFY_RENDER_PROMPT, {
    provider: 'gemini',
    model: 'gemini-2.5-flash-image-preview',
    input_image: base64Data,
    input_image_mime_type: mimeType,
    ratio: { w: 1024, h: 1024 },
  });

  const rawImageUrl = (response as HTMLImageElement).src ?? null;

  if (!rawImageUrl) {
    return { renderedImage: null, renderedPath: undefined };
  }

  const renderedImage = rawImageUrl.startsWith("data:")
    ? rawImageUrl
    : await fetchasdataurl(rawImageUrl);

  return { renderedImage, renderedPath: undefined };
};