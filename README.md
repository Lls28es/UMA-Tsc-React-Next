Este proyecto fue realizado con la versión 18 de node.

Para instalar una versión actual de [Nodejs](https://nodejs.org/en/download/package-manager)

Instrucciones para instalar [NVM](https://help.dreamhost.com/hc/es/articles/360029083351-Instalar-una-versi%C3%B3n-personalizada-de-NVM-y-Node-js) y usar múltiples versiones de Nodejs.

Para instalar las dependencias del proyecto utilice estos comandos:

```bash
npm install
# or
yarn install
```

Para levantar el proyecto :

```bash
npm run dev
# or
yarn dev
```

Este es el repositorio del proyecto [GitHub repository](https://github.com/Lls28es/UMA-Tsc-React-Next)

Esta es su direccion en la web [Calendario UMA](https://uma-calendar.vercel.app/)

Este proyecto usa :

\* Base de datos [Firebase (documentación)](https://firebase.google.com/docs/firestore/query-data/get-data?hl=es).

\* Librerías y frameworks : [React](https://es.react.dev/), [Nextjs](https://nextjs.org/).

\* Plataforma : [Vercel](https://vercel.com/docs).

Escructura : el proyecto esta compuesto por

\* components: contiene los componentes reutilizables.

\* page :

- /api : contiene las rutas para conectar el sitio con la base de datos
- \_app.tsx : permite utilizar los estilos de la carpeta style en todo el proyecto.
- index.tsx : única página del proyecto.

\* public : contiene el pdf con las instrucciones para el desafío, logos e imágenes del sitio.

\* services : tiene los accesos y configuración para usar la base de dato creada en Firebase.

\* styles : carpeta que contiene las hojas de estilos:

- Basic_FontSize-Medias.scss : estilos font-size, ajusta el tamaño de la letra al tamaño de la pantalla.

- generalStyles.scss : hoja con estilos más usados.

- specificStyles.scss : estilos usados específicamente par éste proyecto.

- mediaQueries.scss : ajuste de los estilos al tamaño de la pantalla.

- react-datepicker.min.css : estilos base de la biblioteca react-day-picker usada para el calendario.
