const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchById<T>(
  resource: string,
  id?: string | number
): Promise<T> {
  if (!id) {
    throw new Error("ID is required");
  }

  const response = await fetch(`${BASE_URL}/${resource}/${id}`);

  if (!response.ok) {
    throw new Error(`Error fetching by id: ${response.statusText}`);
  }

  return response.json();
}
