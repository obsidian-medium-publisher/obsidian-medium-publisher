import { App, PluginSettingTab, Setting } from "obsidian";
import MediumPlugin from "../../main";

export class SampleSettingTab extends PluginSettingTab {
	plugin: MediumPlugin;

	constructor(app: App, plugin: MediumPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	// 추상클래스 메서드 구현
	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Medium Developer Secret")
			.setDesc("Don't know how to get it? Click Logo in the left ribbon!")
			.addText((text) =>
				text
					.setPlaceholder("Enter your secret")
					.setValue(
						this.plugin.settingModule.getSetting().mediumDevToken,
					)
					.onChange(async (value) => {
						this.plugin.settingModule.setMediumDevToken(value);
						await this.plugin.saveSettings();
					}),
			);
	}
}
