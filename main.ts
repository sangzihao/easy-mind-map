/* eslint-disable no-mixed-spaces-and-tabs */
import { Plugin } from 'obsidian';
// Remember to rename these classes and interfaces!
import { mindMapHanler } from 'mindmap';


export default class MyPlugin extends Plugin {

	async onload() {
		this.registerMarkdownCodeBlockProcessor("mindmap", mindMapHanler);
	}

	onunload() {

	}
}