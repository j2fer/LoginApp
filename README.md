# LoginApp


## Descripción

Esta aplicacón es un ejemplo básico de caso de uso de login. El objetivo es el desarrollo de una aplicación web progressiva mediante el uso de tecnologías del ecosistema de Javascript. La app debe permitir acceder a uno o varios usuarios con sus credenciales (email y password) y en la siguiente vista mostrar un contador desglosado en días-horas-minutos-segundos con el tiempo que ha transcurrido desde la última vez que accedió el mismo. A su vez, desde dicha vista debe permitir desloguearse de la aplicación. 


### Pantalla inicial

<img alt="login" src="https://github.com/j2fer/LoginApp/blob/master/public/images/Screenshot_1.png" />

La pantalla inicial consta de dos campos de texto para el email y el password y un botón para acceder. Dado que son campos de entrada requieren validación en frontend y su posterior validación en el backend Asímismo se ha añadido un enlace para acceder a un formulario para el registro de un nuevo usuario. 


### Pantalla registro nuevo usuario

<img alt="register" src="https://github.com/j2fer/LoginApp/blob/master/public/images/Screenshot_2.png" />

La pantalla de registro contiene los campos de credenciales y uno adicional para confirmar el password. Como en el caso anterior tiene implementadas las validaciones requeridas. A su vez hay un enlace para acceder a la pantalla inicial de login.


### Pantalla de contador por usuario

<img alt="counter" src="https://github.com/j2fer/LoginApp/blob/master/public/images/Screenshot_3.png" />

Esta pantalla contiene el contador con el cálculo del tiempo transcurrido desde el último acceso por parte del usuario logado y un botón que permite el cierre de la sesión volviendo a la pantalla inicial


### Pop up de instalación de la pwa

<img alt="install" src="https://github.com/j2fer/LoginApp/blob/master/public/images/Screenshot_4.png" />

Se ha añadido un pop up capturando los eventos que permiten la instalación de la pwa para proveerla de una experiencia propia de instalación fuera de la ofrecida por el navegador. 



## Tecnología

La app se ha desarrollado con Nodejs para backend y la infraestructura Express. El frontend se ha desarrollado con HTML5, CSS3, Javascript y sobre éste el framework Jquery.


### Algunas características más

- Se ha añadido seguridad (HTTPS) para desarrollo en local.
- Se ha usado el lenguaje de plantillas EJS de Express que permite tener el código HTML como tal y por lo tanto no es necesario un compilado posterior a HTML que reduciría el rendimiento.
- El service worker cachea en el navegador todos los ficheros estáticos permitiendo un mejor rendimiento y la posibilidad de servir la página sin conexión.
- Los test se encuentran en el fichero testLogin.js y han sido realizados con "mocha" y "chai".
- El desarrollo como pwa ha sido dirigido por los informes pestaña Lighthouse del devtools de chrome.
- El almacenamiento y consulta de las credenciales de usuario se realiza en el fichero users.json. 
- Los iconos que aparecen en la aplicación corresponden a una familia de fuentes creada para la aplicación. Ésto permite la modificación de la apariencia de esos iconos por css como si de fuentes se tratase.



## Ejecución

```bash

npm start               // run app

mocha testLogin.js      // test app

```

Asímismo la la app se puede probar en Heroku. [Heroku app](https://j2fer-login-app.herokuapp.com/)

Para probar la aplicación basta con registrar un nuevo usuario o bien modificar manualmente el fichero users.json



## Autor

Esta app ha sido desarrollada por José Javier Fernández Juárez. [GitHub page](https://github.com/j2fer)
