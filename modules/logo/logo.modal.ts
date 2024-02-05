import { App, Modal } from "obsidian";

export class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		// set guide
		contentEl.setCssStyles({
			padding: "20px",
			width: "300px",
		});

		// set content
		contentEl.createEl("h2", { text: "Obsidian Medium Publisher" });
		contentEl.createEl("p", {
			text: "Simple Medium Publisher for obsidian",
		});
		contentEl.createEl("p", { text: "How to setting => click below link" });
		contentEl.createEl("a", {
			text: "https://github.com/koreanddinghwan/obsidian-medium-publisher/wiki/User's-Guide",
		});
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
