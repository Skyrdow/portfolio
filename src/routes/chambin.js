import * as d3 from "d3";

/// <reference path="types.js" />

export class Canvas {
  /**
   * @constructor
   * @param {SVGElement} svgElement
   */
  constructor(svgElement) {
    this.svgElement = svgElement;
    this.svg = d3.select(svgElement);
    /** @type {Array<object>} */
    this.nodes = [];
    /** @type {d3.Simulation<d3.SimulationNodeDatum, undefined>} */
    this.simulation;
    this.radius = 50;
    this.nodes = [
      { index: 1, name: "Nodo 1" },
      { index: 2, name: "Nodo 2" },
      { index: 3, name: "Nodo 3" },
      { index: 4, name: "Nodo 4" },
      { index: 45, name: "Nodo 45" },
      { index: 6, name: "Nodo 6" },
      { index: 7, name: "Nodo 7" },
    ];

    this.links = [
      { source: 1, target: 2 },
      { source: 1, target: 7 },
      { source: 3, target: 4 },
      { source: 45, target: 4 },
      { source: 6, target: 4 },
      { source: 2, target: 3 },
    ];
  }

  /**
   * Crea un nodo nuevo
   * @param {Circle} circle
   * @returns {any}
   */
  newNode(circle) {
    this.svg
      .append("circle")
      .attr("cx", circle.x)
      .attr("cy", circle.y)
      .attr("r", circle.r)
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-width", 1);
  }

  /**@param {Number} radius */
  newGraph(radius) {
    ///@ts-expect-error
    if (this.svg._groups[0][0] === undefined) return;

    let domRect = this.svgElement.getBoundingClientRect();
    let width = domRect.width;
    let height = domRect.height;

    this.simulation = d3
      .forceSimulation(this.nodes)
      .force(
        "link",
        d3
          .forceLink(this.links)
          //@ts-ignore
          .id((d) => d.index)
          .distance(8 * radius)
          .strength(2)
          .iterations(2),
      )
      .force("center", d3.forceCenter().strength(0.5))
      .force("charge", d3.forceManyBody().strength(1));

    let simulation = this.simulation;

    this.svg
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");
    this.svg.selectAll("g").remove();
    var link = this.svg
      .append("g")
      .selectAll("line")
      .data(this.links)
      .enter()
      .append("line")
      .attr("stroke", "black")
      .attr("marker-end", "url(#arrowhead)");

    var node = this.svg
      .append("g")
      .selectAll("g")
      .data(this.nodes)
      .enter()
      .append("g");

    node
      .append("circle")
      .attr("r", radius)
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    node
      .append("text")
      //@ts-ignore
      .text((datum) => datum.name)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em");

    // Add a drag behavior.
    node.call(
      // @ts-ignore
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended),
    );

    this.simulation.on("tick", () => {
      link
        .attr(
          "x1",
          (/** @type {d3.SimulationLinkDatum<any>} d */ d) => d.source.x,
        )
        .attr(
          "y1",
          (/** @type {d3.SimulationLinkDatum<any>} d */ d) => d.source.y,
        )
        .attr(
          "x2",
          (/** @type {d3.SimulationLinkDatum<any>} d */ d) => d.target.x,
        )
        .attr(
          "y2",
          (/** @type {d3.SimulationLinkDatum<any>} d */ d) => d.target.y,
        );

      node.attr(
        "transform",
        (/** @type {d3.SimulationNodeDatum} d */ d) =>
          "translate(" + d.x + "," + d.y + ")",
      );
    });

    /**
     * Reheat the simulation when drag starts, and fix the subject position.
     * @param {d3.D3DragEvent<any, any, any>} event
     */
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    /**
     * Update the subject (dragged node) position during drag.
     * @param {d3.D3DragEvent<any, any, any>} event
     */
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
    /**
     * Restore the target alpha so the simulation cools after dragging ends.
     * Unfix the subject position now that it’s no longer being dragged.
     * @param {d3.D3DragEvent<any, any, any>} event
     */
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
    return this.svg;
  }
}
