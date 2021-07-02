import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import {KardiaAccount} from 'kardia-js-sdk';

const GetPrivateKey = () => {
    const wallet = KardiaAccount.generateWallet();

    return(
        <div class="container">
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Your Private Key (copy private key)</Form.Label>
                <Form.Control value={wallet.privateKey} disabled/>
                <Link to='/create-private-key'>
                    <Button>Ok</Button>
                </Link>
            </Form.Group>   
        </div>
    )
}
export default GetPrivateKey