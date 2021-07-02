import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Langding'
import Auth from './views/Auth'
import AuthContextProvider from './contexts/AuthContext'
import Dashboard from './views/Dashboard'
import ProtectedRoute from './components/routing/ProtectedRoute'
import About from './views/About'
import PostContextProvider from './contexts/PostContext'
import CreateTransaction from './components/Transaction/CreateTransaction'
function App() {
	return (
		<AuthContextProvider>
			<PostContextProvider>
				<Router>
					<Switch>
						<Route exact path='/' component={Landing} />
						<Route
							exact
							path='/login'
							render={props => <Auth {...props} authRoute='login' />}
						/>
						<Route
							exact
							path='/register'
							render={props => <Auth {...props} authRoute='register' />}
						/>
						<Route 
							exact
							path='/create-private-key'
							render={props => <Auth {...props} authRoute='create-private-key'/>} />
						<Route 
							exact
							path='/create-keystored-file'
							render={props => <Auth {...props} authRoute='create-keystored-file'/>} />
						<Route 
							exact
							path='/create-mnemonic-phrase'
							render={props => <Auth {...props} authRoute='create-mnemonic-phrase'/>} />
						<Route 
							exact
							path='/create-new-wallet'
							render={props => <Auth {...props} authRoute='create-new-wallet'/>} />
						<Route 
							exact
							path='/get-private-key'
							render={props => <Auth {...props} authRoute='get-private-key'/>} />
							<Route 
							exact
							path='/access-wallet-private-key'
							render={props => <Auth {...props} authRoute='access-wallet-private-key'/>} />
						<Route 
							exact
							path='/access-wallet-keystored-file'
							render={props => <Auth {...props} authRoute='access-wallet-keystored-file'/>} />
						<Route 
							exact
							path='/access-wallet-mnemonic-phrase'
							render={props => <Auth {...props} authRoute='access-wallet-mnemonic-phrase'/>} />
						<Route 
							exact
							path='/access-wallet'
							render={props => <Auth {...props} authRoute='access-wallet'/>} />
							
						<ProtectedRoute exact path='/dashboard' component={Dashboard} />
						<ProtectedRoute exact path='/about' component={About} />
						<ProtectedRoute exact path='/create-transaction' component={CreateTransaction}/>
					</Switch>
				</Router>
			</PostContextProvider>
		</AuthContextProvider>
	)
}

export default App