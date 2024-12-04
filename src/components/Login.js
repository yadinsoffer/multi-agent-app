import React from 'react';
import { useNavigate } from 'react-router-dom';
import icon from '../assets/logoblack.svg';

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#F9FAFB',
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                width: '100%',
                maxWidth: '400px'
            }}>
                <div style={{ 
                    marginBottom: '40px',
                    textAlign: 'center'
                }}>
                    <img 
                        src={icon} 
                        alt="Synthetic Teams Logo" 
                        style={{
                            height: '45px',
                            marginBottom: '32px',
                            marginTop: '8px'
                        }}
                    />
                    <h1 style={{ 
                        fontSize: '24px',
                        fontWeight: '600',
                        color: '#111827',
                        marginBottom: '8px'
                    }}>
                        Welcome Back
                    </h1>
                    <p style={{
                        fontSize: '14px',
                        color: '#6B7280',
                        marginTop: '8px'
                    }}>
                        Sign in to your account
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label
                            htmlFor="email"
                            style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#374151',
                                marginBottom: '8px'
                            }}
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                borderRadius: '6px',
                                border: '1px solid #D1D5DB',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'border-color 0.2s ease',
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label
                            htmlFor="password"
                            style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#374151',
                                marginBottom: '8px'
                            }}
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                borderRadius: '6px',
                                border: '1px solid #D1D5DB',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'border-color 0.2s ease',
                            }}
                        />
                    </div>

                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '24px'
                    }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '14px',
                            color: '#374151',
                            cursor: 'pointer'
                        }}>
                            <input
                                type="checkbox"
                                style={{
                                    marginRight: '8px',
                                    width: '14px',
                                    height: '14px',
                                    cursor: 'pointer'
                                }}
                            />
                            Remember me
                        </label>
                        <a
                            href="#"
                            style={{
                                fontSize: '14px',
                                color: '#3B82F6',
                                textDecoration: 'none'
                            }}
                        >
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#3FC78A',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease',
                        }}
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login; 