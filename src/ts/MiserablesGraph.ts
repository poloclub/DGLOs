import { DynamicGraph, Graph, Node, Edge } from "./Graph";

export class Person extends Node {
	constructor(id: string, group: number) {
		super(id, "" + group, id);
	}
}

export class Cooccurence extends Edge {
	constructor(id: string | number, source: Node, target: Node, value: number) {
		super(id, source, target, value);
	}
}

export class LesMiserablesGraph extends Graph {
	public constructor(rawNodeData: Array<any>, rawEdgeData: Array<any>) {
		let nodeData = new Array<Node>();
		let edgeData = new Array<Edge>();
		for (let n of rawNodeData) {
			let node = new Person(n.id, n.group);
			nodeData.push(node);
		}
		for (let e of rawEdgeData) {
			let source: Node = nodeData.find(function (n: Node): boolean {
				return n.id === e.source;
			});

			let target: Node = nodeData.find(function (n: Node): boolean {
				return n.id === e.target;
			});
			let id: string = "" + source.id + ":" + target.id;

			let edge = new Cooccurence(id, source, target, e.value);
			edgeData.push(edge);
		}
		nodeData.sort(function (a: Node, b: Node): number {
			return +a.type - +b.type;
		})
		super(nodeData, edgeData);
	}
}

export class DynamicLesMiserablesGraph extends DynamicGraph {
	public constructor(response: any) {
		console.log(response);
		let graphs: Array<LesMiserablesGraph> = new Array<LesMiserablesGraph>();

		let rawNodeData: Array<any> = response.nodes;
		let rawEdgeData: Array<any> = response.links;
		let g: LesMiserablesGraph = new LesMiserablesGraph(rawNodeData, rawEdgeData);
		graphs.push(g);

		super(graphs);
	}
}