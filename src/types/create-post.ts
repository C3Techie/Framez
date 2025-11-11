export interface CreatePostData {
  caption: string;
  imageUri: string | null;
}

export interface ImagePickerResult {
  uri: string;
  cancelled: boolean;
}