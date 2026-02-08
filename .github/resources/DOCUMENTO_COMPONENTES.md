# ESTRUCTURA DE COMPONENTES DEL SOFTWARE

## Portada
**Institución:** SENA  
**Programa:** [Completar]  
**Proyecto:** SWO – Sistema de Gestión de Incidentes y Reportes  
**Documento:** Estructura de Componentes y Elementos HTML  
**Autor:** [Completar]  
**Fecha:** 07 de febrero de 2026

---

## Introducción
Este documento describe con mayor detalle la estructura de componentes del software a desarrollar y los elementos HTML principales que se utilizarán en el diseño frontend. Se explica cómo se distribuyen las responsabilidades entre capas, qué componentes son críticos para el funcionamiento del sistema y cómo se aplica la semántica HTML para lograr una interfaz consistente, accesible y fácil de mantener. Asimismo, se alinea el diseño con las necesidades del negocio: autenticación segura, trazabilidad de incidentes, generación de reportes, administración de usuarios y soporte mediante un asistente virtual.

El enfoque propuesto prioriza la reutilización de componentes, el principio de responsabilidad única y la separación clara entre presentación y lógica de negocio. Esto permite mejorar la mantenibilidad del sistema, disminuir el tiempo de desarrollo de nuevas funcionalidades y facilitar la escalabilidad de la aplicación. A su vez, la selección de elementos HTML se basa en estándares de accesibilidad y semántica, lo que favorece una experiencia de usuario coherente y profesional.

---

## Objetivo
Definir la arquitectura de componentes y los elementos HTML base para el frontend del sistema, asegurando que la interfaz sea consistente, mantenible y alineada con los requisitos del software. Como objetivos específicos se busca:
- Establecer una estructura modular para facilitar el mantenimiento y la escalabilidad.
- Describir la función y alcance de cada componente clave.
- Garantizar el uso de elementos HTML semánticos para mejorar accesibilidad y SEO.
- Asegurar coherencia visual y funcional entre las diferentes pantallas del sistema.
- Documentar las bases para el desarrollo de formularios, listados y paneles de control.
- Detallar la interacción entre componentes para evitar duplicidad de lógica.
- Definir buenas prácticas de nomenclatura y organización del código para el frontend.
- Proveer un marco de referencia para futuras mejoras y expansiones del sistema.

---

## Estructura de componentes
La aplicación se organiza en capas: **Core**, **Shared** y **Features**. Esta separación permite desacoplar la lógica transversal (autenticación, servicios, modelos) de la interfaz visual y de los módulos funcionales. Cada capa se comunica mediante servicios inyectables y contratos de datos definidos en los modelos, evitando dependencias circulares.

Esta arquitectura facilita la evolución del software, permitiendo agregar nuevas funcionalidades sin afectar módulos existentes. Además, ayuda a mantener consistencia en el flujo de datos y en la experiencia del usuario, ya que las decisiones de diseño se centralizan en componentes compartidos.

### 1. Core (infraestructura y servicios)
- **AuthGuard**: Controla el acceso a rutas protegidas. Verifica si el usuario está autenticado y si posee el rol adecuado para acceder a cada vista. Redirige al login cuando no hay sesión válida.
- **AuthService**: Maneja autenticación, sesión y tokens. Incluye validación de credenciales, almacenamiento de la sesión y renovación del token cuando aplica. También expone el estado de autenticación para la interfaz.
- **IncidentsService**: Gestiona la lógica de negocio y consumo de datos de incidentes. Provee métodos para crear, actualizar, consultar, filtrar y cambiar el estado de los incidentes. Centraliza la comunicación con la API.
- **UsersService**: Administra datos y operaciones de usuarios. Permite alta, baja, edición, asignación de roles y consulta de perfiles. Garantiza consistencia de datos y validaciones básicas.
- **NotificationService**: Centraliza mensajes, alertas y notificaciones al usuario. Se usa para mostrar confirmaciones, errores, advertencias y estados de carga.
- **Models**: Interfaces y tipados de datos (incidentes, usuarios, reportes, chatbot). Asegura que los componentes trabajen con estructuras consistentes y reduce errores de integración.

**Importancia de Core:** esta capa actúa como el “motor” del sistema. Aquí se mantiene la lógica compartida que no pertenece a la vista, garantizando seguridad, integridad de datos y consistencia en las operaciones. Toda función crítica se abstrae en servicios para que los componentes visuales sean simples y fáciles de probar.

### 2. Shared (componentes reutilizables)
- **SidebarComponent**: Menú lateral de navegación, visible en vistas principales. Incluye accesos a módulos y resalta la sección activa. Su diseño es consistente en toda la aplicación.
- **Directives/Pipes**: Estandarizan formatos (fechas, estados, filtros). Permiten normalizar estilos y conversiones de datos (por ejemplo, estados “Abierto”, “En proceso”, “Cerrado”).
- **Componentes genéricos** (referencia conceptual): botones reutilizables, tarjetas informativas y contenedores de sección para mantener coherencia visual.

**Beneficio de Shared:** evita repetir código y estilos. La reutilización asegura que todos los módulos compartan la misma identidad visual y comportamiento uniforme, reduciendo errores y tiempo de implementación.

