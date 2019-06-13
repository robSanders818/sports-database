import Layout from '../components/layout.js';

export default function Login() {
    return (
        <Layout>
                Login
            <form action = '/login.js'>
                Username: <input type = 'text' name = 'uname'/>
                Password: <input type = 'password' name = 'password'/>
            </form>

        </Layout>
    );
}