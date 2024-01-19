<script>
  import Ramo from "./Ramo.svelte";
  let str_data = null;

  if (typeof localStorage !== "undefined") {
    str_data = localStorage.getItem("calc");
  }

  /** @type {Array<import('./calculadora').Ramo>} */
  let data = [{ nombre: "Nuevo Ramo", evaluaciones: [] }];
  console.log(str_data);
  if (str_data !== null) data = JSON.parse(str_data);
</script>

{#each data as ramo}
  <div class="bg-primary">
    <h1>{ramo.nombre}</h1>
    <Ramo evaluaciones={ramo.evaluaciones} />
  </div>
{/each}