### 3. Features (módulos funcionales)
- **AuthComponent**: Pantalla de inicio de sesión. Incluye formulario de autenticación, validaciones de campos, manejo de errores y navegación segura al panel principal.
- **DashboardComponent**: Vista principal con métricas y accesos rápidos. Presenta indicadores clave, paneles con resúmenes y enlaces directos a incidentes y reportes.
- **IncidentsComponent**: Listado de incidentes con filtros y estado. Permite búsquedas, ordenamientos y segmentación por prioridad, fecha o responsable.
- **IncidentDetailComponent**: Detalle de incidente, historial y acciones. Contiene información completa del caso, registro de cambios, archivos adjuntos y comentarios.
- **ReportsComponent**: Visualización y generación de reportes. Incluye filtros, gráficos y exportación (PDF/Excel) cuando aplique.
- **UsersComponent**: Gestión de usuarios, roles y permisos. Administra perfiles, niveles de acceso y estados de cuenta.
- **ChatbotComponent**: Asistente virtual para soporte y consultas rápidas. Provee respuestas frecuentes, guía de uso y acceso a recursos relevantes.

**Descripción funcional adicional:** cada módulo de Features opera como una unidad independiente que consume servicios del Core. Esto facilita pruebas aisladas y despliegues por iteraciones. Además, permite optimizar la carga de la aplicación mediante rutas específicas y separación lógica por dominios.

---

## Definición de elementos HTML en el frontend
A continuación se listan los elementos HTML principales y su uso previsto en el diseño. La selección se basa en semántica, accesibilidad y buenas prácticas de estructura visual.

### 1. Estructura general
- **`<header>`**: Encabezado del sistema, logo, usuario activo y acciones rápidas (cerrar sesión, perfil).
- **`<nav>`**: Navegación principal o menú lateral con enlaces a módulos, indicando sección activa.
- **`<main>`**: Contenedor central de cada vista; aloja el contenido principal de cada módulo.
- **`<section>`**: Bloques funcionales dentro de las vistas (tarjetas, filtros, listados, paneles de KPIs).
- **`<footer>`**: Información legal, versión del sistema, contacto o soporte.

**Aplicación práctica:** estos elementos son la base del layout general del sistema. Permiten estructurar la interfaz en áreas claras (navegación, contenido y pie de página), facilitando la comprensión del usuario y la adaptación a diferentes tamaños de pantalla.

### 2. Formularios
- **`<form>`**: Formularios de autenticación, creación y edición. Incluye validación de campos obligatorios y mensajes de error.
- **`<label>`**: Etiquetas accesibles para campos. Asociadas con `for` para mejorar usabilidad.
- **`<input>`**: Campos de texto, contraseña, fecha, correo y búsqueda. Configurados con tipos adecuados para validaciones nativas.
- **`<select>`**: Listas desplegables para estados, roles o filtros. Facilitan opciones controladas.
- **`<textarea>`**: Descripción y comentarios de incidentes, con límites de caracteres.
- **`<button>`**: Acciones (guardar, cancelar, enviar, filtrar). Se distingue entre botón primario y secundario.

**Aplicación práctica:** los formularios son esenciales en módulos de autenticación, creación de incidentes y administración de usuarios. Se recomienda incluir mensajes de ayuda, validaciones visibles y feedback inmediato al usuario.

### 3. Tablas y listas
- **`<table>`**, **`<thead>`**, **`<tbody>`**, **`<tr>`**, **`<th>`**, **`<td>`**: Listado de incidentes y usuarios con columnas ordenables y estados resaltados.
- **`<ul>`**, **`<li>`**: Listas de accesos rápidos, notificaciones o acciones contextuales.

**Aplicación práctica:** las tablas son el elemento clave para la visualización de datos estructurados. Las listas se utilizan para mostrar acciones rápidas, actividades recientes o notificaciones.

### 4. Contenedores y layout
- **`<div>`**: Agrupación y organización visual, especialmente para layout y grid.
- **`<article>`**: Elementos independientes como tarjetas de incidentes o reportes.
- **`<aside>`**: Paneles secundarios (ayuda, filtros avanzados, tips de uso).

**Aplicación práctica:** el uso de contenedores bien definidos permite distribuir la información de forma clara y flexible. Los `article` funcionan como tarjetas de resumen y los `aside` son ideales para contenido auxiliar sin interferir con el flujo principal.

### 5. Multimedia y gráficos
- **`<img>`**: Íconos, logos o ilustraciones. Siempre con atributo `alt` descriptivo.
- **`<canvas>`** / **`<svg>`**: Gráficas de reportes y visualizaciones estadísticas.

**Aplicación práctica:** las visualizaciones gráficas son esenciales para reportes y paneles de control. El uso de `svg` permite escalabilidad sin pérdida de calidad y el `canvas` facilita gráficos dinámicos.

### 6. Elementos semánticos adicionales
- **`<strong>`** y **`<em>`**: Énfasis en textos y estados críticos.
- **`<span>`**: Estilos específicos en fragmentos, etiquetas o badges.
- **`<time>`**: Fechas en incidentes y reportes con formato uniforme.

**Aplicación práctica:** estos elementos aportan claridad al contenido textual y ayudan a resaltar información prioritaria, como estados críticos o fechas límite.

---

## Conclusiones
La estructura definida permite un desarrollo modular, escalable y coherente. Al separar Core, Shared y Features se logra un sistema fácil de extender y mantener. El uso adecuado de elementos HTML semánticos garantiza accesibilidad, mejora la organización del contenido y facilita futuras adaptaciones del frontend. Este documento sirve como guía base para el desarrollo y como referencia para asegurar consistencia en las diferentes etapas del proyecto.

En resumen, este esquema ofrece una base sólida para construir el software con buenas prácticas de desarrollo, permitiendo que el equipo trabaje de manera organizada, con componentes reutilizables y un frontend centrado en la experiencia de usuario. Además, la claridad en la definición de elementos HTML asegura que el producto final sea accesible, funcional y alineado con las necesidades de los usuarios finales.
