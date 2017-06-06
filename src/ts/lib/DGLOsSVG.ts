import { DGLOsSVGBaseClass } from "./DGLOsSVGBaseClass";
import { Selection } from "d3-selection";
import { Node, Edge } from "../model/dynamicgraph";
import { ScaleOrdinal, scaleOrdinal, schemeCategory20 } from "d3-scale";
import * as d3force from "d3-force";
import { Simulation } from "d3-force";
import { DGLOsSVGCombined } from "./DGLOsSVGCombined";
import { AttrOpts } from "./DGLOs";
import { DGLOsWill } from "./DGLOsWill";
import { DGLOsMatt } from "./DGLOsMatt";

export class SVGAttrOpts implements AttrOpts {
	private _fill: string = null;
	private _stroke: string = null;
	private _stroke_width: number = null;
	private _radius: number = null;
	private _opacity = 100;
	private _width: number = null;
	private _height: number = null;

	constructor(fill?: string, stroke?: string, radius?: number, stroke_width?: number, width?: number, height?: number, opacity?: number) {
		this._fill = fill;
		this._stroke = stroke;
		this._radius = radius;
		this._stroke_width = stroke_width;
		this._width = width;
		this._height = height;
		this._opacity = opacity;
	}

	get fill(): string {
		return this._fill;
	}
	set fill(fill: string) {
		this._fill = fill;
	}


	get stroke(): string {
		return this._stroke;
	}
	set stroke(stroke: string) {
		this._stroke = stroke;
	}


	get radius(): number {
		return this._radius;
	}
	set radius(radius: number) {
		this._radius = radius;
	}


	get stroke_width(): number {
		return this._stroke_width;
	}
	set stroke_width(stroke_width: number) {
		this._stroke_width = stroke_width;
	}


	get width(): number {
		return this._width;
	}
	set width(width: number) {
		this._width = width;
	}


	get height(): number {
		return this._height;
	}
	set height(height: number) {
		this._height = height;
	}


	get opacity(): number {
		return this._opacity;
	}
	set opacity(opacity: number) {
		this._opacity = opacity;
	}


	public setNodeGlyphAttributes(glyphs: Selection<any, {}, any, {}>, attr: SVGAttrOpts, fill?: string): Selection<any, {}, any, {}> {
		let colorScheme = scaleOrdinal<string | number, string>(schemeCategory20);
		switch (fill) {
			// case "id":
			// 	glyphs
			// 		.attr("fill", function (d: Node): string {
			// 			return colorScheme(d.id);
			// 		});
			// 	break;

			// case "label":
			// 	glyphs
			// 		.attr("fill", function (d: Node): string {
			// 			return colorScheme(d.label);
			// 		});
			// 	break;

			default:
				glyphs.attr("fill", attr.fill);
				console.log("fill failed, defaulting");
				break;
		}

		glyphs
			.attr("stroke", attr.stroke)
			.attr("stroke-width", attr.stroke_width)
			.attr("r", attr.radius)
			.attr("width", attr.width)
			.attr("height", attr.height)
			.attr("opacity", attr.opacity);
		return glyphs;
	}

	public setEdgeGlyphAttributes(glyphs: Selection<any, {}, any, {}>, attr: SVGAttrOpts, weight?: string): Selection<any, {}, any, {}> {
		console.log("ask again later")
		return;
	}
}

export class DGLOsSVG extends DGLOsWill { }