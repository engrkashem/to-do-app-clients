import React from 'react';

const TaskCard = () => {
    return (
        <div className="card-body flex justify-between">
            <div className=' flex justify-center items-center gap-10'>
                <div>
                    <h2 className="card-title">Card title!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                </div>
                <div className="card-actions justify-end tooltip  tooltip-error" data-tip="Remove Task"   >
                    <button className="btn btn-outline btn-error">X</button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;