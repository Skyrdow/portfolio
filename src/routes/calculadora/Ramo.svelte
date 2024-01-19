<script>
  import { calcular_notas_minimas, calcular_promedio } from "./calculadora";

  /** @type {import('./calculadora').Ramo} */
  export let ramo;
  /** @type {Array<import('./calculadora').Evaluacion>} */
  let evaluaciones = ramo.evaluaciones;

  let promedio_simple = false,
    da_ponderacion = true;
  let cantidad = evaluaciones.length,
    cantidad_temp = cantidad,
    min = 1,
    max = 7,
    promedio = 1,
    acumulador_ponderaciones = 0;

  // Calcular el porcentaje para el radial progress
  $: porcentaje_promedio = promedio >= 1 ? ((promedio - 1) * 100) / 6 : 0;

  // Cambiar la cantidad de evaluaciones cuando cambia cantidad
  $: {
    while (evaluaciones.length !== cantidad && cantidad >= 0) {
      if (evaluaciones.length < cantidad) {
        evaluaciones.push({
          nombre: "",
          nota: 1,
          ponderacion: 1 / cantidad,
          es_pendiente: false,
        });
      } else {
        evaluaciones.pop();
      }
    }
    promedio = calcular_promedio(evaluaciones);
  }

  // Recalcular ponderaciones cuando se marca promedio simple
  $: {
    if (promedio_simple) {
      evaluaciones.forEach((item) => {
        item.ponderacion = 1 / cantidad;
      });
      evaluaciones = evaluaciones;
      promedio = calcular_promedio(evaluaciones);
    }
  }

  /**
   * Se ejecuta cuando se hace click al boton de calcular
   */
  function calc() {
    evaluaciones = calcular_notas_minimas(evaluaciones);
    evaluaciones.forEach((item) => {
      item.es_pendiente = false;
    });
  }

  // Revisa si hay al menos 1 nota pendiente
  $: hay_pendientes = !evaluaciones.some((item) => Boolean(item.es_pendiente));

  // Revisa si las ponderaciones suman 1
  $: {
    acumulador_ponderaciones = evaluaciones.reduce(
      (acumulado, objeto) => acumulado + objeto.ponderacion,
      0,
    );
    da_ponderacion = acumulador_ponderaciones === 1;
  }

  // revisar si cantidad no es negativa o sino crashea
  $: cantidad = cantidad_temp > 0 ? cantidad_temp : cantidad;
</script>

<div class="border-[6px] border-slate-200 p-10 rounded-lg">
  <div class="flex flex-row flex-wrap items-center bg-slate-200 h-fit gap-10">
    <div class="flex flex-col p-5 items-center w-72">
      <div class="flex flex-row justify-evenly w-full">
        <label for="cantidad">Cantidad de Evaluaciones: </label>
        <input
          class="w-12 text-center"
          id="cantidad"
          type="number"
          min="1"
          bind:value={cantidad_temp}
        />
      </div>
      <div class="flex flex-row justify-evenly w-full">
        <label for="promedio"> Promedio simple?: </label>
        <input
          id="promedio"
          class="checkbox"
          type="checkbox"
          bind:checked={promedio_simple}
        />
      </div>
    </div>
    <div
      class="flex flex-col gap-2 w-60 tooltip-warning"
      class:tooltip={!da_ponderacion}
      class:tooltip-open={!da_ponderacion}
      data-tip="Las ponderaciones de las notas no suman 1: ({acumulador_ponderaciones.toFixed(
        2,
      )})"
    >
      <p
        class="radial-progress"
        class:text-error={promedio < 4}
        class:text-success={promedio >= 4}
        style="--value:{porcentaje_promedio};--size:10rem;"
      >
        Promedio: {promedio.toFixed(2)}
      </p>
    </div>

    <div
      class="flex flex-col gap-2 w-60 tooltip-warning"
      class:tooltip={hay_pendientes}
      data-tip="No hay suficientes notas pendientes"
    >
      <button class="btn btn-success" disabled={hay_pendientes} on:click={calc}
        >Calcular notas mínimas
      </button>
    </div>
  </div>

  <div class="flex flex-wrap gap-4">
    {#if cantidad != 0}
      {#each [...Array(cantidad).keys()] as i}
        <div
          class="flex flex-col bg-slate-200 p-4 gap-4 w-72 border-2 border-slate-600 rounded-lg"
        >
          <input
            type="text"
            placeholder="Nombre"
            class="input input-sm w-full max-w-xs"
            bind:value={evaluaciones[i].nombre}
          />
          <div class="flex items-center gap-4 place-content-around">
            <label class="grow" for="nota">
              Nota: {evaluaciones[i].nota.toFixed(1)}
            </label>
            <label for="es_pendiente-{i}">Es pendiente?</label>
            <input
              id="es_pendiente-{i}"
              class="checkbox"
              type="checkbox"
              bind:checked={evaluaciones[i].es_pendiente}
              on:click={() => {
                evaluaciones[i].nota = 1;
                evaluaciones[i].es_pendiente = !evaluaciones[i].es_pendiente;
              }}
            />
          </div>
          <input
            id="nota"
            class="range range-sm disabled:range-info disabled:pointer-events-none"
            class:range-warning={evaluaciones[i].nota < 4}
            class:range-error={evaluaciones[i].nota > 7}
            disabled={evaluaciones[i].es_pendiente}
            type="range"
            {min}
            {max}
            step="0.1"
            bind:value={evaluaciones[i].nota}
          />
          {#if !promedio_simple}
            <div class="flex flex-row items-center place-content-evenly">
              <label for="ponderacion-{i}"> Ponderación: </label>
              <input
                type="number"
                class="input input-sm w-20 h-8"
                id="ponderacion-{i}"
                min="0"
                max="1"
                step="0.01"
                bind:value={evaluaciones[i].ponderacion}
              />
            </div>
            <input
              id="ponderacion-{i}"
              class="range range-info range-xs"
              type="range"
              min="0"
              max="1"
              step="0.01"
              bind:value={evaluaciones[i].ponderacion}
            />
          {/if}
        </div>
      {/each}
    {/if}
  </div>
</div>
