import cloudinary, { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
//
console.log('src/shared/globals/helpers/cloudinary-upload.ts');

export const uploads = (file: string, public_id?: string, overwrite?: boolean, invalidate?: boolean) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      { public_id, overwrite, invalidate },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) resolve(error);
        resolve(result);
      }
    );
  });
};
