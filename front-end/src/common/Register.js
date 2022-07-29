import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import BlockViewer from '../BlockViewer';
import { Link } from 'react-router-dom';

const Register = () => {

    const [state, setState] = React.useState({
        email: "",
        password: ""
      })

    const [msg, setMsg] = useState('')

    function handleChange(evt) {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
      }

    const [checked, setChecked] = useState(false);

    const submit = ()=> {
        console.log('wel come all good');
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
                    <label htmlFor="email1" className="block text-900 font-medium mb-2">Username</label>
                    <InputText id="email1" type="text" className="w-full mb-3"
                        value={state.email}
                        name="email"
                        onChange={handleChange}/>

                    <label htmlFor="password1" className="block text-900 font-medium mb-2">Password</label>
                    <InputText id="password1" type="password" className="w-full mb-3"
                        value={state.password}
                        name="password"
                        onChange={handleChange}/>

                    <div className="flex align-items-center justify-content-between mb-6">
                        <div className="flex align-items-center">
                            <Checkbox inputId="rememberme1" binary className="mr-2" onChange={e => setChecked(e.checked)} checked={checked} />
                            <label htmlFor="rememberme1">Remember me</label>
                        </div>
                        <button className="p-link font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</button>
                    </div>

                    <Button label="Sign In" icon="pi pi-user" className="w-full" 
                    onClick={submit}/>
                </div>
            </div>
        </BlockViewer>

    )

}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Register, comparisonFn);