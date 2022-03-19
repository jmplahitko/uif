export enum CommandStatus {
	none = 0, // 0
	pending = 1 << 0, // 1
	initiating = 1 << 1, // 2
	initiated = 1 << 2, // 4
	fetching = 1 << 3, // 8
	fetched = 1 << 4, // 16
	storing = 1 << 5, // 32
	stored = 1 << 6, // 64
	completing = 1 << 8, // 512
	completed = 1 << 10, // 1024
	succeeded = 1 << 11, // 2048
	failed = 1 << 12, // 4096
}