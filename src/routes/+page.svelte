<script>
  import Proyecto from "./proyecto.svelte";
  const malla = [
    {
      nivel: 1,
      cursos: [
        {
          nombre: "CÁLCULO I PARA INGENIERÍA",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "ÁLGEBRA I PARA INGENIERÍA",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "FÍSICA I PARA INGENIERÍA",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "INTRODUCCIÓN AL DISEÑO EN INGENIERÍA",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "INGENIERÍA Y SOSTENIBILIDAD",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
      ],
    },
    {
      nivel: 2,
      cursos: [
        {
          nombre: "CÁLCULO II PARA INGENIERÍA",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "ÁLGEBRA II PARA INGENIERÍA",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "FÍSICA II PARA INGENIERÍA",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "FUNDAMENTOS DE PROGRAMACIÓN PARA INGENIERÍA",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "INTRODUCCIÓN A LA INGENIERÍA INFORMÁTICA",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "FUNDAMENTOS DE COMPUTACIÓN",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
      ],
    },
    {
      nivel: 3,
      cursos: [
        {
          nombre: "INGLÉS I",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "CÁLCULO III PARA INGENIERÍA",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "FUNDAMENTOS DE ECONOMÍA PARA INGENIERÍA",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "ELECTRICIDAD, MAGNETISMO Y ONDAS",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "ESTRUCTURA DE DATOS",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "DISEÑO DE ALGORITMOS",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
      ],
    },
    {
      nivel: 4,
      cursos: [
        {
          nombre: "INGLÉS II",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "TALLER DE DISEÑO EN INGENIERÍA",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "ECUACIONES DIFERENCIALES Y MÉTODOS NUMÉRICOS",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "DISEÑO DE BASES DE DATOS",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "ARQUITECTURA DE COMPUTADORES",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "PARADIGMAS DE PROGRAMACIÓN",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
      ],
    },
    {
      nivel: 5,
      cursos: [
        {
          nombre: "INGLÉS III",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "ESTADÍSTICA COMPUTACIONAL",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "TEORÍA DE LA COMPUTACIÓN",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "SISTEMAS OPERATIVOS",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "FUNDAMENTOS DE INGENIERÍA DE SOFTWARE",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "TALLER DE PROGRAMACIÓN",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
      ],
    },
    {
      nivel: 6,
      cursos: [
        {
          nombre: "INGLÉS IV",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "ESTADÍSTICA INFERENCIAL",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "BASE DE DATOS AVANZADAS",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "PROCESAMIENTO DE SEÑALES E IMÁGENES",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: "psi",
        },
        {
          nombre: "TÉCNICAS DE INGENIERÍA DE SOFTWARE",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "EVALUACIÓN DE PROYECTOS",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
      ],
    },
    {
      nivel: 7,
      cursos: [
        {
          nombre: "MODELOS Y SIMULACIÓN",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "MÉTODOS DE OPTIMIZACIÓN",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "REDES DE COMUNICACIÓN",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "GESTIÓN DE PROYECTOS TI",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "INNOVACIÓN Y EMPRENDIMIENTO",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "FORMACIÓN INTEGRAL I",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
      ],
    },
    {
      nivel: 8,
      cursos: [
        {
          nombre: "ANÁLISIS DE DATOS",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "CIBERSEGURIDAD",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "SISTEMAS DISTRIBUIDOS Y PARALELOS",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "PROYECTO DE INGENIERÍA DE SOFTWARE",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "FORMACIÓN INTEGRAL II",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "GESTIÓN DE SERVICIOS TI",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
      ],
    },
    {
      nivel: 9,
      cursos: [
        {
          nombre: "APRENDIZAJE AUTOMÁTICO",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "TÓPICO DE ESPECIALIDAD I",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "TÓPICO DE ESPECIALIDAD II",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "GOBERNANZA Y GESTION TI",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "ELECTIVO I",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
      ],
    },
    {
      nivel: 10,
      cursos: [
        {
          nombre: "SEMINARIO DE INFORMÁTICA",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "TÓPICO DE ESPECIALIDAD III",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "TÓPICO DE ESPECIALIDAD IV",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "ELECTIVO INTERDISCIPLINARIO",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
        {
          nombre: "ELECTIVO II",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
      ],
    },
    {
      nivel: 11,
      cursos: [
        {
          nombre: "TRABAJO DE TITULACIÓN",
          descripcion:
            "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
          link: undefined,
        },
      ],
    },
  ];
</script>

<div class="flex flex-col gap-10">
  {#each malla as semestre}
    <h1 class="text-center text-xl">Nivel {semestre.nivel}</h1>
    <div class="flex flex-row overflow-x-scroll gap-10 p-10">
      {#each semestre.cursos as curso}
       {#if curso.link != undefined}
        <Proyecto {...curso}></Proyecto>
       {/if}
      {/each}
    </div>
  {/each}
</div>
