import React, { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";


const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const navigate = useNavigate();

    const onSubmit = data => {
        const { email, password } = data;
        createUserWithEmailAndPassword(email, password);
    };

    useEffect(() => {
        if (gUser || user) {
            navigate('/');
        }
    }, [gUser, user, navigate])

    let errorMessage;
    if (gError || error) {
        errorMessage = <p className='text-rose-500'>{gError?.message}</p>;
    }

    if (gLoading || loading) {
        return <div className=' flex justify-center items-center'>
            <button className="btn btn-primary loading">loading</button>
        </div>;
    }
    return (
        <div className="card w-sm lg:w-1/2 bg-base-100 shadow-xl mx-auto">
            <div className="card-body">
                <h2 className="card-title justify-center text-4xl text-primary font-bold">REGISTER</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is Required'
                            }
                        })} type="text" placeholder="Your Name" className="input input-bordered w-full " />
                        <label className="label">
                            <span className="label-text-alt">
                                {errors.name?.type === 'required' && <span
                                    className="label-text-alt text-rose-500">{errors.name.message}
                                </span>}
                            </span>
                        </label>
                    </div>
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is Required'
                            },
                            attern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                message: 'Enter a valid Email'
                            }
                        })} type="email" placeholder="Your Email" className="input input-bordered w-full " />
                        <label className="label">
                            <span className="label-text-alt">
                                {errors.email?.type === 'required' && <span
                                    className="label-text-alt text-rose-500">{errors.email.message}
                                </span>}
                                {errors.email?.type === 'pattern' && <span
                                    className="label-text-alt text-rose-500">{errors.email.message}
                                </span>}
                            </span>
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span
                                className="label-text">Password
                            </span>
                        </label>
                        <input
                            type="password"
                            placeholder="Your Password" className="input input-bordered w-full"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Password is Required'
                                },
                                pattern: {
                                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                    message: 'Password must contains at least one upper case, one lower case, one digit, one special character and minimum length 8 characters '
                                }
                            })}
                        />
                        <label className="label">
                            {errors.password?.type === 'required' && <span
                                className="label-text-alt text-rose-500">{errors.password.message}
                            </span>}
                            {errors.password?.type === 'pattern' && <span
                                className="label-text-alt text-rose-500">{errors.password.message}
                            </span>}
                        </label>
                    </div>

                    <input className='btn btn-outline btn-primary w-1/2 mx-auto block font-bold' type="submit" value='LOGIN' />
                </form>
                {errorMessage}
                <p className=' font-semibold'>Already Registered? <NavLink to={'/login'} className=' text-primary'>Please Login</NavLink></p>
                <div className="divider">OR</div>
                <button onClick={() => signInWithGoogle()} className="btn btn-outline btn-primary uppercase w-1/2 mx-auto block font-bold">Continue with google</button>
            </div>
        </div>
    );
};

export default Register;