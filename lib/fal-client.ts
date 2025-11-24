import * as fal from "@fal-ai/serverless-client";
import { getTranslations } from 'next-intl/server';

// 类型定义
interface FalImageResult {
  url: string;
  width?: number;
  height?: number;
  content_type?: string;
}

// 纵横比类型
type AspectRatio = "21:9" | "16:9" | "4:3" | "3:2" | "1:1" | "2:3" | "3:4" | "9:16" | "9:21";

interface FalResponse {
  images?: FalImageResult[];
  image?: FalImageResult;
  description?: string;
  data?: {
    images?: FalImageResult[];
    image?: FalImageResult;
    description?: string;
  };
  timings?: any;
  seed?: number;
  has_nsfw_concepts?: boolean[];
  prompt?: string;
  requestId?: string;
  logs?: any[];
}

// 翻译函数
async function getErrorMessage(key: string, locale?: string): Promise<string> {
  try {
    const t = await getTranslations({ locale: locale || 'en', namespace: 'errors.imageProcessing' });
    return t(key);
  } catch (error) {
    // 如果翻译失败，返回英文默认值
    const fallbackMessages: Record<string, string> = {
      'invalidImageData': 'API returned invalid image data',
      'noImagesReturned': 'API did not return any images',
      'noProcessedImages': 'API did not return any processed images',
      'unknownError': 'Unknown error occurred',
      'multiImageProcessingError': 'Unknown error occurred during multi-image processing',
      'batchProcessingError': 'Unknown error occurred during batch processing',
      'multiImageNoData': 'Multi-image processing found no image data',
      'batchProcessingFailed': 'Some batches failed to process',
      'batchError': 'processing failed',
      'batchException': 'processing error'
    };
    return fallbackMessages[key] || 'Unknown error occurred';
  }
}

// 配置 fal client
fal.config({
  credentials: process.env.FAL_KEY,
});

// 文生图 - 使用 Nano Banana Pro 模型
export async function textToImage(prompt: string, options?: {
  num_images?: number;
  aspect_ratio?: AspectRatio;
  output_format?: "jpeg" | "png";
  locale?: string;
}) {
  try {
    console.log('Calling Nano Banana Pro model for text-to-image...');

    const result = await fal.subscribe("fal-ai/nano-banana-pro", {
      input: {
        prompt: prompt,
        num_images: options?.num_images ?? 1,
        aspect_ratio: options?.aspect_ratio ?? "1:1",
        output_format: options?.output_format ?? "jpeg",
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          console.log("Generating image...", update.logs);
        }
      },
    }) as FalResponse;

    console.log('Fal AI text-to-image response:', result);

    // 处理响应格式
    let images: FalImageResult[] = [];

    if (result.images && Array.isArray(result.images)) {
      images = result.images;
    } else if (result.image) {
      images = [result.image];
    } else if (result.data?.images && Array.isArray(result.data.images)) {
      images = result.data.images;
    } else if (result.data?.image) {
      images = [result.data.image];
    } else {
      console.error('Image data not found:', result);
      const errorMessage = await getErrorMessage('invalidImageData', options?.locale);
      throw new Error(errorMessage);
    }

    if (images.length === 0) {
      const errorMessage = await getErrorMessage('noImagesReturned', options?.locale);
      throw new Error(errorMessage);
    }

    return {
      success: true,
      data: {
        images: images,
        model_used: 'nano-banana-pro',
        prompt_used: prompt,
        description: result.description || result.data?.description,
        parameters: {
          output_format: options?.output_format ?? "jpeg",
          num_images: options?.num_images ?? 1,
          aspect_ratio: options?.aspect_ratio ?? "1:1",
        }
      }
    };
  } catch (error) {
    console.error('Text-to-image error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : await getErrorMessage('unknownError', options?.locale)
    };
  }
}

// 图像编辑 - 使用 Nano Banana Pro Edit 模型
export async function editImage(imageUrl: string, prompt: string, options?: {
  num_images?: number;
  output_format?: "jpeg" | "png";
  locale?: string;
}) {
  try {
    console.log('Calling Nano Banana Edit model...');

    const result = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
      input: {
        prompt: prompt,
        image_urls: [imageUrl],
        num_images: options?.num_images ?? 1,
        output_format: options?.output_format ?? "jpeg",
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          console.log("Processing...", update.logs);
        }
      },
    }) as FalResponse;

    console.log('Fal AI response:', result);

    // 处理响应格式
    let images: FalImageResult[] = [];

    if (result.images && Array.isArray(result.images)) {
      images = result.images;
    } else if (result.image) {
      images = [result.image];
    } else if (result.data?.images && Array.isArray(result.data.images)) {
      images = result.data.images;
    } else if (result.data?.image) {
      images = [result.data.image];
    } else {
      console.error('Image data not found:', result);
      const errorMessage = await getErrorMessage('invalidImageData', options?.locale);
      throw new Error(errorMessage);
    }

    if (images.length === 0) {
      const errorMessage = await getErrorMessage('noImagesReturned', options?.locale);
      throw new Error(errorMessage);
    }

    return {
      success: true,
      data: {
        images: images,
        model_used: 'nano-banana-pro-edit',
        prompt_used: prompt,
        description: result.description || result.data?.description,
        parameters: {
          output_format: options?.output_format ?? "jpeg",
          num_images: options?.num_images ?? 1,
        }
      }
    };
  } catch (error) {
    console.error('Image edit error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : await getErrorMessage('unknownError', options?.locale)
    };
  }
}

// 兼容性别名
export async function smartImageEdit(imageUrl: string, prompt: string, options?: {
  num_images?: number;
  output_format?: "jpeg" | "png";
  locale?: string;
}) {
  return await editImage(imageUrl, prompt, options);
}

