# News Explorer API (Backend)

API RESTful desarrollada como parte del proyecto final de TripleTen. Proporciona los servicios de autenticación de usuarios, gestión de perfiles y almacenamiento de artículos de noticias.

## 🌐 Enlace de Producción

- URL de la API: https://api.pablo-news.chickenkiller.com

## 🛠️ Tecnologías y Stack

- Runtime: Node.js (v20 gestionado vía NVM)
- Framework: Express.js
- Base de datos: MongoDB (v7.0) & Mongoose
- Gestión de procesos: PM2
- Servidor web / Proxy reverso: Nginx con certificado SSL (Certbot)
- Seguridad y Validación: JWT, bcryptjs, Celebrate / Joi

## 🚀 Funcionalidades Principales

- Autenticación segura (Registro y Login).
- Gestión de usuarios (Consulta y actualización de perfil).
- Gestión de artículos (Guardar, consultar y eliminar favoritos).
- Validación estricta de esquemas y manejo centralizado de errores.

## ⚙️ Configuración y Despliegue Local (Desarrollo)

1. Instala las dependencias usando el comando: npm install
2. Crea tu archivo .env con tu PORT, MONGO_URI y JWT_SECRET.
3. Levanta el servidor con: npm run dev
