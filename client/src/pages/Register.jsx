import { useState } from 'react'
import axios from 'axios';

const Register = () => {

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/register', form, { withCredentials: true });
            alert('Registration successful!');
            console.log(res.data);
        } catch (err) {
            alert(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" onChange={handleChange} required />
            </div>
            <button type="submit">Register</button>
        </form>
    )
}

export default Register