export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface PostProduct {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}
