import { DGLOsSVGBaseClass } from "./DGLOsSVGBaseClass";
import { Selection } from "d3-selection";
import { Node, Edge } from "../model/dynamicgraph";
import { ScaleOrdinal, scaleOrdinal, schemeCategory20b } from "d3-scale";
import * as d3force from "d3-force";
import { Simulation } from "d3-force";

import { DGLOsSVGCombined } from "./DGLOsSVGCombined";
import { DGLOsWill } from "./DGLOsWill";

export class DGLOsMatt extends DGLOsSVGCombined {
	public drawNodeGlyphs() {
		this._nodeG = this.loc.append("g")
			.classed("nodes", true);

		this._nodeGlyphs = this._nodeG.selectAll("circle")
			.data(this._data.timesteps[this._timeStampIndex].nodes, function (d: Node): string { return "" + d.id });

		this._nodeGlyphs.exit().remove();

		let nodeEnter = this._nodeGlyphs.enter().append("circle")
			.attr("id", function (d: any): string | number { return d.name; });

		this._nodeGlyphs = this._nodeGlyphs.merge(nodeEnter);

		//here for debugging
		this._nodeGlyphs
			.attr("fill", "purple")
			.attr("stroke", "grey")
			.attr("stroke-width", 3)
			.attr("r", 25);
	}

	public runSimulation() {
		this._simulation = d3force.forceSimulation() //init sim for chart?
			.force("link", d3force.forceLink().id(function (d: Node): string { return "" + d.id })) //pull applied to link lengths
			.force("charge", d3force.forceManyBody().strength(-50)) //push applied to all things from center
			.force("center", d3force.forceCenter(this._width / 2, this._height / 2)) //define center
			.on("tick", this.tick);
	}

	protected tick() {
		console.log(this._edgeGlyphs);
		console.log(this._nodeGlyphs);
		if (this._edgeGlyphs !== undefined) {
			this._edgeGlyphs //as in the lines representing links
				.attr("x1", function (d: Edge) { return d.source.x; })
				.attr("y1", function (d: Edge) { return d.source.y; })
				.attr("x2", function (d: Edge) { return d.target.x; })
				.attr("y2", function (d: Edge) { return d.target.y; });
		} else {
			console.log("No links!");
		}
		if (this._nodeGlyphs !== undefined) {
			this._nodeGlyphs
				.attr("cx", function (d: Node) {
					return d.x;
				})
				.attr("cy", function (d: Node) { return d.y; });
		} else {
			console.log("No nodes!");
		}
	}
}