import React, { useState, useEffect } from 'react';
import './App.css';
import { useForm } from 'react-hook-form';

function App() {
	const {
		register,
		handleSubmit,
		reset,
		formState,
		formState: { errors },
	} = useForm();
	const [picture, setPicture] = useState(null);
	const [loading, setLoading] = useState(false);

	const onChangePicture = (e) => {
		setPicture(URL.createObjectURL(e.target.files[0]));
	};

	const onSubmit = async (data) => {
		setLoading(true);
		const formData = new FormData();
		formData.append('file', data.file[0]);

		const res = await fetch('http://localhost:5000/upload-file', {
			method: 'POST',
			body: formData,
		}).then((res) => res.json());
		console.log(res);
		if (res.status === ' failed') {
			return;
		}

		setPicture(null);
		setLoading(false);
	};

	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset({ example: '', exampleRequired: '', file: '' });
		}
	}, [formState, reset]);

	return (
		<div className="App">
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="Title">Title: </label>

				<input
					defaultValue="test"
					{...register('example', { required: true })}
				/>
				{errors.exampleRequired && <p>This field is required</p>}
				<br />
				<br />
				<br />

				<label htmlFor="status">Status: </label>
				<input {...register('exampleRequired', { required: true })} />
				{errors.exampleRequired && <p>This field is required</p>}
				<br />
				<br />
				<label htmlFor="Image">Image: </label>
				<input
					type="file"
					{...register('file', { required: true })}
					onChange={onChangePicture}
				/>
				{errors.exampleRequired && <p>Please select an image</p>}
				<br />
				<br />

				<img className="image" src={picture && picture} alt="" />
				<br />
				<br />

				<br />
				<br />

				<input type="submit" />
			</form>
			{loading && <p>File Submitted</p>}
		</div>
	);
}

export default App;
