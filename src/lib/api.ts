import axios from 'axios';
import { PUBLIC_BASE_URL } from '$env/static/public';

const client = axios.create({
	baseURL: PUBLIC_BASE_URL,
	validateStatus: () => true,
});

export type Response<T> = {
	success: false
} | {
	success: true,
	data: T
}

export type Option<T> = T | null;

export async function recipe(id: number): Promise<Option<Recipe>> {
	const { data } = await client.get<Response<Recipe>>(`/recipes/${id}`);

	return data.success ? data.data : null;
}

export async function recipes(): Promise<Recipe[]> {
	const { data } = await client.get<Response<Recipe[]>>('/recipes');

	return data.success ? data.data : [];
}
