import React, { useState } from 'react';

import { Api, Button } from 'aionic-library';

const GitOrganizationPreview = (props) => {
	const { org, handleDelete, handleSync } = props;

	const [isLoading, setIsLoading] = useState(false);
	const [msg, setMsg] = useState(null);

	const deleteOrganization = () => {
		Api.deleteData(`git/organization/${org.id}`)
			.then(() => {
				handleDelete(org);
			})
			.catch((err) => {
				setMsg(Api.handleHttpError(err));
				console.log(err);
			});
	};

	const syncOrganization = () => {
		setIsLoading(true);
		Api.putData(`git/organization/${org.id}`, { name: org.name })
			.then((res) => {
				setIsLoading(false);
				handleSync(org, res);
			})
			.catch((err) => {
				setIsLoading(false);
				setMsg(Api.handleHttpError(err));
				console.log(err);
			});
	};

	return (
		<div target="_blank" className="GitOrganizationPreview card">
			<div className="card-body">
				<h5 className="card-title">{org.name}</h5>
				<p className="card-text">{org.description ? org.description : '- no description -'}</p>

				<div className="mr-2 d-inline-block">
					<Button
						label="Synchronize"
						icon="fas fa-sync"
						isLoading={isLoading}
						small={true}
						onClickHandler={syncOrganization}
						type="secondary"
					/>
				</div>

				<Button label="Remove" type="danger" small={true} onClickHandler={deleteOrganization} />

				<a
					href={org.htmlUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="button-link ml-2"
				>
					Open
				</a>

				{msg ? (
					<p className="card-text mt-2">
						<small className="text-danger">{msg}</small>
					</p>
				) : null}
			</div>
		</div>
	);
};

export default GitOrganizationPreview;
