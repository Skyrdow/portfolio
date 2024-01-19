<script>
  import { calcular_notas_minimas, calcular_promedio } from "./calculadora";

  /** @type {Array<import('./calculadora').Evaluacion>} */
  let evaluaciones = [];

  let promedio_simple = false;
  let cantidad = 2,
    min = 1,
    max = 7,
    promedio = 0;

  $: {
    while (evaluaciones.length !== cantidad) {
      if (evaluaciones.length < cantidad) {
        evaluaciones.push({
          nota: 1,
          ponderacion: 1 / cantidad,
          es_pendiente: false,
        });
      } else {
        evaluaciones.pop();
      }
    }
  }

  $: promedio = calcular_promedio(evaluaciones);
  $: {
    if (promedio_simple) {
      evaluaciones.forEach((item) => {
        item.ponderacion = 1 / cantidad;
      });
      evaluaciones = evaluaciones;
      promedio = calcular_promedio(evaluaciones);
    }
  }

  function calc() {
    if (!evaluaciones.some((item) => Boolean(item.es_pendiente))) {
      alert("No hay notas pendientes");
      return;
    }
    evaluaciones = calcular_notas_minimas(evaluaciones);
  }
</script>

<div class="border-[6px] border-slate-200 p-10 rounded-lg">
  <div class="flex flex-row bg-slate-200 h-fit gap-10">
    <label class="p-5 flex"
      >Cantidad de Evaluaciones
      <input type="number" bind:value={cantidad} />
    </label>

    <p>Promedio: {promedio.toFixed(2)}</p>

    <label>
      Promedio simple?:
      <input type="checkbox" bind:checked={promedio_simple} />
      {promedio_simple}
    </label>

    <button class="bg-green-700 rounded-lg p-5" on:click={calc}
      >Calcular notas minimas
    </button>
  </div>

  <div class="flex flex-col">
    {#if cantidad != 0}
      {#each [...Array(cantidad).keys()] as i}
        <label class="bg-slate-200 p-4">
          Nota
          <input
            type="range"
            {min}
            {max}
            step="0.1"
            bind:value={evaluaciones[i].nota}
          />
          <p>{evaluaciones[i].nota.toFixed(1)}</p>
        </label>
        {#if !promedio_simple}
          <label class="bg-slate-200 p-4">
            Ponderación
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              bind:value={evaluaciones[i].ponderacion}
            />
            <p>{evaluaciones[i].ponderacion}</p>
          </label>
        {/if}
        <label class="bg-slate-200 p-4"
          >Es pendiente? <input
            type="checkbox"
            bind:checked={evaluaciones[i].es_pendiente}
          /></label
        >
      {/each}
    {/if}
  </div>
</div>
