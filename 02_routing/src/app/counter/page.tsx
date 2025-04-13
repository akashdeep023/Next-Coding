import { Counter } from "./counter";
// If you use metadata you can not use hooks, better way is to create new component
export const metadata = {
	title: "Counter ",
};

export default function CounterPage() {
	return <Counter />;
}
