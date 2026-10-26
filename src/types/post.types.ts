import {CategoryId} from './category.types';

export interface PostListItemType {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  route: number;
  category: string;
  categoryId: NonNullable<CategoryId>;
  subCategory?: string;
  date: string;
  readingMinutes?: number;
}
