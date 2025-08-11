# Tu Asistente de Importación IA

Analiza las últimas tendencias en Alibaba y descubre productos novedosos con alto potencial. Selecciona un nicho para recibir recomendaciones de artículos económicos y fáciles de importar.

## ¿Por qué la pantalla se ve solo azul?

La aplicación ha sido configurada para desplegarse en Vercel, utilizando funciones _serverless_ (en la carpeta `/api`) para proteger tu clave de API de Gemini. Esto significa que **no puedes simplemente abrir el archivo `index.html` en tu navegador** para que funcione.

Para que la aplicación se ejecute correctamente en tu máquina local, necesitas un entorno que simule el comportamiento de Vercel. La forma más sencilla de hacerlo es usando la propia Interfaz de Línea de Comandos (CLI) de Vercel.

## Cómo ejecutar la aplicación localmente

Sigue estos pasos para levantar un servidor de desarrollo local.

### Prerrequisitos

1.  **Node.js**: Asegúrate de tener Node.js instalado. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
2.  **Vercel CLI**: Instala la CLI de Vercel globalmente en tu sistema ejecutando este comando en tu terminal:
    ```bash
    npm install -g vercel
    ```

### Configuración del Proyecto

1.  **Inicia sesión en Vercel**:
    ```bash
    vercel login
    ```

2.  **Vincula tu proyecto**: Desde la carpeta raíz de tu proyecto, ejecuta:
    ```bash
    vercel link
    ```
    Sigue las instrucciones para vincular tu directorio local a un nuevo proyecto en Vercel.

3.  **Configura tu Clave de API**: Añade tu clave de API de Gemini como una variable de entorno en tu proyecto de Vercel. **Este es el paso más importante para que la IA funcione.**
    ```bash
    vercel env add API_KEY
    ```
    Cuando te lo pida, pega tu clave de API y presiona Enter. Asegúrate de aplicarla a los entornos de "Production", "Preview" y "Development".

### Ejecutar el Servidor de Desarrollo

1.  **Instala las dependencias**:
    ```bash
    npm install
    ```

2.  **Inicia el servidor**: Una vez que el proyecto esté vinculado y la clave de API configurada, ejecuta:
    ```bash
    npm run dev
    ```

3.  **¡Listo!** Vercel iniciará un servidor local (generalmente en `http://localhost:3000`). Abre esa dirección en tu navegador. Ahora la aplicación debería funcionar perfectamente, incluyendo las llamadas a la IA.

## Despliegue en Producción

Cuando estés listo para subir tu aplicación a la web, simplemente ejecuta:

```bash
npm run deploy
```
