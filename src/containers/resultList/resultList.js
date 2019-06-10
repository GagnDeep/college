import React from 'react';
import { withRouter } from 'react-router-dom';
import { useGetData, formatData } from './../../utility/utility';
import List from './../../components/resultList/resultList';



const ResultList = props => {
    const course = props.match.params.course,
          sem = props.match.params.sem,
          url = `https://college-2d3b0.firebaseio.com/${course}/partial.json`;

    let [resultData] = useGetData(url);
    resultData = formatData(resultData, sem)
    
    return (
        <List showList = {resultData.length!==0}
              resultData = {resultData}>RESULT LIST<p style = {{fontSize:"14px"}}>Click on Name to view profile</p></List>
    );
}



export default withRouter(ResultList);
