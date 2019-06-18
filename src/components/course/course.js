import React from 'react';
import styles from './course.module.css';

import posed, {PoseGroup} from 'react-pose';

const Container = posed.div({
    enter: {
        y:0,
        opacity: 1
    },
    exit: {
        y:200,
        opacity:0
    }
})

const Course = props => {
    // debugger
    return (
        <PoseGroup>
            {(props.show && props.course) && [
                <Container key = "agagn" className = {styles.Container} onClick = {(e) => e.stopPropagation()}>
                    <div className = {styles.Cancel} onClick = {props.cancelHandler}>XX</div>
                    <div className = {styles.Content}>
                        <div className = {styles.Title}>{props.course.name}</div>
                        {getContent(props.course)}
                        
                        {getHeading(props.course.courseDetails)}
                        {getStructure(props.course.courseDetails)}
                    </div>
                </Container>
            ]}
        </PoseGroup>
    )
}

function getHeading(semesterArr) {
    if (!semesterArr || semesterArr[0].subjects.length === 0) return null
    return <h3>Course Structure</h3>
}

function getStructure(semesterArr) {
    if (!semesterArr || semesterArr[0].subjects.length === 0) return null
    return semesterArr.map(e => {
        // debugger
        return (
            <div className = {styles.Semester}>
                <h4>{e.semester}</h4>
                <ol>
                    {e.subjects.map(el => (<li>{el}</li>))}
                </ol>
            </div>
        );
    })
}

function getContent(course) {
    const { eligibility, totalSeats, years, desciption, courseDetails } = course;

    if (!eligibility && !totalSeats && !courseDetails) return null

    return (
        <div className = {styles.Details}>
            <div><span>Years: </span>{years}</div>
            <div><span>Eligibility: </span>{eligibility}</div>
            <div><span>Total Seats: </span>{totalSeats}</div>
        </div>
    )
}

export default Course;
