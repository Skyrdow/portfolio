<script>
  import { calcular_notas_minimas, calcular_promedio } from "./calculadora";

  /** @type {Array<import('./calculadora').Evaluacion>} */
  let evaluaciones = []
  let promedio_simple = true;
  let cantidad = 2, min = 1, max = 7, promedio = 0;
  $: evaluaciones = Array.from({length:cantidad}, () => ({nota:1, ponderacion:1/cantidad, es_pendiente: false}));
  $: promedio = calcular_promedio(evaluaciones);
  function check_promedio() {
    promedio_simple = !promedio_simple;
    if (promedio_simple) {
      evaluaciones.forEach((item) => {item.ponderacion = 1/cantidad})
      promedio = calcular_promedio(evaluaciones);
    }
  }

</script>

<div class="border-[6px] border-slate-200 p-10 rounded-lg">
<div class="flex flex-row bg-slate-200">
  <label class="p-5 flex">Cantidad de Evaluaciones
    <input type="number" bind:value={cantidad}>
  </label>

  <p>Promedio: {promedio.toFixed(2)}</p>

  <label>
    Promedio simple?: 
    <input type="checkbox" on:click={check_promedio}>
  </label>
</div>
  
  <div class="flex flex-col">
    {#if cantidad != 0}
      {#each [...Array(cantidad).keys()] as i }
      <label class="bg-slate-200 p-4">
        Nota
        <input type="range" min="{min}" max="{max}" bind:value={evaluaciones[i].nota}>
        <p>{evaluaciones[i].nota}</p>
      </label>
      {#if !promedio_simple}
        
        <label class="bg-slate-200 p-4">
          Ponderación
          <input type="range" min="0" max="1" step="0.01" bind:value={evaluaciones[i].ponderacion}>
          <p>{evaluaciones[i].ponderacion}</p>
        </label>
      {/if}
      {/each}
    {/if}
  </div>
</div>
