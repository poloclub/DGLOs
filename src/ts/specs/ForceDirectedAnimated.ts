import { Technique } from "./Technique";

import { RectGlyphShape } from "../lib/shapes/RectGlyphShape";
import { CircleGlyphShape } from "../lib/shapes/CircleGlyphShape";
import { LabelGlyphShape } from "../lib/shapes/LabelGlyphShape";
import { SourceTargetLineGlyphShape } from "../lib/shapes/SourceTargetLineGlyphShape";
import { GestaltGlyphShape } from "../lib/shapes/GestaltGlyphShape";

import { SVGAttrOpts } from "../lib/DGLOsSVG";

export class ForceDirectedAnimated extends Technique {
	public draw() {
		this.lib.drawEdgeGlyphs();
		this.lib.drawNodeGlyphs();
		this.lib.transformNodeGlyphsTo(this.lib.circleShape);
		this.lib.transformEdgeGlyphsTo(this.lib.sourceTargetLineShape);
		// this.lib.setNodeGlyphAttrs(new SVGAttrOpts("purple", "grey", 10, 2));
		// this.lib.setEdgeGlyphAttrs(new SVGAttrOpts(null, "black", null, 1));
		this.lib.runSimulation();
	}
}