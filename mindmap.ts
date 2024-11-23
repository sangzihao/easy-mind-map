import { MarkdownPostProcessorContext } from "obsidian";
import { Transformer } from "markmap-lib";
import { Markmap, loadCSS, loadJS } from "markmap-view";
import * as markmap from "markmap-view"
import { Toolbar } from "markmap-toolbar";

const transformer: Transformer = new Transformer()

/**
 * 思维导图代码块处理函数
 * @param source 代码块中的待渲染的文本
 * @param element HTMLElement，表示代码块的html元素，可以通过该元素创建新标签展示文本
 * @param ctx 文档的上下文信息，包含了文档的信息和待渲染代码块的位置信息等
 */
export function mindMapHanler(source: string, element: HTMLElement, ctx: MarkdownPostProcessorContext) {
  const {root, features} = transformer.transform(source)
  console.log("features: ", features)
  // 2. get assets
  // either get assets required by used features
  const { styles, scripts } = transformer.getUsedAssets(features);
  console.log("styles: ", styles)
  console.log("script: ", scripts)
  if (styles) {
    loadCSS(styles)
  }
  if (scripts) {
    loadJS(scripts, {
      getMarkmap: () => markmap
    })
  }
  const svgElement: SVGSVGElement = element.createSvg("svg", {
    attr: {
      "style":"width: 100%; height:100%"
    },
  })
  Markmap.create(svgElement, undefined, root)
}