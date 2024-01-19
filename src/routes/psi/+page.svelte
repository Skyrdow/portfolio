<script>
  import * as d3 from "d3";
  import { Canvas } from "../chambin";
  import { onMount } from "svelte";

  /**@type {SVGElement}*/
  let svgElement;

  // $: Canvas.newNode(svgElement, {x:10,y:5,r:4,label:"a",id:0});

  onMount(() => {
    const svg = d3.select(svgElement);
    const width = svgElement.clientWidth;
    const height = svgElement.clientHeight;
    const x = d3
      .scaleLinear()
      .domain([-width / 2, width / 2])
      .range([0, width]);
    const y = d3
      .scaleLinear()
      .domain([height / 2, -height / 2])
      .range([0, height]);

    const g = svg.append("g");
    // Ejes
    g.append("g")
      .attr("transform", `translate(0,${y(0)})`)
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("transform", `translate(${x(0)},0)`)
      .call(d3.axisLeft(y));

    svg.on("mousedown", function (event) {
      const [xPos, yPos] = d3.pointer(event);
      drawArrow(xPos, yPos);
    });

    /**
     * @function dibuja una flecha desde el 0,0 hasta el punto de entrada
     * @param {Number} xPos
     * @param {Number} yPos
     */
    function drawArrow(xPos, yPos) {
      // Elimina la flecha anterior
      g.selectAll(".arrow").remove();
      // Dibuja la nueva flecha
      g.append("line")
        .attr("class", "arrow")
        .attr("x1", width / 2)
        .attr("y1", height / 2)
        .attr("x2", xPos)
        .attr("y2", yPos)
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrowhead)"); // Asegúrate de definir el marcador de flecha en el SVG
    }
  });
</script>

<div class="m-5 flex justify-center">
  <svg class="border-4 w-1/3 aspect-square" width="500" bind:this={svgElement}>
    <defs>
      <marker
        id="arrowhead"
        markerWidth="10"
        markerHeight="7"
        refX="8.5"
        refY="3.5"
        orient="auto"
        fill="red"
      >
        <polygon points="0 0, 10 3.5, 0 7" />
      </marker>
    </defs>
  </svg>
</div>
