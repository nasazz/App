

    // import React, { useState } from 'react';
    // import './LoginForm.css'; // Reuse the same CSS file
    // import { FaUserAlt, FaLock } from 'react-icons/fa';
    // import { loginUser, registerUser } from '../../Services/userService'; // Assuming you have services for both
    // import { useNavigate } from 'react-router-dom';

    // function LoginForm() {
    //     const [isRegister, setIsRegister] = useState(false); // State to toggle between login and registration
    //     const [email, setEmail] = useState('');
    //     const [password, setPassword] = useState('');
    //     const [confirmPassword, setConfirmPassword] = useState('');
    //     const [error, setError] = useState('');
    //     const [success, setSuccess] = useState('');
    //     const navigate = useNavigate();

    //     const handleSubmit = async (e) => {
    //         e.preventDefault();
    //         setError('');
    //         setSuccess('');

    //         if (isRegister) {
    //             if (password !== confirmPassword) {
    //                 setError('Passwords do not match.');
    //                 return;
    //             }

    //             try {
    //                 const data = await registerUser(email, password);
    //                 setSuccess('Registration successful!');
    //                 setTimeout(() => {
    //                     setIsRegister(false); // Switch to login after successful registration
    //                 }, 1000);
    //             } catch (err) {
    //                 setError('Registration failed. Please try again.');
    //             }
    //         } else {
    //             try {
    //                 const data = await loginUser(email, password);
    //                 localStorage.setItem('token', data.token);
    //                 setSuccess('Login successful!');
    //                 setTimeout(() => {
    //                     navigate('/dashboard');
    //                 }, 1000);
    //             } catch (err) {
    //                 setError('Login failed. Please check your email and password.');
    //             }
    //         }
    //     };

    //     return (
    //         <div className='wrapper'>
    //             <form onSubmit={handleSubmit}>
    //                 <h1>{isRegister ? 'Register' : 'Login'}</h1>
    //                 {error && <p className="error-message">{error}</p>}
    //                 {success && <p className="success-message">{success}</p>}
    //                 <div className="input-box">
    //                     <input
    //                         type="text"
    //                         placeholder="Email"
    //                         value={email}
    //                         onChange={(e) => setEmail(e.target.value)}
    //                         required
    //                     />
    //                     <FaUserAlt className='icon' />
    //                 </div>
    //                 <div className="input-box">
    //                     <input
    //                         type="password"
    //                         placeholder="Password"
    //                         value={password}
    //                         onChange={(e) => setPassword(e.target.value)}
    //                         required
    //                     />
    //                     <FaLock className='icon' />
    //                 </div>
    //                 {isRegister && (
    //                     <div className="input-box">
    //                         <input
    //                             type="password"
    //                             placeholder="Confirm Password"
    //                             value={confirmPassword}
    //                             onChange={(e) => setConfirmPassword(e.target.value)}
    //                             required
    //                         />
    //                         <FaLock className='icon' />
    //                     </div>
    //                 )}
    //                 <button type='submit'>{isRegister ? 'Register' : 'Login'}</button>
    //                 <div className="register-link">
    //                     <p>
    //                         {isRegister ? (
    //                             <>
    //                                 Already have an account?
    //                                 <a href="#!" onClick={() => setIsRegister(false)}>Login</a>
    //                             </>
    //                         ) : (
    //                             <>
    //                                 Don't have an account?
    //                                 <a href="#!" onClick={() => setIsRegister(true)}>Register</a>
    //                             </>
    //                         )}
    //                     </p>
    //                 </div>
    //             </form>
    //         </div>
    //     );
    // }

    // export default LoginForm;


    import React, { useState } from 'react';
import './LoginForm.css'; // Reuse the same CSS file
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { loginUser, registerUser } from '../../Services/userService'; // Assuming you have services for both
import { useNavigate } from 'react-router-dom';
import { FaBriefcase } from "react-icons/fa6";
import { MdHomeWork } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";


function LoginForm() {
    const [isRegister, setIsRegister] = useState(false); // State to toggle between login and registration
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [plant, setPlant] = useState('');
    const [department, setDepartment] = useState('');
    const [team, setTeam] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (isRegister) {
            if (password !== confirmPassword) {
                setError('Passwords do not match.');
                return;
            }

            try {
                const data = await registerUser(email, password, fullName, plant, department, team, role);
                setSuccess('Registration successful!');
                setTimeout(() => {
                    setIsRegister(false); // Switch to login after successful registration
                }, 1000);
            } catch (err) {
                setError('Registration failed. Please try again.');
            }
        } else {
            try {
                const data = await loginUser(email, password);
                localStorage.setItem('token', data.token);
                setSuccess('Login successful!');
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } catch (err) {
                setError('Login failed. Please check your email and password.');
            }
        }
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>{isRegister ? 'Register' : 'Login'}</h1>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FaUserAlt className='icon' />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FaLock className='icon' />
                </div>
                {isRegister && (
                    <>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                            <FaUserAlt className='icon' />
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="Plant"
                                value={plant}
                                onChange={(e) => setPlant(e.target.value)}
                                required
                            />
                            <FaBriefcase   className='icon' />
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="Department"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                required
                            />
                            <MdHomeWork  className='icon' />
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="Team"
                                value={team}
                                onChange={(e) => setTeam(e.target.value)}
                                required
                            />
                            <RiTeamFill  className='icon' />
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="Role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            />
                            <FaUserAlt className='icon' />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <FaLock className='icon' />
                        </div>
                    </>
                )}
                <button type='submit'>{isRegister ? 'Register' : 'Login'}</button>
                <div className="register-link">
                    <p>
                        {isRegister ? (
                            <>
                                Already have an account?
                                <a href="#!" onClick={() => setIsRegister(false)}>Login</a>
                            </>
                        ) : (
                            <>
                                Don't have an account?
                                <a href="#!" onClick={() => setIsRegister(true)}>Register</a>
                            </>
                        )}
                    </p>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
