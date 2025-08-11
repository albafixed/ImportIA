
# Alibaba Edge AI

Un asistente de IA futurista para analizar tendencias de mercado en Alibaba y descubrir productos con alto potencial de importación. Selecciona un nicho para obtener una ventaja competitiva.

![Alibaba Edge AI Screenshot](https://i.imgur.com/u7qA1F7.png)

## Arquitectura Segura y Moderna con Vercel

Esta aplicación está construida desde cero pensando en la seguridad y el rendimiento, utilizando una arquitectura de primera clase:

-   **Frontend (Cliente):** Una aplicación de página única (SPA) construida con **React y TypeScript**. Se encarga de renderizar la espectacular interfaz de usuario y de gestionar la interacción del usuario. Se despliega como un sitio estático para un rendimiento global óptimo.

-   **Backend (Servidor):** Una **función *serverless* de Vercel** (`/api/get-recommendations`) escrita en TypeScript. Esta función actúa como un intermediario seguro (proxy) entre el cliente y la API de Google Gemini.

### Flujo de Datos Seguro

1.  El usuario interactúa con la aplicación en su navegador.
2.  Al hacer clic en "Analizar Tendencias", el frontend envía una solicitud `POST` a su propio backend en `/api/get-recommendations`.
3.  La función *serverless*, que se ejecuta en el entorno seguro de Vercel, recibe la solicitud.
4.  **Solo la función *serverless*** tiene acceso a la `API_KEY` de Google Gemini a través de las variables de entorno de Vercel.
5.  La función llama a la API de Gemini, procesa la respuesta y la devuelve al frontend.

Este modelo **previene que la `API_KEY` sea expuesta en el código del navegador**, protegiéndola de cualquier tipo de abuso.

## Despliegue en Vercel (Recomendado)

Para desplegar tu propia instancia de Alibaba Edge AI, sigue estos pasos:

1.  **Fork y Clona el Repositorio:**
    Haz un fork de este proyecto en tu cuenta de GitHub y luego clónalo en tu máquina local.

2.  **Crea un Nuevo Proyecto en Vercel:**
    -   Inicia sesión en tu [cuenta de Vercel](https://vercel.com).
    -   Haz clic en "Add New... > Project".
    -   Importa el repositorio de GitHub que acabas de crear. Vercel detectará automáticamente que es un proyecto de React/Vite.

3.  **Configura la Variable de Entorno (El Paso Más Importante):**
    -   Dentro del panel de tu nuevo proyecto en Vercel, navega a la pestaña **Settings > Environment Variables**.
    -   Añade una nueva variable de entorno:
        -   **Name:** `API_KEY`
        -   **Value:** Pega aquí tu clave de la API de Google Gemini.
    -   Asegúrate de que la variable esté disponible para todos los entornos (Producción, Vista Previa y Desarrollo).

4.  **Despliega:**
    -   Navega a la pestaña **Deployments** de tu proyecto.
    -   Activa un nuevo despliegue (Vercel probablemente ya habrá iniciado uno automáticamente).

¡Listo! Una vez que el despliegue finalice, tu aplicación estará en vivo, accesible a través de la URL de Vercel y utilizando de forma segura tu clave de API.
