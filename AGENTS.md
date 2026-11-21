<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Zuma: reglas permanentes para agentes

Estas reglas se aplican a todo el repositorio. Priorizar la seguridad, la mantenibilidad, la escalabilidad y la calidad del código. Conservar el bloque de instrucciones generado por Next.js y consultar la documentación local de la versión instalada antes de escribir código.

## 1. Stack tecnológico

- Utilizar Next.js con App Router, TypeScript, React, Tailwind CSS y Node.js.
- Utilizar PostgreSQL como base de datos y Supabase exclusivamente como proveedor de PostgreSQL.
- Utilizar Git y GitHub para el control de versiones y Vercel como plataforma de despliegue.
- Drizzle ORM, Zod y las herramientas de pruebas automatizadas son tecnologías propuestas, pendientes de instalación y aprobación expresa del propietario. No tratarlas como dependencias disponibles ni instalarlas sin autorización.

## 2. Arquitectura

Utilizar un monolito modular con separación de responsabilidades:

| Ruta | Responsabilidad |
| --- | --- |
| `src/app` | Páginas, rutas y controladores HTTP. |
| `src/components` | Componentes visuales reutilizables. |
| `src/services` | Lógica y reglas del negocio. |
| `src/repositories` | Acceso a datos. |
| `src/schemas` | Validación de entradas. |
| `src/db` | Modelos y esquemas de base de datos. |
| `src/types` | Tipos e interfaces compartidos. |
| `src/lib` | Infraestructura y servicios compartidos. |
| `src/config` | Configuración de la aplicación. |
| `src/utils` | Funciones auxiliares. |

- Evitar la complejidad innecesaria y crear estas carpetas progresivamente según necesidades reales del proyecto.
- Mantener los controladores HTTP centrados en recibir solicitudes, validar entradas, invocar la lógica del negocio y devolver respuestas.
- Conservar la conexión existente en `src/lib/db.ts`; la separación propuesta no autoriza trasladarla ni reemplazarla.

## 3. Base de datos

- Utilizar PostgreSQL mediante conexiones SQL tradicionales.
- No utilizar Supabase SDK, Supabase Auth ni su API REST.
- Conservar la conexión existente en `src/lib/db.ts`.
- Utilizar el esquema `zuma` para las tablas de la aplicación.
- Utilizar el usuario restringido `zuma_app` para el backend.
- Separar las credenciales administrativas de las credenciales de ejecución. El backend debe usar exclusivamente las credenciales de ejecución con los permisos mínimos necesarios.
- Utilizar consultas parametrizadas; nunca concatenar entradas externas en las consultas SQL.
- Gestionar los cambios estructurales mediante migraciones versionadas.
- No ejecutar migraciones ni modificaciones sobre bases de datos reales sin autorización expresa del propietario.

## 4. Seguridad

- Nunca incorporar credenciales directamente al código.
- Nunca leer, mostrar, registrar ni publicar secretos innecesariamente. No abrir archivos de secretos como `.env.local` durante inspecciones rutinarias.
- Mantener la validación TLS y el certificado CA existentes. No desactivar la verificación del certificado.
- Mantener `server-only` en los módulos de acceso a la base de datos y evitar su importación desde componentes de cliente.
- Validar las entradas externas en el servidor.
- Comprobar autenticación y autorización en todas las operaciones protegidas.
- No exponer errores internos al cliente; devolver mensajes controlados y evitar secretos en los registros de diagnóstico.
- Aplicar el principio de mínimo privilegio.
- No desactivar mecanismos de seguridad para resolver errores.

## 5. Calidad del código

- Utilizar TypeScript estricto y conservar `strict: true`.
- Evitar `any` injustificado.
- Aplicar responsabilidad única, DRY, KISS y YAGNI.
- Utilizar nombres descriptivos y evitar duplicación innecesaria.
- Separar lógica del negocio, presentación y persistencia.
- Evitar dependencias innecesarias.
- No inventar funcionalidades, requisitos ni métodos de bibliotecas; verificar las APIs en la documentación de la versión instalada.
- Incorporar pruebas automatizadas para funcionalidades críticas, respetando la aprobación previa de las herramientas pendientes.
- Verificar la compilación y el análisis estático después de realizar cambios. Informar los comandos ejecutados, sus resultados reales y cualquier comprobación omitida con su motivo.
- Las comprobaciones no autorizan conexiones, migraciones ni modificaciones sobre bases de datos reales. Si una comprobación requiere esas acciones, solicitar autorización antes de ejecutarla.

## 6. Control de versiones

- Utilizar Conventional Commits.
- Mantener cambios pequeños y comprensibles.
- No ejecutar `git commit`, `git push`, operaciones destructivas ni despliegues sin autorización expresa del propietario.
- No modificar archivos ajenos a la tarea solicitada.
- No sobrescribir cambios existentes del usuario; revisar el estado y las diferencias antes de modificar archivos.

## 7. Metodología de trabajo del agente

- Inspeccionar antes de modificar: revisar la estructura, las dependencias y la configuración pertinente sin acceder innecesariamente a secretos.
- Presentar un plan antes de implementar cambios importantes.
- Solicitar autorización para instalar dependencias o modificar la arquitectura.
- No ampliar unilateralmente el alcance de una tarea.
- Explicar las decisiones técnicas importantes.
- Informar qué archivos fueron creados o modificados.
- Informar qué comprobaciones se ejecutaron y sus resultados reales; no afirmar verificaciones que no se realizaron.
- Comunicar errores, riesgos y limitaciones.
- Utilizar español para la comunicación y la documentación técnica propia del proyecto.
