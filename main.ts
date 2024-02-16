import { Plugin } from "obsidian";
import { LogoModule } from "./modules/logo/logo.module";
import { MediumCommandModule } from "./modules/command/medium/MediumCommandModule";
import { SettingModule } from "./modules/setting/setting.module";

// Remember to rename these classes and interfaces!

export const PLUGIN_NAME = "tempName";

export default class MediumPlugin extends Plugin {
	iconModule: LogoModule = new LogoModule(this);
	commandModule: MediumCommandModule = new MediumCommandModule(this);
	settingModule: SettingModule = new SettingModule(this);

	async onload() {
		console.log("loading plugin");
		await this.loadSettings();

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, "click", (evt: MouseEvent) => {
			console.log("click", evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(
			window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000),
		);
	}

	onunload() {}

	private async loadSettings() {
		await this.settingModule.loadSetting();
	}

	async saveSettings() {
		await this.settingModule.saveSetting();
	}
}
