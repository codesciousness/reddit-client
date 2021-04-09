import React from 'react';
import './FilterList.css';
import Filter from '../../features/filter/Filter';

const flairs = ['Animal Science', 'Anthropology', 'Astronomy', 'Biology', 'Cancer', 'Chemistry', 'Computer Science', 'Earth Science', 'Economics', 'Engineering', 'Environment', 'Epidemiology', 'Geology', 'Health', 'Mathematics', 'Medicine', 'Nanoscience', 'Neuroscience', 'Paleontology', 'Physics', 'Psychology', 'Social Science'];

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