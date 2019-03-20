import React from 'react';
import '../../node_modules/react-datepicker/dist/react-datepicker.css';
import TextField from '@material-ui/core/TextField';
import './Form.css';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

class Form extends React.Component {
	state = {
		name: "",
		surname: "",
		mail: "",
		date: "",
		show: false,
	}

	handleClose = () => {
		this.setState({ show: false });
	}

	handleShow = () => {
		this.setState({ show: true });
	}

	refreshPage = () => { 
		window.location.reload(); 
	}
	
	validate = (e) => {
		let isError = false;
		const errors = {
	      nameError: "",
	      surnameError: "",
	      mailError: "",
	      dateError: "",
	      showErrorName: undefined,
	      showErrorSurname: undefined,
	      showErrorMail: undefined,
	      showErrorDate: undefined
	    };

		if (e.name.length < 4) {
			isError = true;
			errors.nameError = "Name needs to be atleast 4 char long";
			errors.showErrorName = true;
		};

		if (e.surname.length < 4) {
			isError = true;
			errors.surnameError = "Surname needs to be atleast 4 char long";
			errors.showErrorSurname = true;
		};

		if (e.mail.indexOf("@") === -1) {
	      isError = true;
	      errors.mailError = "Requires valid email";
	      errors.showErrorMail = true;
	    };

		if (e.date < new Date().toISOString().slice(0,10)) {
	      isError = true;
	      errors.dateError = "Requires valid date";
	      errors.showErrorDate = true;
	    };
		
		this.setState({
			...this.state,
			...errors
		});
		
		return isError;
	}

	getUser = async (e) => {
		e.preventDefault();

		const newUser = {
			name: e.target.elements.name.value,
			surname: e.target.elements.surname.value,
			mail: e.target.elements.mail.value,
			date: e.target.elements.DatePicker.value
		}

		const err = this.validate(newUser);

		if (!err) {
		this.handleShow();
		axios.post('http://localhost:4000/api/products/', newUser)
		.then(res => console.log(res.data));
		} 
	}

	render () {
		return (
			<form className="inputForm" onSubmit={this.getUser}>
				<div className="row">	
					<TextField
						className="field"
						type="text"
						label="Name"
						name="name" 
	          			placeholder="Name"
	          			error = { this.state.showErrorName }
					/><br />
					<TextField
						className="field"
						type="text"
						label="Surname"
						name="surname"
						placeholder="Surname"
						error = { this.state.showErrorSurname }
					/>
					<TextField
						className="field"
						type="text" 
						label="Mail"
						name="mail"
						placeholder="Mail"
						error = { this.state.showErrorMail } 
					/>
					<TextField
						className="field"
				        id="date"
				        name="DatePicker"
				        label="Meetup date"
				        type="date"
				        defaultValue = { new Date().toISOString().slice(0,10) }
				        error = { this.state.showErrorDate }
				    />
					<button className="btn btn-primary">Submit</button>
					<Modal 
						show = { this.state.show } 
						onHide = { this.handleClose }>
						<Modal.Header closeButton onClick = { this.refreshPage }>
							<Modal.Title>Sent confirmation!</Modal.Title>
						</Modal.Header>
						<Modal.Body>Woohoo, your data were sucesfully sent!</Modal.Body>
						<Modal.Footer>
							<button variant="primary" onClick = { this.refreshPage } >
								Close
							</button>
						</Modal.Footer>
					</Modal>
				</div>
				<div className="errors">
					<div>{ this.state.nameError }</div>
					<div>{ this.state.surnameError }</div>
					<div>{ this.state.mailError }</div>
					<div>{ this.state.dateError }</div>
				</div>
			</form>
		);
	}
};

export default Form;