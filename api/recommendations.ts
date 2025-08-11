import { GoogleGenAI, Type } from "@google/genai";
import { ProductResponse } from '../types';

// Esta función será manejada por Vercel como una función serverless.
export default async function handler(request: Request) {
    console.log("Iniciando la función /api/recommendations...");

    if (request.method !== 'POST') {
        console.log("Método no permitido:", request.method);
        return new Response(JSON.stringify({ message: 'Solo se permiten solicitudes POST' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json', 'Allow': 'POST' },
        });
    }

    if (!process.env.API_KEY) {
        console.error("Error: La variable de entorno API_KEY no fue encontrada.");
        return new Response(JSON.stringify({ message: 'Error de configuración del servidor: la clave de API no está disponible.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { niche } = await request.json();
        console.log("Nicho recibido:", niche);

        if (!niche || typeof niche !== 'string') {
             console.error("Error: El campo 'niche' es inválido o no fue proporcionado.");
             return new Response(JSON.stringify({ message: 'El campo "niche" es requerido en el cuerpo de la solicitud.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        const productSchema = {
            type: Type.OBJECT,
            properties: {
                products: {
                    type: Type.ARRAY,
                    description: "Una lista de 3 productos recomendados.",
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            productName: { type: Type.STRING, description: "El nombre del producto recomendado." },
                            description: { type: Type.STRING, description: "Una descripción comercial atractiva del producto, de no más de 15 palabras." },
                            pros: { type: Type.ARRAY, description: "Exactamente 2 puntos positivos o ventajas comerciales del producto.", items: { type: Type.STRING } },
                            cons: { type: Type.ARRAY, description: "Exactamente 1 punto negativo o desventaja a considerar sobre el producto.", items: { type: Type.STRING } },
                            alibabaSearchKeywords: { type: Type.ARRAY, description: "Una lista de 2 a 4 palabras clave específicas y técnicas para buscar este producto exacto en Alibaba y obtener los mejores resultados.", items: { type: Type.STRING } }
                        },
                        required: ["productName", "description", "pros", "cons", "alibabaSearchKeywords"]
                    }
                }
            },
            required: ["products"]
        };

        const prompt = `Analiza las tendencias actuales de ventas y popularidad en Alibaba para la categoría de "${niche}". Basado en tu análisis, recomienda 3 productos que cumplan con los siguientes criterios:
1. Novedosos y con alto potencial de ventas.
2. Económicos (bajo costo de adquisición).
3. Pequeños y ligeros (fáciles de importar y almacenar).

Para cada producto, proporciona:
- Un nombre de producto simple y directo ("productName").
- Una descripción muy breve, de no más de 15 palabras ("description").
- Exactamente 2 puntos positivos destacando por qué es una buena oportunidad de negocio (ej. alto margen, potencial viral) ("pros").
- Exactamente 1 punto negativo o un riesgo a considerar (ej. alta competencia, material frágil) ("cons").
- Una lista de 2 a 4 palabras clave de búsqueda específicas y técnicas para encontrar este producto en Alibaba. Deben ser términos que un comprador usaría para encontrar el artículo exacto, no términos genéricos ("alibabaSearchKeywords").`;

        console.log("Realizando llamada a la API de Gemini...");
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: "Eres un analista de mercado experto especializado en comercio electrónico y tendencias de productos en Alibaba. Tu objetivo es identificar productos innovadores, económicos y fáciles de importar para nuevos emprendedores. Debes devolver exactamente 3 productos en formato JSON, incluyendo para cada uno 2 pros, 1 con y las palabras clave para buscar en Alibaba.",
                responseMimeType: "application/json",
                responseSchema: productSchema,
            },
        });

        console.log("Llamada a Gemini completada. Procesando respuesta...");
        const jsonText = response.text.trim();
        console.log("Respuesta de texto crudo de la API:", jsonText);
        
        const parsedResponse: ProductResponse = JSON.parse(jsonText);

        if (!parsedResponse.products || parsedResponse.products.length === 0) {
           console.error("Error: La API no devolvió productos en el formato esperado.");
           return new Response(JSON.stringify({ message: 'La IA no devolvió productos válidos. Inténtalo de nuevo.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        
        console.log("Respuesta enviada al cliente exitosamente.");
        return new Response(JSON.stringify(parsedResponse), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Error catastrófico en la función serverless:", error);
         return new Response(JSON.stringify({ message: error instanceof Error ? error.message : "Ocurrió un error desconocido en el servidor." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}