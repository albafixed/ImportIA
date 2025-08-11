
import { Product } from '../types';

export async function fetchProductRecommendations(niche: string): Promise<Product[]> {
    try {
        const response = await fetch('/api/get-recommendations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ niche }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'No se pudo leer la respuesta de error del servidor.' }));
            throw new Error(errorData.message || `Error del servidor: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();

        if (!data.products || !Array.isArray(data.products) || data.products.length === 0) {
            throw new Error('La IA no devolvió productos válidos. Inténtalo de nuevo con otro nicho.');
        }

        return data.products;

    } catch (error) {
        console.error("Error al obtener recomendaciones desde el backend:", error);
        throw error;
    }
}
