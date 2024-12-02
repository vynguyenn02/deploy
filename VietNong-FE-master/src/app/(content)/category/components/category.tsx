// components/CategoryComponent.tsx
"use client";
import { useEffect, useState } from 'react';
import { getCategories } from '@/ultis/CategoryOdata';

interface Category {
  categoryId: number;
  categoryName: string;
  description: string;
  image: string;
}

function CategoryComponent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        console.log('Categories data:', data); // Log dữ liệu trả về từ API
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        } else {
          setError('No categories available');
        }
      } catch (error) {
        setError('Error loading categories');
        console.error('Error loading categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {categories.length > 0 ? (
          categories.map(category => (
            <li key={category.categoryId}>
              <h3>{category.categoryName}</h3>
              <p>{category.description}</p>
              <img src={category.image} alt={category.categoryName} width={100} />
            </li>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </ul>
    </div>
  );
}

export default CategoryComponent;
