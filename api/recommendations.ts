import { GoogleGenAI, Type } from "@google/genai";
import { ProductResponse } from '../types';

// Esta función es manejada por Vercel como una función serverless.
export default async function handler(request: Request) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ message: 'Solo se permiten solicitudes POST' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json', 'Allow': 'POST' },
        });
    }

    if (!process.env.API_KEY) {
        console.error("Error crítico: La variable de entorno API_KEY no fue encontrada en el entorno de Vercel.");
        return new Response(JSON.stringify({ message: 'Error de configuración del servidor: la clave de API no está disponible.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { niche } = await request.json();

        if (!niche || typeof niche !== 'string') {
             return new Response(JSON.stringify({ message: 'El campo "niche" es requerido y debe ser un texto.' }), {
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
                            pros: { type: Type.ARRAY, description: "Puntos positivos o ventajas comerciales del producto.", items: { type: Type.STRING } },
                            cons: { type: Type.ARRAY, description: "Puntos negativos o desventajas a considerar sobre el producto.", items: { type: Type.STRING } },
                            alibabaSearchKeywords: { type: Type.ARRAY, description: "Palabras clave específicas y técnicas para buscar este producto en Alibaba.", items: { type: Type.STRING } }
                        },
                        required: ["productName", "description", "pros", "cons", "alibabaSearchKeywords"]
                    }
                }
            },
            required: ["products"]
        };
        
        const systemInstruction = "Eres un analista de mercado experto en e-commerce y tendencias de Alibaba. Tu misión es identificar 3 productos novedosos y económicos para emprendedores en el nicho proporcionado. Responde estrictamente con un objeto JSON que se valide con el esquema proporcionado.";
        
        const prompt = `Analiza el nicho de mercado: '${niche}'.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: productSchema,
                temperature: 0.7,
            },
        });

        // Limpieza defensiva de la respuesta de la IA.
        // A veces, el modelo envuelve la respuesta JSON en bloques de código Markdown.
        let jsonText = response.text.trim();
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.substring(7);
            if (jsonText.endsWith('```')) {
                jsonText = jsonText.slice(0, -3);
            }
        }
        jsonText = jsonText.trim();
        
        if (!jsonText) {
            console.error("La API de Gemini devolvió una respuesta de texto vacía después de la limpieza.");
            return new Response(JSON.stringify({ message: 'La IA no generó una respuesta válida. Inténtalo de nuevo.' }), {
                status: 502, // Bad Gateway
                headers: { 'Content-Type': 'application/json' },
            });
        }
        
        let parsedResponse: ProductResponse;
        try {
            parsedResponse = JSON.parse(jsonText);
        } catch(e) {
             console.error("Error al parsear JSON de la IA después de la limpieza:", { originalText: response.text, cleanedText: jsonText, error: e });
             return new Response(JSON.stringify({ message: 'La IA devolvió una respuesta con un formato inesperado.' }), {
                status: 502,
                headers: { 'Content-Type': 'application/json' },
            });
        }


        if (!parsedResponse.products || parsedResponse.products.length === 0) {
           console.error("El JSON parseado no contiene productos válidos.", { parsedResponse });
           return new Response(JSON.stringify({ message: 'La IA no devolvió productos válidos en su respuesta. Inténtalo de nuevo.' }), {
                status: 502,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        
        return new Response(JSON.stringify(parsedResponse), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Error detallado en la función serverless:", {
            message: error instanceof Error ? error.message : "Error desconocido",
            name: error instanceof Error ? error.name : "N/A",
            errorObject: error
        });
        
        const userMessage = "Hubo un problema al contactar al asistente de IA. Por favor, verifica la configuración o intenta de nuevo más tarde.";

        return new Response(JSON.stringify({ message: userMessage }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}