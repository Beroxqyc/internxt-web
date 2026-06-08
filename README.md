# Internxt-web

Es un proyecto de realización de un ejercicio de prueba técnica, que consiste en construir una interfaz web que simule un gestor de archivos sencillo con varios funcionalidades.

## Instrucciones para ejecutar el proyecto
1. Situarse dentro del directorio internxt-web.
2. Ejecutar "npm install", para instalar las dependencias necesarias.
3. Ejecutar "npm run dev -- --host", accede a localhost:5173 en navegador para acceder a la web y para probar su funcionalidad en el móvil seria acceder a ipOrdenador:5173 en navegador del movil.

## Decisiones técnicas tomadas
* Como herramientas he elegido desarrollar con React + Vite. He seleccionado Vite como empaquetador porque es recomendado para proyectos de React por su mayor velocidad en cosas como arranque de servidor, Hot Reload y el proceso de build comparando con el Create React App, puesto que usa ES Modules nativos del navegador durante el desarrollo y que solo procesa los módulos que realmente se solicitan.
* He estructurado y he dividido la interfaz en componentes para facilitar la modificación de componentes por separado y la reutilización de estos módulos para otros proyectos.
* He utilizado tailwindcss porque permite implementar funcionalidades como el dark mode de manera más limpiar y sencilla y esta integrado dentro de los módulos de los componenetes, sin necesidad de tener muchos ficheros css comparando con el uso del css nativo.

## Posibles mejoras con más tiempo
Si tuviera más se podria implementar más funcionalidades como Drag & Drop para subir archivos y Preview de imagenes al hacer el clic. También se podria mejorar algunos detalles como mejorar la distribución de los botones en vista móvil, corregir errores como la inconsistencia en los formatos de fecha.

## Link al demo
https://internxt-web.vercel.app/