import { IActionContext } from './IActionContext';
import { IActionPlan } from './IActionPlan';

export interface IAction<P, R = P> {
	context: IActionContext<P, R>;
	plan: IActionPlan<P, R>;
}