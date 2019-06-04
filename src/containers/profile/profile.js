import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

import styles from './profile.module.css';
import ProfilePhoto from './../profilePhoto/profilePhoto';
import Charts from './../charts/charts';

const profile = props => {
    let { image, name, rollno, result, resultState, percent, sem, course } = props.student;
    let {clicked, submitClicked} = props;
    
    let color = resultState === 'PASS' ? '#27ae60' : '#e74c3c';

    let height = !clicked ? 35 : 15;
    
    // debugger

    function studentInfo() {
        return (
            <div className = {styles.studentInfo}>
                <h2 className = {styles.studentName}>{name}</h2>
                
                
                <div className = {styles.item}>
                    <div>ROLL NO.</div>
                    <div>{rollno}</div>
                </div>
                
                <div className = {styles.item}>
                    <div>SEMESTER</div>
                    <div>{sem}</div>
                </div>
                
                <div className = {styles.item} style = {{background: 'none', boxShadow: 'none'}}>
                    <div className = {styles.resultState} style = {{backgroundColor: color}}>{resultState}</div>
                        <div>
                            <h3 style = {{color: color, textAlign: 'center', margin: "10px 0"}}>{percent.toFixed(2)}%</h3>
                            <Link to = {`/${course}/results/${sem}/${rollno}/charts/`} 
                                onClick = {submitClicked}
                                style = {{textDecoration:'none'}}>
                                <div className = {styles.button}>
                                    CLICK HERE
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
        )
    }


    return (
        <div className = {styles.main}>
            <div className = {styles.header} style = {{backgroundColor: color, height:height+"vh"}}>
                <ProfilePhoto image = {image} height = {height}/>
            </div>
            
            <Switch>
                <Route path = '/:course/results/:sem/:rollno/charts/' exact component = {Charts}/>
                <Route path = '/:course/results/:sem/:rollno/' render = {studentInfo}/>
            </Switch>
            
        </div>

    )



}

const mapStateToProps = (state) => {
    return {
        student: state.student.profile
    }
}

// const mapDispatchToProps = (dispatch, props) => {
//     return {
//         submitClicked: props.submitClicked,
//     }
// }

export default connect(mapStateToProps)(profile);
