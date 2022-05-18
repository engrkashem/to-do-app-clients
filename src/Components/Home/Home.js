import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
// import useTask from '../../hooks/useTask';
import TaskCard from './TaskCard';

const Home = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [toDoes, setToDoes] = useState([]);
    const [success, setSuccess] = useState(false);
    const [strikethroug, setStrikethroug] = useState('');

    // const url = `http://localhost:5000/task`;
    const url = `https://blooming-sands-39632.herokuapp.com/task`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setToDoes(data))
    }, [url, success]);

    // const [success, setSuccess] = useState(false);
    // const [toDoes] = useTask(success);

    const onSubmit = data => {
        // const { name, description } = data;
        // const url = `http://localhost:5000/task`;
        const url = `https://blooming-sands-39632.herokuapp.com/task`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSuccess(!success);
                toast('Your To Do Lish is Updated.');
            })
    };

    const handleComplete = () => {
        setStrikethroug('line-through');
        toast.success('All Task Done. Congrats Me!!!!')
    }

    const deleteBtn = id => {
        const proceed = window.confirm('Are You Sure !! Want to Delete the Task??');
        if (proceed) {
            // const url = `http://localhost:5000/task/${id}`;
            const url = `https://blooming-sands-39632.herokuapp.com/task/${id}`;
            fetch(url, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setSuccess(!success);
                })
        }
    }

    return (
        <div className="mockup-phone border-primary w-full h-full">
            <div className="camera w-full"></div>
            <div className="display w-full ">
                <div className="artboard artboard-demo min-h-screen w-full">
                    <div className="hero min-h-screen bg-base-200">
                        <div className="hero-content flex-col lg:flex-row-reverse gap-20">
                            <div className="card  bg-base-100 shadow-xl grow">
                                {
                                    toDoes.map(toDo => <TaskCard
                                        key={toDo._id}
                                        toDo={toDo}
                                        strikethroug={strikethroug}
                                        deleteBtn={deleteBtn}
                                    ></TaskCard>)
                                }

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
                                <button onClick={handleComplete} className="btn btn-outline btn-success w-3/4 mx-auto block mb-5 font-bold">Complete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;