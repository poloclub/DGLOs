import { Graph, Node, Edge } from "./Graph";

export class Person extends Node {
	private _name: string;
	private _role: string;
	constructor(id: number, name: string, role: string) {
		super(id, "Person");
		this._name = name;
		this._role = role;
	}

	get name(): string {
		return this._name;
	}

	get role(): string {
		return this._role;
	}

	set role(role: string) {
		this._role = role;
	}
}

export class Drink extends Node {
	private _name: string;
	private _price: number;
	constructor(id: number, name: string, price: number) {
		super(id, "Drink");
		this._name = name;
		this._price = price;
	}

	get name(): string {
		return this._name;
	}

	get price(): number {
		return this._price;
	}

	set price(price: number) {
		this._price = price;
	}
}



export class DrinkEdge extends Edge {
	private _consumption: number;
	private _preference: number;
	constructor(id: number, source: Node, target: Node,
		consumption: number, preference: number) {
		super(id, source, target);
		this._consumption = consumption;
		this._preference = preference;
	}
	get consumption(): number {
		return this._consumption;
	}

	get preference(): number {
		return this._preference;
	}

	set consumption(consumption: number) {
		this._consumption = consumption;
	}

	set preference(preference: number) {
		this._preference = preference;
	}
}


export class StaticDrinkGraph extends Graph {

	constructor(response: any) {
		let rawNodeData: Array<any> = response[0].nodes;
		let rawEdgeData: Array<any> = response[0].edges;

		let nodeData = new Array<Node>();
		let edgeData = new Array<Edge>();

		for (let n of rawNodeData) {
			if (n.type == "person") {
				let p = new Person(n.id, n.name, n.role);
				nodeData.push(p);
			} else if (n.type == "drink") {
				let d = new Drink(n.id, n.name, n.price);
				nodeData.push(d);
			}
		}

		for (let e of rawEdgeData) {

			let source: Node = nodeData.find(function (n: Node): boolean {
				return n.id == e.source;
			});

			let target: Node = nodeData.find(function (n: Node): boolean {
				return n.id == e.target;
			});

			let de: DrinkEdge = new DrinkEdge(e.id, source, target, e.consumption, e.preference);
			edgeData.push(de);
		}

		super(nodeData, edgeData);
	}

}