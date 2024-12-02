import odataClient from "./odataclient"; 

import { Category } from "@/type/Category";
// Đảm bảo axios trả về một mảng các đối tượng Category
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await odataClient.get<Category[]>('/category');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Error fetching categories');
  }
};

//getbyid
//https://localhost:7050/odata/category/1

//update
//https://localhost:7050/odata/category/1

//delete
//https://localhost:7050/odata/category/2
