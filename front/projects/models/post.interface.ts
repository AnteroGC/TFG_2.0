import { Category } from "./category.interface";
import { User } from "./user.interface";


export interface Post {
  id: number;
  tittle: string;
  content: string;
  createdAt: Date;
  modifiedAt: Date;
  slug: string;
  category: Category;
  user: User;
  status?: string;
  mainImageUrl?: string;
  song?:string
}