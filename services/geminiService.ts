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
            const errorData = await response.json().catch(() => ({ message: `Error del servidor: ${response.status}` }));
            throw new Error(errorData.message || 'No se pudo obtener una respuesta del servidor.');
        }

        const data: ProductResponse = await response.json();

        if (!data.products || data.products.length === 0) {
            throw new Error("La API no devolvió productos. Inténtalo de nuevo.");
        }
        
        return data.products;

    } catch (error) {
        console.error("Error al obtener recomendaciones desde la función serverless:", error);
        if (error instanceof Error) {
            // Re-lanzar el error para que el componente de UI lo capture.
            // El mensaje de error ya debería ser amigable para el usuario desde el servidor o desde la lógica de manejo de fetch.
            throw new Error(error.message);
        }
        throw new Error("Ocurrió un error desconocido al contactar al servidor.");
    }
}
