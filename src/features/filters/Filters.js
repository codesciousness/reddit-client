import React from 'react';
import './Filters.css';

const flairs = ['Astronomy', 'Biology', 'Chemistry', 'Computer Science', 'Engineering', 'Environment', 'Geology', 'Health', 'Mathematics', 'Medicine', 'Nanoscience', 'Neuroscience', 'Physics'];

const Filters = () => {
    return (
        <section className="Filters">
            <h2 className="Filters__heading">Your Daily Dose of Science</h2>
            <p className="Filters__prompt">What interests you?</p>
            <div className="Filters__container">
                {flairs.map(flair => {
                    return <button className="Filters__button">{flair}</button>
                })}
            </div>
        </section>
    );
}

export default Filters;