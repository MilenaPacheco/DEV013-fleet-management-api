/**
 * @swagger
 * /taxis:
 *   get:
 *     summary: Obtener taxis
 *     description: Obtiene una lista de taxis con paginación.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número de página para la paginación
 *         example: 1
 *         default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número de elementos por página
 *         example: 10
 *         default: 10
 *     responses:
 *       200:
 *         description: Una lista de taxis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   taxi_id:
 *                     type: integer
 *                     example: 6418
 *                   plate:
 *                     type: string
 *                     example: "FHEE-8646"
 *       400:
 *         description: Parámetros de paginación inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Parámetros de paginación inválidos
 *       404:
 *         description: No se encontraron resultados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No se encontraron taxis en la base de datos
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error de Conexión
 */

/**
 * @swagger
 * /taxis/{id}:
 *   get:
 *     summary: Obtener información de un taxi
 *     description: Obtiene información de un taxi específico por su ID o placa.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID o placa del taxi
 *         example: "FHEE-8646"
 *     responses:
 *       200:
 *         description: Información del taxi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 taxi_id:
 *                   type: integer
 *                   example: 6418
 *                 plate:
 *                   type: string
 *                   example: "FHEE-8646"
 *       400:
 *         description: Parámetros inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Se requiere proporcionar un ID o placa válida
 *       404:
 *         description: No se encontraron resultados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No se encontró ningún taxi con los datos proporcionados
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error de Conexión
 */


/**
 * @swagger
 * /trajectories:
 *   get:
 *     summary: Obtener trayectorias
 *     description: Obtiene trayectorias de taxis según taxiId y fecha
 *     parameters:
 *       - in: query
 *         name: taxiId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del taxi
 *         example: "1"
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Fecha de las trayectorias
 *         example: "2023-01-02"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número de página para la paginación
 *         example: 1
 *         default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número de elementos por página
 *         example: 10
 *         default: 10
 *     responses:
 *       200:
 *         description: Una lista de trayectorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                     example: 11.0
 *                   longitude:
 *                     type: number
 *                     example: 21.0
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-01-02T10:00:00.000Z"
 *       400:
 *         description: Parámetros de consulta inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Parámetros de paginación inválidos
 *       404:
 *         description: No se encontraron resultados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No se encontraron resultados en la búsqueda
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error de Conexión
 */

/**
 * @swagger
 * /trajectories/last/{id}:
 *   get:
 *     summary: Obtener la última trayectoria de un taxi
 *     description: Obtiene la última trayectoria de un taxi específico por su ID o placa.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID o placa del taxi
 *         example: "FHEE-8646"
 *     responses:
 *       200:
 *         description: Última trayectoria del taxi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 taxi_id:
 *                   type: integer
 *                   example: 1
 *                 latitude:
 *                   type: number
 *                   example: 11.0
 *                 longitude:
 *                   type: number
 *                   example: 21.0
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-01-02T10:00:00.000Z"
 *       400:
 *         description: Parámetros inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Proporcione un ID o placa de taxi
 *       404:
 *         description: No se encontraron resultados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No se encontraron resultados en la búsqueda
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error de Conexión
 */

/**
 * @swagger
 * /trajectories/last:
 *   get:
 *     summary: Obtener las últimas trayectorias de todos los taxis
 *     description: Obtiene las últimas trayectorias de todos los taxis con paginación.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número de página para la paginación
 *         example: 1
 *         default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número de elementos por página
 *         example: 10
 *         default: 10
 *     responses:
 *       200:
 *         description: Una lista de las últimas trayectorias de los taxis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   taxi_id:
 *                     type: integer
 *                     example: 1
 *                   latitude:
 *                     type: number
 *                     example: 11.0
 *                   longitude:
 *                     type: number
 *                     example: 21.0
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-01-02T10:00:00.000Z"
 *       400:
 *         description: Parámetros de paginación inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Parámetros de paginación inválidos
 *       404:
 *         description: No se encontraron resultados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No se encontraron resultados en la búsqueda
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error de Conexión
 */

