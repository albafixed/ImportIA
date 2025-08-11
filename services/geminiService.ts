import { Product } from '../types';

export async function fetchProductRecommendations(niche: string): Promise<Product[]> {
    try {
        const response = await fetch('/api/recommendations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ niche }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Error desconocido en el servidor.' }));
            throw new Error(errorData.message || `Error del servidor: ${response.status}`);
        }
        
        const data = await response.json();

        if (!data.products || data.products.length === 0) {
            throw new Error('La IA no devolvió productos válidos en su respuesta.');
        }

        return data.products;

    } catch (error) {
        console.error("Error al obtener recomendaciones desde el backend:", error);
        // Re-lanza el error para que el componente de la UI pueda manejarlo.
        throw error;
    }
}