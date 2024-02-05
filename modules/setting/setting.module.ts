import { SampleSettingTab } from "./setting.tab";
import MediumPlugin from "../../main";
import { DEFAULT_SETTINGS, MyPluginSettings } from "./setting.values";

export class SettingModule {
	private readonly plugin: MediumPlugin;
	private settings: MyPluginSettings;

	constructor(app: MediumPlugin) {
		this.plugin = app;

		this.plugin.addSettingTab(
			new SampleSettingTab(this.plugin.app, this.plugin),
		);
	}

	async loadSetting() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.plugin.loadData(),
		);
	}

	async saveSetting() {
		await this.plugin.saveData(this.settings);
	}

	setMediumDevToken(value: string) {
		this.settings.mediumDevToken = value;
	}

	getSetting() {
		return this.settings;
	}
}
