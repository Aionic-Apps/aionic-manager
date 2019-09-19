import React, { Component } from 'react';

import { Api, Spinner } from 'aionic-library';

class GitOrganizationForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			isLoading: false,
			msg: '',
			status: ''
		};
	}

	handleInputChange = (e) => {
		// eslint-disable-next-line prefer-destructuring
		const value = e.target.value;

		this.setState({
			name: value,
			msg: '',
			status: ''
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		if (this.state.name.length) {
			this.setState({
				isLoading: true
			});

			Api.postData('git/organization', { name: this.state.name })
				.then((res) => {
					this.setState({ isLoading: false, status: 'is-valid' });
					this.props.updateParent(res);
				})
				.catch((err) => {
					this.setState({ isLoading: false, status: 'is-invalid', msg: Api.handleHttpError(err) });
				});
		}
	};

	render() {
		const { isLoading, msg, status } = this.state;
		return (
			<div className="GitOrganizationForm">
				<form onSubmit={this.handleSubmit}>
					<label>Add a new organization</label>
					<div className="input-group">
						<input
							type="text"
							name="name"
							className={`form-control ${status}`}
							onChange={this.handleInputChange}
							placeholder="Enter organization name"
							autoComplete="off"
						/>
						<div className="input-group-append">
							<button type="button" className="button btn button-primary">
								{isLoading ? <Spinner onBtn={true} /> : 'Add'}
							</button>
						</div>
						<div className="valid-feedback">Organization added!</div>
						<div className="invalid-feedback">{msg}</div>
					</div>
				</form>
			</div>
		);
	}
}

GitOrganizationForm.defaultProps = {
	updateParent: () => {}
};

export default GitOrganizationForm;
