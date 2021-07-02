import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import {KardiaAccount} from 'kardia-js-sdk';

const GetMnemonicPhrase = () => {
    const wallet = KardiaAccount.generateWallet();
 
    console.log("do dai cua mnemonic ", wallet.mnemonic.phrase.length);
    return(
        <div class="container">
            <Form.Group>
                <Form.Label>Your mnemonic phrase (copy mnemonic phrase)</Form.Label>
                <Form.Control value={wallet.mnemonic.phrase} disabled/>
                <Link to='/create-mnemonic-phrase'>
                    <Button>Ok</Button>
                </Link>
                
            </Form.Group>   
        </div>
    )
}
export default GetMnemonicPhrase