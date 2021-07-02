import './createWallet.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import {KardiaAccount} from 'kardia-js-sdk';
import { useContext, useState } from 'react'

const CreateMnemonicPhrase = () => {
    const wallet = KardiaAccount.generateWallet();
    const [privateKey, setPrivateKey] = useState('')
    return(
        <div class="container">
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Your Private Key (copy private key)</Form.Label>
                <Form.Control value={wallet.privateKey} disabled/>
                <Link to='/register'>
                    <Button>Ok</Button>
                </Link>
            </Form.Group>   
        </div>
    )
}
export default CreateMnemonicPhrase