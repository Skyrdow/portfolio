import * as d3 from 'd3';

/// <reference path="types.js" />


export class Canvas {
    /**
     * @constructor
     * @param {SVGElement} svgElement 
     */
    constructor(svgElement) {
        this.svg = d3.select(svgElement);
        /** @type {Array<SingleNode>} */
        this.nodes = [];
    }

    /**
     * Crea un nodo nuevo
     * @param {Circle} circle
     * @returns {any}
     */
    newNode(circle) {

        this.svg.append('circle')
            .attr('cx', circle.x)
            .attr('cy', circle.y)
            .attr('r', circle.r)
            .style("fill", "none")
            .style("stroke", "black")
            .style("stroke-width", 1);
    }

    
    // canva.newNode();
    // const svg = d3.select(svgElement);
    // const width = svgElement.clientWidth;
    // const height = svgElement.clientHeight;
    // const x = d3
    //     .scaleLinear()
    //     .domain([-width / 2, width / 2])
    //     .range([0, width]);
    // const y = d3
    //     .scaleLinear()
    //     .domain([height / 2, -height / 2])
    //     .range([0, height]);

    // const g = svg.append("g");
    // // Ejes
    // g.append("g")
    //     .attr("transform", `translate(0,${y(0)})`)
    //     .call(d3.axisBottom(x));

    // g.append("g")
    //     .attr("transform", `translate(${x(0)},0)`)
    //     .call(d3.axisLeft(y));

    // svg.on("mousedown", function (event) {
    //     const [xPos, yPos] = d3.pointer(event);
    //     drawArrow(xPos, yPos);
    // });

    // function drawArrow(xPos, yPos) {
    //     // Elimina la flecha anterior
    //     g.selectAll(".arrow").remove();
    //     // Dibuja la nueva flecha
    //     g.append("line")
    //         .attr("class", "arrow")
    //         .attr("x1", width / 2)
    //         .attr("y1", height / 2)
    //         .attr("x2", xPos)
    //         .attr("y2", yPos)
    //         .attr("stroke", "red")
    //         .attr("stroke-width", 2)
    //         .attr("marker-end", "url(#arrowhead)"); // Asegúrate de definir el marcador de flecha en el SVG
    // }
}