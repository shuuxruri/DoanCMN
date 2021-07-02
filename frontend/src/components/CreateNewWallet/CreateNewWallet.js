import './createWallet.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import {KardiaAccount} from 'kardia-js-sdk';

const CreateNewWallet = () => {
    const wallet = KardiaAccount.generateWallet();
    return(
        <div class="container">
            <div>
                <Link to='/get-private-key'>
                    <Button><div>Create with private key</div> </Button>
                </Link>
                   
                <Link to='/create-keystored-file'>
                    <Button><div>Create with keystored file</div> </Button>
                </Link>

                <Link to='/create-mnemonic-phrase'>
                    <Button><div>Create with mnemonic phrase</div> </Button>
                </Link>
            </div>
        </div>
    )
}
export default CreateNewWallet