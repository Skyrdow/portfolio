/**
 * A number, or a string containing a number.
 * @typedef {Object} Circle
 * @property {Number} x 
 * @property {Number} y 
 * @property {Number} r
 * @property {string} label 
 */

/**
 * @typedef {Object} MultiNode
 * @property {Circle} circle
 * @property {Number} id
 * @property {Array<MultiNode>} connections
 */

/**
 * @typedef {Object} SingleNode
 * @property {Circle} circle
 * @property {Number} id
 * @property {MultiNode} connection
 */