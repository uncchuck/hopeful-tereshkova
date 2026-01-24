export type Product = {
  id: string;
  title: string;
  price: number;
  tags: string[];
  hasTryOn: boolean;
  imageDataUrl: string;
  createdAt: number;
};

export type StoreProfile = {
  handle: string;
  bio?: string;
};
