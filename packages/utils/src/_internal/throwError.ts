export default function throwError(message: string): void {
	throw new Error(`ui.framework.utils.${message}`);
}
