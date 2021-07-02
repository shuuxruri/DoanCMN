import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import GetPrivateKey from '../components/CreateNewWallet/GetPrivateKey'
import CreatePrivateKey from './../components/CreateNewWallet/CreateByPrivateKey'
import CreateMnemonicPhrase from './../components/CreateNewWallet/CreateByMnemonicPhrase'
import CreateKeystoredFile from './../components/CreateNewWallet/CreateByMnemonicPhrase'
import CreateNewWallet from './../components/CreateNewWallet/CreateNewWallet'
import AccessWalletPrivateKey from './../components/AccessWallet/AccessWalletByPrivateKey'
import AccessWalletMnemonicPhrase from './../components/AccessWallet/AccessWalletByKeystoredFile'
import AccessWalletKeystoredFile from './../components/AccessWallet/AccessWalletByKeystoredFile'
import AccessWallet from './../components/AccessWallet/AccessWallet'
import GetMnemonicPhrase from '../components/CreateNewWallet/GetMnemonicPhrase'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

const Auth = ({ authRoute }) => {
	const {
		authState: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

	let body
	
	if (authLoading)
		body = (
			<div className='d-flex justify-content-center mt-2'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	else if (isAuthenticated) return <Redirect to='/dashboard' />
	else
		body = (
			<>
				{authRoute === 'login' && <LoginForm />}
				{authRoute === 'register' && <RegisterForm />}
				{authRoute === 'create-private-key' && <CreatePrivateKey />}
				{authRoute === 'get-private-key' && <GetPrivateKey />}
				{authRoute === 'get-mnemonic-phrase' && <GetMnemonicPhrase />}
				{authRoute === 'create-keystored-file' && <CreateKeystoredFile />}
				{authRoute === 'create-mnemonic-phrase' && <CreateMnemonicPhrase />}
				{authRoute === 'create-new-wallet' && <CreateNewWallet />}
				{authRoute === 'access-wallet-private-key' && <AccessWalletPrivateKey />}
				{authRoute === 'access-wallet-keystored-file' && <AccessWalletKeystoredFile />}
				{authRoute === 'access-wallet-mnemonic-phrase' && <AccessWalletMnemonicPhrase />}
				{authRoute === 'access-wallet' && <AccessWallet />}

			</>
		)

	return (
		<div>{body}</div>
	)
}

export default Auth