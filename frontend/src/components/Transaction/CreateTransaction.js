import { PostContext } from '../../contexts/PostContext'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext, useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col'
import SinglePost from '../../components/posts/SinglePost'
import AddPostModal from '../../components/posts/AddPostModal'
import UpdatePostModal from '../../components/posts/UpdatePostModal'
import {KardiaAccount} from 'kardia-js-sdk';
import { Link } from 'react-router-dom'
import KardiaClient from 'kardia-js-sdk';

const RPC_ENDPOINT = 'https://rpc.kardiachain.io/';

const CreateTransaction = () => {
	const [transactionFrom, setTransactionFrom] = useState({
		select_token: '',
		to_address: '',
		amount: 0,
        gas_limit: 0,
		gas_price: 0
	})

    const { select_token, to_address, amount, gas_limit, gas_price } = transactionFrom

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
	
    

    const onChangeTransactionForm = event => 
    setTransactionFrom({
        ...transactionFrom,
        [event.target.name]: event.target.value
    })

    const sendTransaction = async event => {
        event.preventDefault()
        try {
			const kardiaClient = new KardiaClient({ endpoint: RPC_ENDPOINT });
            // Get your wallet's latest nonce
            const nonce = await kardiaClient.account.getNonce(wallet.address);
            console.log("Get your wallet's latest nonce: ", nonce)
            console.log("test from: ", transactionFrom)
            const txData = {
                to: transactionFrom.to_address,
                nonce,
                gas: transactionFrom.gas_limit,      // Gas limit
                gasPrice: 1*10**9,     // Minimum Gas Price = 1 OXY
                value: transactionFrom.amount,    // Amount of KAI to send
              };
              console.log("Send transaction to network and get transaction hash immediately: ", txData)
            // Send transaction to network and get transaction hash immediately
            const txHash = await kardiaClient.transaction.sendTransaction(txData,wallet.privateKey);
            // txHash should be something like '0x0a2db5831c314363a97a79f416061a9daec5230f8b6306cd1c431b467c42f820'
           
            // If you want to wait to the transaction to complete, follow the below code
            const txResult = await kardiaClient.transaction.sendTransaction(
                txData,
                wallet.privateKey,
                true,    // Flag to indicate if you want to wait for the transaction to complete
                50000    // Time (in ms) you want to wait for transaction to complete, default will be 300000 (300s)
              );
              console.log("If you want to wait to the transaction to complete: ", txResult)
         
            

           
		} catch (error) {
			console.log(error)
		}
    }


	const {
		postState: { post, posts, postsLoading },
		getPosts,
		setShowAddPostModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(PostContext)

	const getWallet = async (Mnemonic) => {
		try {
			const wallet =  await KardiaAccount.getWalletFromMnemonic(Mnemonic)
			// console.log('wallet private_key: ',wallet)
			//Get KAI balance of a wallet == getKaiBalance
			getKaiBalance(wallet.address);
			setWallet( wallet);
			// console.log('balance : ',balance)
			// console.log('wallet Mnemonic: ',wallet.privateKey)
			getKaiBalance(wallet.address);
			setWallet( wallet);
        }
        catch(error) {
            console.log("error: ", error)
        }  
	}
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
               <Form className='my-4' onSubmit={sendTransaction}>
                <Form.Group>
                    <Form.Label>Select token KRC20 (required)</Form.Label>
                    <Form.Control 
                        type='text'
                        placeholder="Your KRC20 token" 
                        name='select_token'
                        required
                        value={select_token}
                        onChange={onChangeTransactionForm}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>To Address (required)</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder="Ex. 0x..."
                        name='to_address'
                        required
                        value={to_address}
                        onChange={onChangeTransactionForm}
                    />
                </Form.Group>
               
                <Form.Group>
                    <Form.Label>Amount (required)</Form.Label>
                    <Form.Control 
                        type='text'
                        placeholder="Ex. 1000"
                        name='amount'
                        required
                        value={amount} 
                        onChange={onChangeTransactionForm}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Gas Limit (required)</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder="100000"
                        name='gas_limit'
                        required
                        value={gas_limit} 
                        onChange={onChangeTransactionForm}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Gas Price (required)</Form.Label>
                    <Form.Control 
                        type='text'
                        placeholder="Gas Price"
                        name='gas_price'
                        required
                        value={gas_price} 
                        onChange={onChangeTransactionForm}
                    />
                </Form.Group>

                <Button variant="success" type="submit">
                    Send Token
                </Button>
            </Form>
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

export default CreateTransaction