import React from 'react';
import { useForm } from "react-hook-form";
import TaskCard from './TaskCard';

const Home = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = data => {
        const { email, password } = data;

    };
    return (
        <div className="mockup-phone border-primary w-full h-full">
            <div className="camera w-full"></div>
            <div className="display w-full ">
                <div className="artboard artboard-demo min-h-screen w-full">
                    <div className="hero min-h-screen bg-base-200">
                        <div className="hero-content flex-col lg:flex-row-reverse gap-20">
                            <div className="card  bg-base-100 shadow-xl grow">
                                <TaskCard></TaskCard>
                            </div>
                            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Title</span>
                                            </label>
                                            <input {...register("name", {
                                                required: {
                                                    value: true,
                                                    message: 'Name is Required'
                                                }
                                            })} type="text" placeholder="Your Task Name" className="input input-bordered" />
                                            <label className="label">
                                                <span className="label-text-alt">
                                                    {errors.name?.type === 'required' && <span
                                                        className="label-text-alt text-rose-500">{errors.name.message}
                                                    </span>}
                                                </span>
                                            </label>
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Description</span>
                                            </label>
                                            <textarea {...register("description", {
                                                required: {
                                                    value: true,
                                                    message: 'Description is Required'
                                                }
                                            })}
                                                type="text" placeholder="Your Task in Brief" className="textarea textarea-bordered" />
                                            <label className="label">
                                                <span className="label-text-alt">
                                                    {errors.description?.type === 'required' && <span
                                                        className="label-text-alt text-rose-500">{errors.description.message}
                                                    </span>}
                                                </span>
                                            </label>
                                        </div>
                                        <div className="form-control mt-6">
                                            <input className='btn btn-outline btn-primary w-3/4 mx-auto block font-bold' type="submit" value='ADD TASK' />

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;