export { calcular_notas_minimas, calcular_promedio };

/**
 * @typedef Evaluacion
 * @property {String} nombre
 * @property {Number} nota
 * @property {Number} ponderacion
 * @property {boolean} es_pendiente
 */
/**
 * @typedef Ramo
 * @property {String} nombre
 * @property {Array<Evaluacion>} evaluaciones
 */

/**
 *
 * @param {Array<Evaluacion>} evaluaciones
 */
function calcular_notas_minimas(evaluaciones) {
  if (!evaluaciones.some((item) => item.es_pendiente)) {
    return evaluaciones;
  }
  while (calcular_promedio(evaluaciones) <= 4) {
    for (let i = 0; i < evaluaciones.length; i++) {
      if (evaluaciones[i].es_pendiente) {
        evaluaciones[i].nota += 0.1;
      }
    }
  }
  return evaluaciones;
}

/**
 *
 * @param {Array<Evaluacion>} notas
 */
function calcular_promedio(notas) {
  let promedio = 0;
  notas.map(({ nota, ponderacion }) => {
    promedio += ponderacion * nota;
  });
  return promedio;
}
