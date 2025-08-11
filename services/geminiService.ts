import { Product, ProductResponse } from '../types';

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
            const errorData = await response.json().catch(() => ({ message: 'No se pudo obtener una respuesta del servidor.' }));
            throw new Error(errorData.message || 'Ocurrió un error en el servidor.');
        }

        const data: ProductResponse = await response.json();

        if (!data.products || data.products.length === 0) {
            throw new Error("La API no devolvió productos. Inténtalo de nuevo.");
        }
        
        return data.products;

    } catch (error) {
        console.error("Error fetching recommendations from serverless function:", error);
        if (error instanceof Error) {
            // Re-throw with a more generic user-facing message
            throw new Error(`No se pudieron obtener las recomendaciones: ${error.message}`);
        }
        throw new Error("Ocurrió un error desconocido al contactar al servidor.");
    }
}
