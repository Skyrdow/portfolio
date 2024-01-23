<script>
  import Ramo from "./Ramo.svelte";

  let str_data = null;
  let current_index = 0;
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    str_data = localStorage.getItem("calc_data");
  }

  /** @type {Array<import('./calculadora').Ramo>} */
  let data = [
    {
      nombre: "Nuevo Ramo",
      evaluaciones: [
        {
          nombre: "",
          nota: 1,
          ponderacion: 0.5,
          es_pendiente: false,
        },
        {
          nombre: "",
          nota: 1,
          ponderacion: 0.5,
          es_pendiente: false,
        },
      ],
    },
  ];

  if (str_data !== null) data = JSON.parse(str_data);

  /**
   * @param {KeyboardEvent} e
   */
  function onKeyDown(e) {
    if (e.key === "s" && e.ctrlKey) {
      // calc_data.set(data);
      localStorage.setItem("calc_data", JSON.stringify(data));
      alert("ramo guardado en ls");
    }
  }

  function add_ramo() {
    data.push({
      nombre: "Nuevo Ramo",
      evaluaciones: [
        {
          nombre: "",
          nota: 1,
          ponderacion: 0.5,
          es_pendiente: false,
        },
        {
          nombre: "",
          nota: 1,
          ponderacion: 0.5,
          es_pendiente: false,
        },
      ],
    });
    current_index = data.length - 1;
    data = data;
  }
  /** @param {Number} index*/
  function remove_ramo(index) {
    data.splice(index, 1);
    data = data;
  }
</script>

<div class="bg-slate-400 p-1 w-fit rounded-lg flex flex-row gap-1 items-center">
  {#each data as ramo, i (i)}
    <div class="bg-slate-100 p-1 w-fit rounded-lg flex flex-row gap-1">
      <button
        class="btn btn-outline btn-xs h-6"
        on:click={() => {
          current_index = i;
        }}>{ramo.nombre}</button
      >
      <button
        class="btn btn-square btn-outline btn-xs h-6"
        on:click={() => {
          remove_ramo(i);
        }}
      >
        <img src="/cross.svg" alt="Delete icon" />
      </button>
    </div>
  {/each}
  <button class="btn btn-square btn-outline btn-xs h-6" on:click={add_ramo}>
    <img src="/plus.svg" alt="Add icon" />
  </button>
</div>

{#key current_index}
  <Ramo ramo={data[current_index]} />
{/key}

<svelte:window on:keydown={onKeyDown} />
