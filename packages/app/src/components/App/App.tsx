import './App.scss';
import { defineComponent, h } from 'vue';
import { RouterView } from 'vue-router';
import img from '../../assets/logo.png';

export default defineComponent({
  name: 'App',
	render() {
		return (
			<div>
				<img alt="Vue logo" src={img} />
				<RouterView />
			</div>
		)
	}
})