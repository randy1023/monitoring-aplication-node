# Proyecto monitoring-aplication-node

Es una aplicacion de monitoreo con node usando typeScript donde se puede consultar
errores en diferente servicios o el ciclo de vida de los mismos para saber que sucede
en cada cierto tiempo. Se esta usando principios de arquitectura limpia y patron repositorio
para que sea una aplicacion presta a ser mas robusta y escalable como integrar diferentes bases de datos,
usar multiples base de datos en simultanea para guardar y obtener datos sin que sea un proceso complejo de mantener.

# dev

1. Clonar el archivo env.template a .env
2. Configurar las variables de entorno

```
PORT=3000
MAILER_EMAIL=
MAILER_SECRET_KEY=
PROD=false
```

# configurar docker para usar base de datos mongodb y postgres (revisar archivo env.template).

3. Ejecutar el comando `npm install`
4. Ejecutar el comando `docker compose up -d` para levantar las bases de datos
5. Ejecutar el comando `npm run dev`
