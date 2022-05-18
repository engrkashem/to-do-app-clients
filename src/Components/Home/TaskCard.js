import React from 'react';

const TaskCard = ({ toDo: { name, description, _id }, strikethroug, deleteBtn }) => {

    const handleDelete = (id) => {
        deleteBtn(id)
    }

    return (
        <div className="card-body flex justify-between">
            <div className=' flex justify-center items-center gap-10'>
                <div>
                    <h2 className={strikethroug ? `card-title text-2xl ${strikethroug}` : 'card-title text-2xl'}>{name}</h2>
                    <p className={strikethroug ? `text-left mt-5 text-xl ${strikethroug}` : 'text-left mt-5 text-xl'}>{description}</p>
                </div>
                <div className="card-actions justify-end tooltip  tooltip-error" data-tip="Remove Task"   >
                    <button onClick={() => handleDelete(_id)} className="btn btn-outline btn-error">X</button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;