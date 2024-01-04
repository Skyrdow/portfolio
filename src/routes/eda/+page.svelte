<script>
    // @ts-nocheck

    import * as d3 from "d3";
    import { Canvas } from "../chambin";
    import { onMount } from "svelte";

    /// <reference path="types.js" />

    /**@type {SVGElement}*/
    let svgElement;
    let simulation;
    let radius = 50;
    var nodes = [
        { id: 1, name: "Nodo 1" },
        { id: 2, name: "Nodo 2" },
        { id: 3, name: "Nodo 3" },
        { id: 4, name: "Nodo 4" },
        { id: 45, name: "Nodo 45" },
        { id: 6, name: "Nodo 6" },
        { id: 7, name: "Nodo 7" },
    ];

    var links = [
        { source: 1, target: 2 },
        { source: 1, target: 7 },
        { source: 3, target: 4 },
        { source: 45, target: 4 },
        { source: 6, target: 4 },
        { source: 2, target: 3 },
    ];

    // $: Canvas.newNode(svgElement, {x:10,y:5,r:4,label:"a",id:0});
    function asd(radius) {
        // let canva = new Canvas(svgElement);
        
        nodes = [
            { id: 1, name: "Nodo 1" },
            { id: 2, name: "Nodo 2" },
            { id: 3, name: "Nodo 3" },
            { id: 4, name: "Nodo 4" },
            { id: 45, name: "Nodo 45" },
            { id: 6, name: "Nodo 6" },
            { id: 7, name: "Nodo 7" },
        ];

        links = [
            { source: 1, target: 2 },
            { source: 1, target: 7 },
            { source: 3, target: 4 },
            { source: 45, target: 4 },
            { source: 6, target: 4 },
            { source: 2, target: 3 },
        ];

        let svg = d3.select(svgElement);
        if (svg._groups[0][0] === undefined) return;
        let domRect = svgElement.getBoundingClientRect();
        let width = domRect.width;
        let height = domRect.height;

         simulation = d3.forceSimulation(nodes)
            .force(
                "link",
                d3
                    .forceLink(links)
                    .id((d) => d.id)
                    .distance(8 * radius)
                    .strength(2)
                    .iterations(2),
            )
            .force("center", d3.forceCenter().strength(0))
            .force("charge", d3.forceManyBody().strength(0.5));

        svg.attr("viewBox", [-width / 2, -height / 2, width, height]).attr(
            "style",
            "max-width: 100%; height: auto;",
        );
        svg.selectAll("g").remove();
        var link = svg
            .append("g")
            .selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .attr("stroke", "black")
            .attr("marker-end", "url(#arrowhead)");

        var node = svg.append("g")
            .selectAll("g")
            .data(nodes)
            .enter()
            .append("g");

        node.append("circle")
            .attr("r", radius)
            .attr("fill", "white")
            .attr("stroke", "black")
            .attr("stroke-width", 2);

        node.append("text")
            .text((d) => d.name)
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .attr("dy", ".35em");
        // Add a drag behavior.
        node.call(
            d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended),
        );

        simulation.on("tick", () => {
            link.attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y);

            node.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        });
        return svg;
    }
    $: asd(radius);
    onMount(() => {
        asd();
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
</script>

<div class="mx-5 flex justify-center flex-col h-screen">
    <div class="gap-5 drop-shadow-lg flex flex-row">
        <input bind:value={radius} type="range" min="10" />
        <div>{radius}</div>
    </div>
    <svg class="border-4" width="100%" height="90vh" bind:this={svgElement}>
        <defs>
            <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX={10 + radius}
                refY="3.5"
                orient="auto"
                fill="black"
            >
                <polygon points="0 0, 10 3.5, 0 7" />
            </marker>
        </defs>
    </svg>
</div>