export async function preciseImageEdit(imageUrl: string, prompt: string, options?: {
  num_images?: number;
  output_format?: "jpeg" | "png";
  locale?: string;
}) {
  return await editImage(imageUrl, prompt, options);
}

export async function creativeImageEdit(imageUrl: string, prompt: string, options?: {
  num_images?: number;
  output_format?: "jpeg" | "png";
  locale?: string;
}) {
  return await editImage(imageUrl, prompt, options);
}


// 背景移除功能
export async function removeBackground(imageUrl: string, options?: {
  output_format?: "jpeg" | "png";
  locale?: string;
}) {
  return await editImage(imageUrl, "remove background, transparent background, clean cutout", {
    output_format: options?.output_format ?? "png",
    locale: options?.locale
  });
}

// 多图像处理 - 使用 Nano Banana Edit 模型
export async function multiImageEdit(imageUrls: string[], prompt: string, options?: {
  num_images?: number;
  output_format?: "jpeg" | "png";
  locale?: string;
}) {
  try {
    console.log('Calling Nano Banana Edit model for multi-image editing...');
    console.log('Input image count:', imageUrls.length);

    // Nano Banana supports 1-2 images, so we'll limit the input
    const limitedImageUrls = imageUrls.slice(0, 2);

    const result = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
      input: {
        prompt: prompt,
        image_urls: limitedImageUrls,
        num_images: Math.min(options?.num_images ?? limitedImageUrls.length, 4),
        output_format: options?.output_format ?? "jpeg",
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          console.log("Processing multi-images...", update.logs);
        }
      },
    }) as FalResponse;

    console.log('Fal AI Multi response:', result);

    let images: FalImageResult[] = [];

    if (result.images && Array.isArray(result.images)) {
      images = result.images;
    } else if (result.data?.images && Array.isArray(result.data.images)) {
      images = result.data.images;
    } else if (result.image) {
      images = [result.image];
    } else if (result.data?.image) {
      images = [result.data.image];
    } else {
      console.error('Multi-image processing found no image data:', result);
      const errorMessage = await getErrorMessage('multiImageNoData', options?.locale);
      throw new Error(errorMessage);
    }

    if (images.length === 0) {
      const errorMessage = await getErrorMessage('noProcessedImages', options?.locale);
      throw new Error(errorMessage);
    }

    return {
      success: true,
      data: {
        images: images,
        model_used: 'nano-banana-pro-edit-multi',
        prompt_used: prompt,
        description: result.description || result.data?.description,
        input_count: limitedImageUrls.length,
        output_count: images.length,
        parameters: {
          output_format: options?.output_format ?? "jpeg",
          num_images: Math.min(options?.num_images ?? limitedImageUrls.length, 4),
        }
      }
    };
  } catch (error) {
    console.error('Multi-image edit error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : await getErrorMessage('multiImageProcessingError', options?.locale)
    };
  }
}

// Batch image processing (for handling large numbers of images in batches)
export async function batchImageEdit(imageUrls: string[], prompt: string, options?: {
  output_format?: "jpeg" | "png";
  batch_size?: number;
  max_concurrent?: number;
  locale?: string;
}) {
  try {
    // Nano Banana只支持1-2张图片，所以调整batch size
    const batchSize = Math.min(options?.batch_size ?? 2, 2);
    const maxConcurrent = options?.max_concurrent ?? 2;
    const batches: string[][] = [];

    // Split images into batches
    for (let i = 0; i < imageUrls.length; i += batchSize) {
      batches.push(imageUrls.slice(i, i + batchSize));
    }

    console.log(`Batch processing: ${imageUrls.length} images split into ${batches.length} batches`);

    const allResults: FalImageResult[] = [];
    const errors: string[] = [];

    // Process batches concurrently
    for (let i = 0; i < batches.length; i += maxConcurrent) {
      const currentBatches = batches.slice(i, i + maxConcurrent);

      const batchPromises = currentBatches.map(async (batch, batchIndex) => {
        try {
          const result = await multiImageEdit(batch, prompt, {
            output_format: options?.output_format,
            locale: options?.locale
          });

          if (result.success && result.data?.images) {
            return result.data.images;
          } else {
            const errorMessage = await getErrorMessage('batchError', options?.locale);
            errors.push(`Batch ${i + batchIndex + 1} ${errorMessage}: ${result.error}`);
            return [];
          }
        } catch (error) {
          const errorMessage = await getErrorMessage('batchException', options?.locale);
          const unknownError = await getErrorMessage('unknownError', options?.locale);
          errors.push(`Batch ${i + batchIndex + 1} ${errorMessage}: ${error instanceof Error ? error.message : unknownError}`);
          return [];
        }
      });

      const batchResults = await Promise.all(batchPromises);
      batchResults.forEach(images => allResults.push(...images));
    }

    const batchFailedMessage = await getErrorMessage('batchProcessingFailed', options?.locale);

    return {
      success: allResults.length > 0,
      data: {
        images: allResults,
        model_used: 'nano-banana-pro-edit-batch',
        prompt_used: prompt,
        input_count: imageUrls.length,
        output_count: allResults.length,
        batch_count: batches.length,
        errors: errors.length > 0 ? errors : undefined,
        parameters: {
          output_format: options?.output_format ?? "jpeg",
          batch_size: batchSize,
          max_concurrent: maxConcurrent,
        }
      },
      error: errors.length > 0 ? `${batchFailedMessage}: ${errors.join('; ')}` : undefined
    };
  } catch (error) {
    console.error('Batch image edit error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : await getErrorMessage('batchProcessingError', options?.locale)
    };
  }
}

// 导出纵横比类型
export type { AspectRatio };

// 导出 fal 客户端以供其他用途
export { fal }; 