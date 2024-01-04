<script>
    import * as d3 from "d3";
    import { Canvas } from "../chambin";
    import { onMount } from "svelte";

    /**@type {SVGElement}*/
    let svgElement;
    let simulation;
    // $: Canvas.newNode(svgElement, {x:10,y:5,r:4,label:"a",id:0});

    onMount(() => {
        // let canva = new Canvas(svgElement);
        var nodes = [
            { id: 1, name: "Nodo 1"},
            { id: 2, name: "Nodo 2"},
            { id: 3, name: "Nodo 3"},
            { id: 4, name: "Nodo 4"},
            { id: 45, name: "Nodo 45"},
            { id: 6, name: "Nodo 6"},
            // ... más nodos
        ];

        var links = [
            { source: 1, target: 2 },
            { source: 2, target: 3 },
            { source: 3, target: 4 },
            { source: 45, target: 4 },
            { source: 6, target: 4 },
            // ... más conexiones
        ];

        var svg = d3.select(svgElement),
            width = +svg.attr("width"),
            height = +svg.attr("height");
        svg
            .attr("viewBox", [-width/2, -height/2, width, height])
            .attr("style", "max-width: 100%; height: auto;");

        simulation = d3
            .forceSimulation(nodes)
            .force(
                "link",
                d3.forceLink(links).id((d) => d.id),
            ).force("center", d3.forceCenter()).force("charge", d3.forceManyBody());

        var link = svg
            .append("g")
            .selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .attr("stroke", "red").attr("marker-end", "url(#arrowhead)");

        var node = svg
            .append("g")
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r", 5);

  // Add a drag behavior.
  node.call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

        simulation.on("tick", () => {
            link.attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y);

            node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
        });


  // Reheat the simulation when drag starts, and fix the subject position.
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  // Update the subject (dragged node) position during drag.
  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  // Restore the target alpha so the simulation cools after dragging ends.
  // Unfix the subject position now that it’s no longer being dragged.
  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }


    });
</script>

<div class="m-5 flex justify-center">
    <svg
        class="border-4"
        width="500"
        height="500"
        bind:this={svgElement}
    >
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
