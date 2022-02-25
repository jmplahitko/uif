interface IHTMLAnchorElement extends HTMLElement {
	href: string;
	download: string;
}

export default class ExportFactory {
	public blob;
	public name;
	public type: string;
	public extension: string;
	public link?: IHTMLAnchorElement;

	constructor(type = 'application/json', extension = '.json') {
		this.type = type;
		this.extension = extension;
	}

	public export(content = '', name = 'export', download = true): this {
		this.name = name;
		this.blob = new Blob([content], { type: this.type });

		this.link = <IHTMLAnchorElement>document.createElement('a');
		this.link.download = `${name}${this.extension}`;
		this.link.textContent = this.name;
		this.link.href = URL.createObjectURL(this.blob);

		if (download) {
			this.download();
		}
		return this;
	}

	public download(): void {
		let link = this.getLink();
		// @ts-ignore - This is for IE. We can probably cut this.
		if (navigator.msSaveOrOpenBlob) {
			// @ts-ignore - This is for IE. We can probably cut this.
			navigator.msSaveOrOpenBlob(this.blob, this.name);
		} else {
			link.click();
		}
	}

	public getLink(): IHTMLAnchorElement {
		if (!this.link) {
			throw Error('The link has not been generated yet.');
		}
		return this.link;
	}
}
