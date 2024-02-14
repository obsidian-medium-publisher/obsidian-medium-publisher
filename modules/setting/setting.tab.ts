import {App, PluginSettingTab, Setting} from "obsidian";
import MediumPlugin from "../../main";

export class SampleSettingTab extends PluginSettingTab {
	plugin: MediumPlugin;

	constructor(app: App, plugin: MediumPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	// 추상클래스 메서드 구현
	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Medium Developer Secret')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				// .setValue(this.plugin.settings.mySetting)
				.setValue(this.plugin.settingModule.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settingModule.settings.mySetting = value;
					await this.plugin.saveSettings();
				}))
			.setName('Medium Token')
			.setDesc('Enter your Medium account token')
			.addText(text => text
				.setPlaceholder('Enter your token')
				// .setValue(this.plugin.settings.mySetting)
				.setValue(this.plugin.settingModule.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settingModule.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
