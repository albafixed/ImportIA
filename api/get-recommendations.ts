
import { GoogleGenAI, Type } from "@google/genai";
import { ProductResponse } from '../types';

// Exporta la configuración de la función para Vercel
export const config = {
    runtime: 'edge',
};

// Esta función es manejada por Vercel como una función serverless.
export default async function handler(request: Request) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ message: 'Método no permitido. Solo se aceptan solicitudes POST.' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json', 'Allow': 'POST' },
        });
    }

    if (!process.env.API_KEY) {
        console.error("Error crítico: La variable de entorno API_KEY no fue encontrada.");
        return new Response(JSON.stringify({ message: 'Error de configuración en el servidor. El administrador ha sido notificado.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { niche } = await request.json();

        if (!niche || typeof niche !== 'string' || niche.trim().length === 0) {
             return new Response(JSON.stringify({ message: 'El campo "niche" es requerido y debe ser un texto válido.' }), {
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
                    description: "Una lista de exactamente 3 productos innovadores y con potencial comercial.",
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            productName: { type: Type.STRING, description: "Nombre claro y conciso del producto." },
                            description: { type: Type.STRING, description: "Descripción comercial atractiva, enfocada en el usuario final, máximo 20 palabras." },
                            pros: { type: Type.ARRAY, description: "Una lista de 2 a 3 ventajas competitivas o puntos fuertes del producto.", items: { type: Type.STRING } },
                            cons: { type: Type.ARRAY, description: "Una lista de 1 a 2 desventajas o consideraciones importantes a tener en cuenta.", items: { type: Type.STRING } },
                            alibabaSearchKeywords: { type: Type.ARRAY, description: "Lista de 3 a 4 palabras clave técnicas y específicas (en inglés si es posible) para encontrar proveedores en Alibaba.", items: { type: Type.STRING } }
                        },
                        required: ["productName", "description", "pros", "cons", "alibabaSearchKeywords"]
                    }
                }
            },
            required: ["products"]
        };
        
        const systemInstruction = "Actúas como un analista de mercado experto en identificar tendencias en Alibaba. Tu objetivo es encontrar productos 'ganadores' para emprendedores de e-commerce. Para el nicho proporcionado, debes devolver 3 productos que sean novedosos, económicos de importar y con alto potencial de reventa. Sé muy específico y orientado a la acción. Responde únicamente con un objeto JSON que siga estrictamente el esquema proporcionado. No incluyas explicaciones adicionales, solo el JSON.";
        
        const prompt = `Analiza oportunidades en el nicho de mercado: '${niche}'.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: productSchema,
                temperature: 0.8,
            },
        });

        let jsonText = response.text.trim();
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.substring(7);
            if (jsonText.endsWith('```')) {
                jsonText = jsonText.slice(0, -3);
            }
        }
        jsonText = jsonText.trim();
        
        if (!jsonText) {
            console.error("La API de Gemini devolvió una respuesta vacía.", { niche });
            throw new Error('La IA no generó una respuesta. Inténtalo de nuevo.');
        }
        
        let parsedResponse: ProductResponse;
        try {
            parsedResponse = JSON.parse(jsonText);
        } catch(e) {
             console.error("Error al parsear JSON de la IA:", { originalText: response.text, cleanedText: jsonText, error: e });
             throw new Error('La IA devolvió una respuesta con formato inesperado. No se pudo procesar.');
        }

        if (!parsedResponse.products || !Array.isArray(parsedResponse.products) || parsedResponse.products.length === 0) {
           console.error("El JSON parseado no contiene un array de productos válido.", { parsedResponse });
           throw new Error('La IA no devolvió productos en el formato esperado.');
        }
        
        return new Response(JSON.stringify(parsedResponse), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Error en la función serverless:", error);
        const userMessage = error instanceof Error ? error.message : "Un error inesperado ocurrió en el servidor.";
        return new Response(JSON.stringify({ message: userMessage }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
