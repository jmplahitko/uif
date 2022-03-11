import { ActionBehavior } from './ActionBehavior';
import { IActionContext } from './IActionContext';

export interface IActionPlan<P, R = P> {
	type: symbol;
	behavior: ActionBehavior;
	init?(actionContext: IActionContext<P, null>): Promise<IActionContext<P, null>>;
	fetch?(actionContext: IActionContext<R, null>): Promise<IActionContext<P, R>>;
	updateState?(actionContext: IActionContext<P, R | null>): Promise<IActionContext<P, R>>;
	complete?(actionContext: IActionContext<P, R | null>): Promise<IActionContext<P, R>>;
}
