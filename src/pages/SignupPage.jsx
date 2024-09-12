import React, {useState} from 'react';
import {useUserContext} from "../context/UserContext.jsx";
import {handleSignUp} from "../utils/api.js";

const SignupPage = () => {
    const {setUser} = useUserContext();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await handleSignUp(formData);
            const data = await response.json();
            if (response.ok) {
                setUser(data);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="first_name" placeholder="First Name" onChange={handleChange}
                       value={formData.first_name}/>
                <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange}
                       value={formData.last_name}/>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email}/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange}
                       value={formData.password}/>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}

export default SignupPage;