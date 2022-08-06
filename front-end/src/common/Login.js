import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import BlockViewer from '../BlockViewer';
import { useNavigate, Link, useHistory } from 'react-router-dom';
import { login } from './service/auth.service';
import { AppsConst } from '../shared/AppsConst';

const Login = () => {

    const [checked, setChecked] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()

    async function handleSubmit(event) {

        event.preventDefault();

        console.log('fucntion working');

        // 👇️ access input values here
        console.log('username 👉️', username);
        console.log('password 👉️', password);

        const data = {
            email: username,
            password: password
        };

        const res = await login(data);

        console.log(res);

        if (res.token) {

            localStorage.setItem(AppsConst.isAuth, true);
            localStorage.setItem(AppsConst.token, res.token);
            localStorage.setItem(AppsConst.authId, res.user._id);


            if(res.user.type !== 'USER'){

                history.push('/dashboard')
            }
            else{
                history.push('/home')
            }
            

        } else {
            console.log('error');
        }

        // 👇️ clear all input values in the form
        setUsername('');
        setPassword('');

    };



    return (

        <BlockViewer containerClassName="surface-ground px-4 py-8 md:px-6 lg:px-8 flex align-items-center justify-content-center">
            <div className="surface-card p-4" style={{ minWidth: '400px' }}>
                <div className="text-center mb-5">
                    <img src="images/blocks/logos/epita.png" alt="hyper" height="50" className="mb-3" />
                    <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                    <span className="text-600 font-medium line-height-3">Don't have an account?</span>
                    <button className="p-link font-medium no-underline ml-2 text-blue-500 cursor-pointer">
                        <Link to="/register">
                            Create today!
                        </Link>
                    </button>
                </div>

                <div>
                    <label htmlFor="email1" className="block text-900 font-medium mb-2">Username</label>
                    <InputText id="email1" type="text" className="w-full mb-3"
                        onChange={event => setUsername(event.target.value)}
                        value={username} />

                    <label htmlFor="password1" className="block text-900 font-medium mb-2">Password</label>
                    <InputText id="password1" type="password" className="w-full mb-3"
                        onChange={event => setPassword(event.target.value)}
                        value={password} />

                    <div className="flex align-items-center justify-content-between mb-6">
                        <div className="flex align-items-center">
                            <Checkbox inputId="rememberme1" binary className="mr-2" onChange={e => setChecked(e.checked)} checked={checked} />
                            <label htmlFor="rememberme1">Remember me</label>
                        </div>
                        <button className="p-link font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</button>
                    </div>

                    <Button label="Sign In" icon="pi pi-user" className="w-full" onClick={handleSubmit} />
                </div>
            </div>
        </BlockViewer>

    )

}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Login, comparisonFn);