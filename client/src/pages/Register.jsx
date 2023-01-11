import React, {useState} from 'react';
import {Alert, Button, Checkbox, Label, TextInput} from "flowbite-react";
import http from "../../services/axios";
import {useNavigate} from "react-router-dom";

function HiInformationCircle(prop) {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fill-rule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clip-rule="evenodd"
              {...prop}
        />
    </svg>

}

const Register = () => {

    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);


    const handleInputChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await http.post("auth/register", inputs)
            navigate("/")
        } catch (error) {
            setError(error.response.data.msg)
        }
    };


    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-200">

            <form className="flex flex-col gap-4 bg-gray-50 p-10  rounded-xl shadow" onSubmit={onSubmit} method="POST">

                {
                    error && <Alert
                        color="failure"
                        icon={HiInformationCircle}
                        className="max-w-sm"
                    >
                        <p>
                            <span className="font-medium">Info alert!</span>
                            {' '}{error && error}
                        </p>
                    </Alert>
                }

                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="name"
                            value="Your name"
                        />
                    </div>
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        required={true}
                        shadow={true}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="email2"
                            value="Your email"
                        />
                    </div>
                    <TextInput
                        id="email2"
                        type="email"
                        name="email"
                        required={true}
                        shadow={true}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="password2"
                            value="Your password"
                        />
                    </div>
                    <TextInput
                        id="password2"
                        type="password"
                        required={true}
                        shadow={true}
                        name="password"
                        onChange={handleInputChange}

                    />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="agree"/>
                    <Label htmlFor="agree">
                        I agree with the{' '}
                        <a
                            href="/forms"
                            className="text-blue-600 hover:underline dark:text-blue-500"
                        >
                            terms and conditions
                        </a>
                    </Label>
                </div>
                <Button type="submit">
                    Register new account
                </Button>
            </form>
        </div>
    );
};

export default Register;