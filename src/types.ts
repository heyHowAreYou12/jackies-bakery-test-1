export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
  order?: number;
}

export interface BakerySettings {
  cakeOfTheDay: string;
  updatedAt?: any;
}
