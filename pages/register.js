import Layout from '../components/layout.js';

export default function Register() {
    return (
        <Layout>
                Register For n Account Now!
            <form action = '/login.js'>
                Username: <input type = 'text' name = 'uname'/>
                Password: <input type = 'password' name = 'password'/>
                Confirm Password: <input type = 'password' name = 'password2'/>
                Email: <input type = 'text' name = 'email'/>
                Confirm Email: <input type = 'text' name = 'email2'/>
            </form>

        </Layout>
    );
}