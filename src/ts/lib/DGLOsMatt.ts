import { DGLOsSVGBaseClass } from "./DGLOsSVGBaseClass";
import { Selection } from "d3-selection";
import { Node, Edge } from "../model/dynamicgraph";
import { ScaleOrdinal, scaleOrdinal, schemeCategory20 } from "d3-scale";
import * as d3force from "d3-force";
import { Simulation } from "d3-force";
import { NodeGlyphShape } from "./NodeGlyphInterface";
import { EdgeGlyphShape } from "./EdgeGlyphInterface";
import { CircleGlyphShape, SourceTargetLineGlyphShape, LabelGlyphShape } from "./shapeClasses";
import { DGLOsSVGCombined } from "./DGLOsSVGCombined";
import { SVGAttrOpts } from "./DGLOsSVG";
import { DGLOsWill } from "./DGLOsWill";

export class DGLOsMatt extends DGLOsSVGCombined {
	public drawNodeGlyphs() {

		this._currentEdgeShape = new SourceTargetLineGlyphShape("black", 1); //need to make specific?
		this._currentNodeShape = new LabelGlyphShape(null, "black");


		// this._currentEdgeShape.draw(this.loc, this.data, this._timeStampIndex);
		console.log("start draw")
		this._currentNodeShape.draw(this.loc, this.data, this._timeStampIndex);

		// //set current shapes
		// this._currentEdgeShape = new SourceTargetLineGlyphShape(null, null);
		// this._currentNodeShape = new CircleGlyphShape(null, null, null, null);
	}

	public transformNodeGlyphsTo(shape: NodeGlyphShape | any) {
		switch (this._currentNodeShape.shapeType) {
			case "Circle": switch (shape.shapeType) {
				case "Label":
					console.log("Circle-->Label")
					this.transformNodesFromCircleToLabel();
					this._currentNodeShape = new LabelGlyphShape(null, null, null, null);
					break;

				case "Circle":
					console.log("Circle-->Circle Catch");
					this._nodeLabelGlyphs.style("display", "none");
					this._currentNodeShape = new CircleGlyphShape(10, "purple", "grey", 2);
					break;

				default: console.log("new NodeShape is undefined");
					break;
			}
				break;

			case "Label": switch (shape.shapeType) {
				case "Circle":
					console.log("Label-->Circle")
					this.transformNodesFromLabelToCircle();
					this._currentNodeShape = new CircleGlyphShape(10, "purple", "grey", 2);
					this.setNodeGlyphAttrs(new SVGAttrOpts(shape.fill, shape.stroke, shape.radius, shape.stroke_width));
					break;

				case "Label":
					console.log("Label-->Label Catch");
					this._nodeCircleGlyphs.style("display", "none");
					this._currentNodeShape = new LabelGlyphShape(null, null, null, null);
					break;

				default: console.log("new NodeShape is undefined");
					break;
			};
				break;

			default: console.log("current NodeShape is undefined");
				break;
		}
	}

	private transformNodesFromCircleToLabel() {
		console.log("be quiet Vegeta");
		this._nodeCircleGlyphs.transition()
			.style("display", "none");

		this._nodeLabelGlyphs.transition()
			.style("display", null);
	}

	private transformNodesFromLabelToCircle() {
		console.log("this isnt even my final form!");
		this._nodeCircleGlyphs.transition()
			.style("display", null);

		this._nodeLabelGlyphs.transition()
			.style("display", "hidden");
	}

	public setNodeGlyphAttrs(attr: SVGAttrOpts) {
		let color = this._colorScheme; //because scope issues
		this._nodeCircleGlyphs
			.attr("fill", function (d: Node): string {
				return color(d.id);
			})
			.attr("stroke", attr.stroke)
			.attr("r", attr.radius)
			.attr("stroke-width", attr.stroke_width)
			.attr("width", attr.width)
			.attr("height", attr.height)
			.attr("opacity", attr.opacity);
	}

	public setEdgeGlyphAttrs(attr: SVGAttrOpts) {
		console.log(this._currentEdgeShape)
		if (this._currentEdgeShape.shapeType === "STLine") {
			this._edgeLineGlyphs
				.attr("fill", attr.fill)
				.attr("stroke", attr.stroke)
				.attr("r", attr.radius)
				.attr("stroke-width", attr.stroke_width)
				.attr("width", attr.width)
				.attr("height", attr.height)
				.attr("opacity", attr.opacity);
		} else if (this._currentEdgeShape.shapeType === "Rect") {
			this._edgeRectGlyphs
				.attr("fill", attr.fill)
				.attr("stroke", attr.stroke)
				.attr("r", attr.radius)
				.attr("stroke-width", attr.stroke_width)
				.attr("width", attr.width)
				.attr("height", attr.height)
				.attr("opacity", attr.opacity);
		} else if (this._currentEdgeShape.shapeType === "Gestalt") {
			this._edgeGestaltGlyphs
				.attr("fill", attr.fill)
				.attr("stroke", attr.stroke)
				.attr("r", attr.radius)
				.attr("stroke-width", attr.stroke_width)
				.attr("width", attr.width)
				.attr("height", attr.height)
				.attr("opacity", attr.opacity);
		}
	}

	public runSimulation() {

		//Check simulation exists
		if (this._simulation === undefined) {
			this._simulation = d3force.forceSimulation()
				.force("link", d3force.forceLink().id(function (d: Node): string { return "" + d.id })) //Pull applied to EdgeGlyphs
				.force("charge", d3force.forceManyBody().strength(-50)) //Push applied to all things from center
				.force("center", d3force.forceCenter(this._width / 2, this._height / 2))
				.on("tick", this.ticked(this));
		}
		if (this._simulation !== undefined) {
			this._simulation.nodes(this._data.timesteps[this._timeStampIndex].nodes);
			(this._simulation.force("link") as d3force.ForceLink<Node, Edge>).links(this._data.timesteps[this._timeStampIndex].edges);

			this._simulation.alpha(.5).restart();
		}
	}

	private ticked(self: DGLOsMatt) {
		return () => self.tick();
	}

	private tick() {
		if (this._edgeLineGlyphs !== undefined) { //only lineglyphs needed for simulation
			this._edgeLineGlyphs
				.attr("x1", function (d: Edge) { return d.source.x; })
				.attr("y1", function (d: Edge) { return d.source.y; })
				.attr("x2", function (d: Edge) { return d.target.x; })
				.attr("y2", function (d: Edge) { return d.target.y; });
		} else {
			console.log("No links!");
		}
		if (this._nodeCircleGlyphs !== undefined) {
			this._nodeCircleGlyphs
				.attr("cx", function (d: Node) {
					return d.x;
				})
				.attr("cy", function (d: Node) { return d.y; });
		} else {
			console.log("No circle nodes!");
		}
		this.currentNodeShape.updateDraw(this._nodeLabelGlyphs);
		this.currentNodeShape.updateDraw(this._nodeCircleGlyphs);
	}
}