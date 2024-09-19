- Se crea la app con npm create vite@latest
- Se eliminan los archivos por defecto de la app {.css, logo, codigo dentro de app.jsx, states, etc}
- Se intala el framework css {tailwind} -> npm i -D tailwindcss postcss autoprefixer {todas son dependencias Dev}, luego:
se instala npx tailwindcss init -p {para crear archivos de configuracion de tailwind (tailwind.config.js / postcss.config.js), indicar donde va a escanear los archivos que contengan tailwind}
- Se importan @tailwind base -@tailwind components y @tailwind utilities en INDEX.CSS para usar los estilos tailwind
- Se instala y configura el router - react-router-dom en App.jsx- ahi ya se crea la estructura 
- En el grupo de Rutas se crea un Master Page que es donde va a contener las paginas. Comparten el diseño del master page y cada pagina tiene su diseño
- Se crea el html y estilos de cada pagina (alertas, validaciones, etc)
- Se instala Axios {npm i axios} para comunicar frontend y backend- es una libreria mas facil de usar que el metodo nativo fetch y se instala cors desde el BACKEND para configurar los dominios que pueden acceder al servidor
- Se instala NODEMAILER para envio de emails y mailtrap o similares para probar/testear el envio. En mailtrap se integra con node.js - nodemailer. LA CONFIGURACION SE HACE EN EL BACKEND
- Se toma el token de la URL y se envia hacia el backend, siempre a traves del frontend sin usar la url del backend directamente
-Tomamos el token de la URL y lo enviamos hacia el backend
//Usamo useEffect para ejecutar la confirmacion una vez cargado el componente: esto hara que se ejecute el codigo del controlador el cual elimina el token y cambia confirmado a true. De esta forma el token no puede volver a usarse
- Variables de entorno en frontend se usa VITE_ + nombre de variable. y luego se accede con:

 {IMPORT.META.ENV + NOMBRE VARIABLE} en minusculas...

 a diferencia de backend que usa .env y process.env con la dependencia .dotenv. EN VITE ya esta integrado el 'wather' de variables de entorno, no tiene que instalar el .dotenv como en backend. Pero las variables deben comenzar con VITE_
- Creamos el archivo .env en la raiz del proyecto no en src y declaramos las variables de entorno. Urls
- Creamos un cliente Axios para acortar las rutas de URL. Este componente ya va a importar axios por lo que el codigo en los componente se ahorra el import. Creamos en src la carpeta config y ahi creamos axios.jsx
- Nos aseguramos que ninguna ruta este explicita en la app. todas deben ser variables de entorno
- Para obtener la respuesta de una peticion al servidor con try catch se hace capturando el objeto respuesta en una constante. Eje const response = await {...codigo peticion/ clienteAxios.post(---- etc)} luego podemos extraer {data.msg}
- CONTEXT es para tener acceso a funciones, props o valores en toda la app. La autenticacion es un buen lugar para usar context. Creamos una nueva carpeta en src / context
- Se crea un CUSTOM HOOK para EXTRAER los datos del provider. Se crea una carpeta hook en src y el hook {por convencion se llaman useNombreDelHook}
- Una vez un usuario esta autenticado, se va a usar el token generado y almacenado en localStorage para proteger las rutas de App y que el user autenticado pueda ver su perfil. Aca es donde se aplica el Bearer token configurado en el backend. El frontend va a ENVIAR una peticion con el HEADER( que incluye el TOKEN) al BACKEND. Esto lo hacemos en el componente AuthProvider porque es quien tiene el contexto que rodea toda la App. Desde el componente login vamos a usar setAtuh para guardar la respuesta del back que tiene los datos del usuario. De esta manera el Provider tendra los datos suficientes que usa RutaProtegida para renderizarse.
- Se crean las vistas de los pacientes usando un componente aparte.