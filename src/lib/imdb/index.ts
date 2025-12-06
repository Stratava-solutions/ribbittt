// src/lib/imgbb.ts

interface ImgBBResponse {
  data: {
    url: string;
    display_url: string;
    thumb: {
      url: string;
    };
    delete_url: string;
  };
  success: boolean;
  status: number;
}

interface UploadResult {
  url: string;
  thumbnailUrl: string;
  deleteUrl: string;
}

export class ImgBBUploader {
  private apiKey: string;
  private baseUrl = 'https://api.imgbb.com/1/upload';

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('ImgBB API key is required');
    }
    this.apiKey = apiKey;
  }

  /**
   * Upload a single image to ImgBB
   * @param file - File object or base64 string
   * @param name - Optional name for the image
   * @returns Upload result with URLs
   */
  async uploadImage(file: File | string, name?: string): Promise<UploadResult> {
    try {
      const formData = new FormData();
      formData.append('key', this.apiKey);

      if (typeof file === 'string') {
        // Base64 string
        const base64Data = file.includes('base64,') 
          ? file.split('base64,')[1] 
          : file;
        formData.append('image', base64Data);
      } else {
        // File object
        const base64 = await this.fileToBase64(file);
        formData.append('image', base64);
      }

      if (name) {
        formData.append('name', name);
      }

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data: ImgBBResponse = await response.json();

      if (!data.success) {
        throw new Error('Upload was not successful');
      }

      return {
        url: data.data.display_url,
        thumbnailUrl: data.data.thumb.url,
        deleteUrl: data.data.delete_url,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`ImgBB upload failed: ${error.message}`);
      }
      throw new Error('ImgBB upload failed with unknown error');
    }
  }

  /**
   * Upload multiple images to ImgBB
   * @param files - Array of File objects or base64 strings
   * @param namePrefix - Optional prefix for image names
   * @returns Array of upload results
   */
  async uploadMultiple(
    files: (File | string)[],
    namePrefix?: string
  ): Promise<UploadResult[]> {
    const uploadPromises = files.map((file, index) => {
      const name = namePrefix ? `${namePrefix}_${index + 1}` : undefined;
      return this.uploadImage(file, name);
    });

    try {
      return await Promise.all(uploadPromises);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Batch upload failed: ${error.message}`);
      }
      throw new Error('Batch upload failed with unknown error');
    }
  }

  /**
   * Convert File to base64 string
   */
  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split('base64,')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  /**
   * Delete image from ImgBB (Note: requires delete URL from upload)
   */
  async deleteImage(deleteUrl: string): Promise<boolean> {
    try {
      const response = await fetch(deleteUrl);
      return response.ok;
    } catch (error) {
      console.error('Failed to delete image:', error);
      return false;
    }
  }
}

// Singleton instance
let imgbbUploader: ImgBBUploader | null = null;

export function getImgBBUploader(): ImgBBUploader {
  if (!imgbbUploader) {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      throw new Error('IMGBB_API_KEY environment variable is not set');
    }
    imgbbUploader = new ImgBBUploader(apiKey);
  }
  return imgbbUploader;
}