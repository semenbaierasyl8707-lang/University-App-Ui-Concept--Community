export interface Course {
  id: number;
  title: string;
  body: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchCourses = async (): Promise<Course[]> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Деректерді алу кезінде қате пайда болды');
    }

    const data: Course[] = await response.json();

    return data.slice(0, 10);
  } catch (error) {
    console.error('API қатесі:', error);
    throw error;
  }
};