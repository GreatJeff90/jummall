import { requestSignedUploadUrlAPI, uploadFileBinaryToGCS, UploadedImageAsset } from "../api/auth";

/**
 * Core image uploading workflow mirroring Flutter's signed-PUT implementation.
 * Iterates through raw files, grabs upload credentials, and maps them concurrently straight to GCS.
 */
export const uploadProductImagesWorkflow = async (
  files: File[]
): Promise<UploadedImageAsset[]> => {
  if (!files || files.length === 0) return [];

  const uploadTasks = files.map(async (file, index): Promise<UploadedImageAsset> => {
    // 1. Fire request config matching server validation rules
    const signedConfig = await requestSignedUploadUrlAPI({
      content_type: file.type || "image/jpeg",
      prefix: "products"
    });

    // 2. Stream raw stream data down to GCS with correct contextual content-types
    const strictHeaders: Record<string, string> = {};
    Object.entries(signedConfig.headers).forEach(([key, val]) => {
      if (val !== undefined) strictHeaders[key] = val;
    });

    await uploadFileBinaryToGCS(signedConfig.upload_url, file, strictHeaders);

    // 3. Return object references staged for backend product creations
    return {
      object_name: signedConfig.object_name,
      url: signedConfig.public_url,
      is_main: index === 0 // Default the first index file to be the primary cover asset image
    };
  });

  // Execute tasks in parallel for optimal hardware acceleration speeds
  return await Promise.all(uploadTasks);
};