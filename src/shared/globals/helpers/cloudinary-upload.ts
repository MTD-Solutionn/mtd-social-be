import cloudinary, { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

type UpLoads = {
  file: string;
  public_id?: string;
  overwrite?: boolean;
  invalidate?: boolean;
};

export const uploadImage = ({
  file,
  public_id,
  overwrite,
  invalidate
}: UpLoads): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> =>
  new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      { public_id, overwrite, invalidate },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) resolve(error);
        resolve(result);
      }
    );
  });
