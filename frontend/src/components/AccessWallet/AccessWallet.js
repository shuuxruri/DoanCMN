import './accessWallet.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import {KardiaAccount} from 'kardia-js-sdk';
import { useContext, useState } from 'react'

const AccessWallet = () => {
    const wallet = KardiaAccount.generateWallet();
    const [privateKey, setPrivateKey] = useState('')
    return(
        <div class="container">
            <div>
                <Link to='/access-wallet-private-key'>
                    <Button><div>Access wallet with private key</div> </Button>
                </Link>
                   
                <Link to='/access-wallet-keystored-file'>
                    <Button><div>Access wallet with keystored file</div> </Button>
                </Link>

                <Link to='/access-wallet-mnemonic-phrase'>
                    <Button><div>Access wallet with mnemonic phrase</div> </Button>
                </Link>
            </div>
        </div>
    )
}
export default AccessWallet