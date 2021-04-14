import React from 'react';
import './FilterList.css';
import Filter from '../../features/filter/Filter';

const flairs = ['Animal Science', 'Anthropology', 'Astronomy', 'Biology', 'Cancer', 'Chemistry', 'Computer Science', 'Earth Science', 'Economics', 'Engineering', 'Environment', 'Epidemiology', 'Geology', 'Health', 'Mathematics', 'Medicine', 'Nanoscience', 'Neuroscience', 'Paleontology', 'Physics', 'Psychology', 'Social Science'];

const FilterList = () => {
    return (
        <section className="FilterList">
            <h2 className="FilterList__title">Your Daily Dose of Science</h2>
            <p className="FilterList__prompt">What interests you?</p>
            <ul className="FilterList__container">
                {flairs.map(flair => {
                    return <li key={flair.split(' ')[0].toLowerCase()}><Filter flair={flair} /></li>
                })}
            </ul>
        </section>
    );
}

export default FilterList;