// this is the factory for determining which parsing strategy to use based on the content-type response header
import ResponseContentType from '../ResponseContentType';
import arrayBufferParsingStrategy from './arrayBuffer';
import bufferParsingStrategy from './buffer';
import blobParsingStrategy from './blob';
import formDataParsingStrategy from './formData';
import jsonParsingStrategy from './json';
import textParsingStrategy from './text';
import ContentMimeType from '../../ContentMimeType';
import { ResponseParsingStrategy } from '../..';
import { IResponseParsingStrategyFactory } from './IResponseParsingStrategyFactory';

const arrayBufferTypes = [
	ContentMimeType.aac,
	ContentMimeType.abw,
	ContentMimeType.arc,
	ContentMimeType.azw,
	ContentMimeType.avi,
	ContentMimeType.bin,
	ContentMimeType.bz,
	ContentMimeType.bz2,
	ContentMimeType.csh,
	ContentMimeType.doc,
	ContentMimeType.docx,
	ContentMimeType.epub,
	ContentMimeType.jar,
	ContentMimeType.mpkg,
	ContentMimeType.mpeg,
	ContentMimeType.mp3,
	ContentMimeType.ods,
	ContentMimeType.odt,
	ContentMimeType.ogv,
	ContentMimeType.ogx,
	ContentMimeType.odp,
	ContentMimeType.pdf,
	ContentMimeType.ppt,
	ContentMimeType.pptx,
	ContentMimeType.rar,
	ContentMimeType.rtf,
	ContentMimeType.sh,
	ContentMimeType.swf,
	ContentMimeType.tar,
	ContentMimeType.ts,
	ContentMimeType.vsd,
	ContentMimeType.webm,
	ContentMimeType.wav,
	ContentMimeType.weba,
	ContentMimeType.webm,
	ContentMimeType.xls,
	ContentMimeType.xlsx,
	ContentMimeType.xul,
	ContentMimeType.zip,
	ContentMimeType['3gpAudio'],
	ContentMimeType['3gpVideo'],
	ContentMimeType['3g2Audio'],
	ContentMimeType['3g2Video'],
	ContentMimeType['7z'],
];

const blobTypes = [
	ContentMimeType.bmp,
	ContentMimeType.eot,
	ContentMimeType.gif,
	ContentMimeType.ico,
	ContentMimeType.jpeg,
	ContentMimeType.jpg,
	ContentMimeType.png,
	ContentMimeType.otf,
	ContentMimeType.svg,
	ContentMimeType.tif,
	ContentMimeType.tiff,
	ContentMimeType.ttf,
	ContentMimeType.webp,
	ContentMimeType.wmf,
	ContentMimeType.woff,
	ContentMimeType.woff2,
];

const formDataTypes = [
	ContentMimeType.multipartForm,
	ContentMimeType.urlEncodedForm
];

const jsonTypes = [
	ContentMimeType.json,
	ContentMimeType.jsonld
];
const textTypes = [
	ContentMimeType.css,
	ContentMimeType.csv,
	ContentMimeType.htm,
	ContentMimeType.html,
	ContentMimeType.js,
	ContentMimeType.txt,
	ContentMimeType.xmlText,
	ContentMimeType.xml,
	ContentMimeType.xhtml
];

export class ResponseParsingStrategyFactory implements IResponseParsingStrategyFactory {
	static $inject = ['Platform'];

	private _platform: Platform;

	constructor(platform: Platform) {
		this._platform = platform;
	}

	public getStrategyFor(contentType: ResponseContentType): ResponseParsingStrategy {
		switch(contentType) {
			case ResponseContentType.arrayBuffer: return this._platform.type === 'server' ? bufferParsingStrategy : arrayBufferParsingStrategy;
			case ResponseContentType.blob: return this._platform.type === 'server' ? bufferParsingStrategy : blobParsingStrategy;
			case ResponseContentType.formData: return this._platform.type === 'server' ? bufferParsingStrategy : formDataParsingStrategy;
			case ResponseContentType.json: return jsonParsingStrategy;
			case ResponseContentType.text: return textParsingStrategy;
			default: return textParsingStrategy;
		}
	}

	public getStrategyByMimeType(mimeType: ContentMimeType): ResponseParsingStrategy {
		if (arrayBufferTypes.includes(mimeType)) return this.getStrategyFor(ResponseContentType.arrayBuffer);
		else if (blobTypes.includes(mimeType)) return this.getStrategyFor(ResponseContentType.blob);
		else if (formDataTypes.includes(mimeType)) return this.getStrategyFor(ResponseContentType.formData);
		else if (jsonTypes.includes(mimeType)) return this.getStrategyFor(ResponseContentType.json);
		else if (textTypes.includes(mimeType)) return this.getStrategyFor(ResponseContentType.text);
		else return this.getStrategyFor(ResponseContentType.text);
	}
}