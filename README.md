# Tu Asistente de Importación IA

Analiza las últimas tendencias en Alibaba y descubre productos novedosos con alto potencial. Selecciona un nicho para recibir recomendaciones de artículos económicos y fáciles de importar.

## Arquitectura Vercel

Esta aplicación utiliza una arquitectura moderna y segura, ideal para producción:

-   **Frontend:** Una aplicación de página única (SPA) construida con React y TypeScript, que se encarga de la interfaz de usuario.
-   **Backend:** Una función *serverless* de Vercel (`/api/recommendations`) escrita en TypeScript. Esta función actúa como un proxy seguro que recibe las solicitudes del frontend.

El frontend **nunca** tiene acceso directo a la clave de la API de Gemini. En su lugar, solicita recomendaciones a nuestra función *serverless*. Esta función, que se ejecuta en el entorno seguro de Vercel, es la única que tiene la clave de la API y está autorizada para comunicarse con Google.

Este enfoque protege tu clave de API de ser expuesta en el navegador.

## Despliegue en Vercel

Para desplegar esta aplicación, sigue estos pasos:

1.  **Crea un repositorio en GitHub/GitLab/Bitbucket** con el código de este proyecto.
2.  **Crea un nuevo proyecto en Vercel:** Inicia sesión en tu cuenta de Vercel e importa el repositorio que acabas de crear.
3.  **Configura las Variables de Entorno:**
    -   En el panel de tu proyecto de Vercel, ve a **Settings > Environment Variables**.
    -   Añade una nueva variable:
        -   **Name:** `API_KEY`
        -   **Value:** Pega tu clave de la API de Google Gemini aquí.
    -   Asegúrate de que la variable esté disponible para todos los entornos (Producción, Vista Previa y Desarrollo).
4.  **Despliega:** Vuelve al panel de despliegues y activa un nuevo despliegue. Vercel construirá automáticamente el frontend y la función *serverless*.

Una vez desplegada, la aplicación será accesible a través de la URL proporcionada por Vercel y utilizará de forma segura la clave de API que has configurado.