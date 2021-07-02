import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useHistory } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'
import {KardiaAccount} from 'kardia-js-sdk';


const AccessWalletByPrivateKey = () => {
	// Context
	const { loginUser } = useContext(AuthContext)
	// Router
	const history = useHistory()

	// Local state
	const [loginForm, setLoginForm] = useState({
		private_key: '',
		password: ''
	})

	const [alert, setAlert] = useState(null)

	const { private_key, password } = loginForm

	const onChangeLoginForm = event =>
		setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

	const login = async event => {

		event.preventDefault()
		console.log("private_key - password: ", private_key, password)
		try {
			const loginData = await loginUser(loginForm)
			if (!loginData.success) {
				setAlert({ type: 'danger', message: loginData.message })
				setTimeout(() => setAlert(null), 5000)
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<>
			<Form className='my-4' onSubmit={login}>
				<AlertMessage info={alert} />

				<Form.Group>
					<Form.Control
						type='text'
						placeholder='Private_key'
						name='private_key'
						required
						value={private_key}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='password'
						placeholder='Password'
						name='password'
						required
						value={password}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Button variant='success' type='submit'>
					Login
				</Button>
			</Form>
			<p>
				Don't have an account?
				<Link to='/create-new-wallet' >
					<Button variant='info' size='sm' className='ml-2'>
						Register
					</Button>
				</Link>
			</p>
		</>
	)
}

export default AccessWalletByPrivateKey