import { PostContext } from '../contexts/PostContext'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col'
import SinglePost from '../components/posts/SinglePost'
import AddPostModal from '../components/posts/AddPostModal'
import UpdatePostModal from '../components/posts/UpdatePostModal'
import addIcon from '../assets/plus-circle-fill.svg'
import {KardiaAccount} from 'kardia-js-sdk';
import { Link } from 'react-router-dom'
import KardiaClient from 'kardia-js-sdk';
const RPC_ENDPOINT = 'https://rpc.kardiachain.io/';

const Dashboard = () => {
	const {
		authState: {
			user: { private_key }
		}
	} = useContext(AuthContext)
	const [wallet, setWallet] = useState([])
	const [balance, setBalance] = useState(0)

	//Get KAI balance of a wallet == getKaiBalance
	const getKaiBalance = async (address) => {
		const kardiaClient = new KardiaClient({ endpoint: RPC_ENDPOINT });
		// Account module
		const accountModule = kardiaClient.account;
		// Get balance
		const balance = await accountModule.getBalance(address);
		// console.log("balance account assasas: ", balance)
		setBalance(balance);
	}
	const getWallet = async (Mnemonic) => {
		try {
            const wallet = await KardiaAccount.getWalletFromMnemonic(Mnemonic)
			// console.log('wallet Mnemonic: ',wallet.privateKey)
			getKaiBalance(wallet.address);
			setWallet( wallet);
        }
        catch(error) {
            console.log("error: ", error)
        }  
	}
	const {
		postState: { post, posts, postsLoading },
		getPosts,
		setShowAddPostModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(PostContext)

	// Start: Get all posts
	useEffect(() => getPosts(), [])
	useEffect( () => {
		if (private_key.length === 66) {
			const wallet = KardiaAccount.getWalletFromPK(private_key);
			// console.log('wallet private_key: ',wallet)
			//Get KAI balance of a wallet == getKaiBalance
			getKaiBalance(wallet.address);
			setWallet( wallet);
			// console.log('balance : ',balance)
		}
		else {
			getWallet(private_key)
		}
    }, []);
	
	let body = null

	if (postsLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (posts.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h1'>Address {wallet.address}</Card.Header>
					<Card.Body>
						Your address: {wallet.address}
						
					</Card.Body>
					<Card.Text>Your balance: {balance}</Card.Text>
					<Link to='/create-transaction'>
						<Button>
							Transaction
						</Button>
					</Link>
					
				</Card>
			</>
		)
	} else {
		body = (
			<>
				<Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
					{posts.map(post => (
						<Col key={post._id} className='my-2'>
							<SinglePost post={post} />
						</Col>
					))}
				</Row>

				{/* Open Add Post Modal */}
				<OverlayTrigger
					placement='left'
					overlay={<Tooltip>Add a new thing to learn</Tooltip>}
				>
					<Button
						className='btn-floating'
						onClick={setShowAddPostModal.bind(this, true)}
					>
						<img src={addIcon} alt='add-post' width='60' height='60' />
					</Button>
				</OverlayTrigger>
			</>
		)
	}

	return (
		<>
			{body}
			<AddPostModal />
			{post !== null && <UpdatePostModal />}
			{/* After post is added, show toast */}
			<Toast
				show={show}
				style={{ position: 'fixed', top: '20%', right: '10px' }}
				className={`bg-${type} text-white`}
				onClose={setShowToast.bind(this, {
					show: false,
					message: '',
					type: null
				})}
				delay={3000}
				autohide
			>
				<Toast.Body>
					<strong>{message}</strong>
				</Toast.Body>
			</Toast>
		</>
	)
}

export default Dashboard