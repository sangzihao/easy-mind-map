/* eslint-disable no-mixed-spaces-and-tabs */
import { MarkdownPostProcessorContext } from "obsidian";
import { Transformer } from "markmap-lib";
import { Markmap, loadCSS, loadJS } from "markmap-view";
import * as markmap from "markmap-view";
import { Toolbar } from "markmap-toolbar";

const transformer: Transformer = new Transformer();

/**
 * codeblock handler of mindmap
 * @param source markdown text before transformation
 * @param element HTMLElement codeblock tag
 * @param ctx the context of obsidian documents, including position of document and HTMLElement
 */
export function mindMapHanler(
	source: string,
	element: HTMLElement,
	ctx: MarkdownPostProcessorContext
) {
	// 1. Transform Markdown to data used by markmap
	const { root, features } = transformer.transform(source);
	// 2. get assets
	const { styles, scripts } = transformer.getUsedAssets(features);
	if (styles) {
		loadCSS(styles);
	}
	if (scripts) {
		loadJS(scripts, {
			getMarkmap: () => markmap,
		});
	}
	const svgElement: SVGSVGElement = element.createSvg("svg", {
		attr: {
			style: "width: 100%; height:100%",
		},
	});
	// 创建markmap
	const mm = Markmap.create(svgElement, undefined, root);

	// 创建 markmap工具栏
	const toolbar: Toolbar = new Toolbar();
	// 绑定工具栏到markmap上
	toolbar.attach(mm);
	// 设置toolbar中的div在一行展示
	toolbar.el.setCssProps({
		display: "flex",
		"justify-content": "center",
		"align-items": "center",
	});

	// 创建div用于存放工具栏
	const toolbarDiv: HTMLElement = element.createDiv({
		attr: {
			style: "width: 100%; height:100%;",
	  },
	});
	toolbarDiv.append(toolbar.render());
}
