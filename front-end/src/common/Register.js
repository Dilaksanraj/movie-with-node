import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import BlockViewer from '../BlockViewer';
import { Link, useHistory } from 'react-router-dom';
import { register } from './service/auth.service';
import { Calendar } from 'primereact/calendar';

const Register = () => {

    const [checked, setChecked] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [fName, setFirstName] = useState('');
    const [lName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [dob, setDob] = useState(null);

    const [msg, setMsg] = useState('')

    const history = useHistory()
    async function handleSubmit(event) {

        event.preventDefault();

        const data = {
            email: email,
            password: password,
            first_name: fName,
            last_name: lName,
            dob: `${new Date(dob).getDate()}-${new Date(dob).getMonth()}-${new Date(dob).getFullYear()}`
        };

        const res = await register(data);

        if (res.data) {
            //   context.updateAuth(true)
            history.push('/login')
        } else {
            
            console.log('error');
        }

        // 👇️ clear all input values in the form
        setEmail('');
        setPassword('');
        setCPassword('');
        setFirstName('');
        setLastName('');
        setDob(null);
        setCPassword('');

    };

    function buttonValidation() {

        console.log('working');
        if (fName !== '' && lName !== '' && email !== '' && password !== '' && cPassword !== '' && dob !== '') {
            setDisabled(false)
        }

        else{

            setDisabled(true)
        }
        
    }




    return (

        <BlockViewer containerClassName="surface-ground px-4 py-8 md:px-6 lg:px-8 flex align-items-center justify-content-center">
            <div className="surface-card p-4" style={{ minWidth: '400px' }}>
                <div className="text-center mb-5">
                    <img src="images/blocks/logos/epita.png" alt="hyper" height="50" className="mb-3" />
                    <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                    <span className="text-600 font-medium line-height-3">Already have an account?</span>
                    <button className="p-link font-medium no-underline ml-2 text-blue-500 cursor-pointer">
                        <Link to="/login">
                            Login!
                        </Link>
                    </button>
                </div>

                <div>
                    <label htmlFor="first name" className="block text-900 font-medium mb-2">Fisrst name</label>
                    <InputText id="first_name" type="text" className="w-full mb-3"
                        onChange={event => {
                            setFirstName(event.target.value)
                            buttonValidation()
                        }}
                        value={fName} />

                    <label htmlFor="last name" className="block text-900 font-medium mb-2">Last name</label>
                    <InputText id="last_name" type="text" className="w-full mb-3"
                        onChange={event => {
                            setLastName(event.target.value)
                            buttonValidation()
                        }}
                        value={lName} />

                    <label htmlFor="email1" className="block text-900 font-medium mb-2">Email</label>
                    <InputText id="email1" type="text" className="w-full mb-3"
                        onChange={event => {
                            setEmail(event.target.value)
                            buttonValidation()
                        }}
                        value={email} />

                    <label htmlFor="password1" className="block text-900 font-medium mb-2">Date of birth</label>
                    <Calendar style={{ width: '100%' }} inputId="calendar" value={dob}
                        onChange={event => {
                            setDob(event.target.value)
                            buttonValidation()
                        }} className="p-invalid" showIcon />

                    <label htmlFor="password1" className="block text-900 font-medium mb-2">Password</label>
                    <InputText id="password1" type="password" className="w-full mb-3"
                        onChange={event => {
                            setPassword(event.target.value)
                            buttonValidation()
                        }}
                        value={password} />

                    <label htmlFor="password1" className="block text-900 font-medium mb-2"> Confirm assword</label>
                    <InputText id="password1" type="password" className="w-full mb-3"
                        onChange={event => {
                            setCPassword(event.target.value)
                            buttonValidation()
                        }}
                        value={cPassword} />

                    <div className="flex align-items-center justify-content-between mb-6">
                        <div className="flex align-items-center">
                            <Checkbox inputId="rememberme1" binary className="mr-2" onChange={e => setChecked(e.checked)} checked={checked} />
                            <label htmlFor="rememberme1">Remember me</label>
                        </div>
                        <button className="p-link font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</button>
                    </div>

                    <Button label="Sign In" icon="pi pi-user" className="w-full"
                        disabled={disabled}
                        onClick={handleSubmit} />
                </div>
            </div>
        </BlockViewer>

    )

}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Register, comparisonFn);