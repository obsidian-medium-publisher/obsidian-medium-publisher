import { addIcon } from "obsidian";
import { SampleModal } from "./logo.modal";
import MediumPlugin, { PLUGIN_NAME } from "../../main";

export class LogoModule {
	private readonly plugin: MediumPlugin;
	constructor(app: MediumPlugin) {
		this.plugin = app;

		this.addLogo();

		// This creates an logo in the left ribbon.
		const ribbonIconEl = this.plugin.addRibbonIcon(
			"logo",
			PLUGIN_NAME,
			(evt: MouseEvent) => {
				// Called when the user clicks the logo.
				new SampleModal(this.plugin.app).open();
			},
		);
		ribbonIconEl.addClass("my-plugin-ribbon-class");
	}

	private addLogo() {
		addIcon(
			"logo",
			`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="96px" height="96px" viewBox="0 0 24 24" version="1.1">
<g id="surface1">
<rect x="0" y="0" width="24" height="24" style="fill:rgb(7.058824%,6.27451%,5.490196%);fill-opacity:1;stroke:none;"/>
<path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 5.726562 8.027344 C 5.746094 7.828125 5.671875 7.632812 5.523438 7.5 L 4.019531 5.6875 L 4.019531 5.414062 L 8.691406 5.414062 L 12.304688 13.339844 L 15.480469 5.414062 L 19.9375 5.414062 L 19.9375 5.6875 L 18.652344 6.921875 C 18.539062 7.003906 18.484375 7.144531 18.507812 7.28125 L 18.507812 16.347656 C 18.484375 16.488281 18.539062 16.625 18.652344 16.710938 L 19.910156 17.945312 L 19.910156 18.214844 L 13.585938 18.214844 L 13.585938 17.945312 L 14.886719 16.679688 C 15.015625 16.550781 15.015625 16.515625 15.015625 16.320312 L 15.015625 8.988281 L 11.394531 18.183594 L 10.90625 18.183594 L 6.691406 8.988281 L 6.691406 15.152344 C 6.65625 15.410156 6.742188 15.671875 6.925781 15.859375 L 8.617188 17.914062 L 8.617188 18.183594 L 3.816406 18.183594 L 3.816406 17.914062 L 5.507812 15.859375 C 5.691406 15.671875 5.769531 15.410156 5.726562 15.152344 Z M 5.726562 8.027344 "/>
</g>
</svg>
`,
		);
	}
}
