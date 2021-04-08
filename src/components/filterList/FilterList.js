import React from 'react';
import './FilterList.css';
import Filter from '../../features/filter/Filter';

const flairs = ['Astronomy', 'Biology', 'Chemistry', 'Computer Science', 'Engineering', 'Environment', 'Geology', 'Health', 'Mathematics', 'Medicine', 'Nanoscience', 'Neuroscience', 'Physics'];

const FilterList = () => {
    return (
        <section className="FilterList">
            <p className="FilterList__prompt">What interests you?</p>
            <div className="FilterList__container">
                {flairs.map(flair => {
                    return <Filter flair={flair} />
                })}
            </div>
        </section>
    );
}

export default FilterList;