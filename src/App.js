import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Titles from './components/Titles';
import Form from './components/Form';
import List from './components/List';

class App extends React.Component {
	render() {
		return (
			<div className="container">
				<Titles />
				<Form />
				<List />
			</div>
		);
	}
};

export default App;