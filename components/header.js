import Layout from './layout.js';
import Link from 'next/link';

const headerStyle = {
    border: '0px solid #cdf4f7'
};

const Header = () => (
    <div style = {headerStyle}>
            <h1>KnowItAll</h1>
                <Link href = '/index'>Home</Link>
                <Link href = '/login'>Login</Link>
                <Link href = '/register'>Sign Up</Link>
    
    </div>
);

export default Header;