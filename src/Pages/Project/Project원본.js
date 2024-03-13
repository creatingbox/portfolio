import axios from "axios";
import Navigation from "../../Navigation/Navigation";
import { useEffect, useState } from "react";
import './project.css';

function Project() {

  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [activeCellIndex, setActiveCellIndex] = useState(null);
  // const [dateArray, setDateArray] = useState([]);
  

  // const calculateDuration = (startDate, finishDate) =>{
  //   const start = new Date(startDate);
  //   const finish = new Date(finishDate);
  //   const durationIndays = start - finish;
  //   return durationIndays; 
  // }



  /*시작일과 종료일의 최소 최대값 구하기*/
  const findminmaxdates = () =>{
    if (data.length === 0) {
      return { mindate : null, maxdate : null};
    }

    const startdates = data
      .map((item) => item['Start Date'])
      .filter(Boolean)
      .map((startdate) => new Date(startdate));

    const finishdates = data
      .map((item) => item['Finish Date'])
      .filter(Boolean)
      .map((finishdate) => new Date(finishdate));

    const mindate = startdates.length > 0 ? new Date(Math.min(...startdates)) : new Date('2024-01-02');
    const maxdate = finishdates.length > 0 ? new Date(Math.max(...finishdates)) : new Date('2024-01-08');

    return { mindate, maxdate};
  };

  /*최소일과 최대일을 기준으로 date 열 생성하기 */
  const generateDateArray = (mindate, maxdate) => {
    const dateArray = [];
    let currentDate = new Date(mindate);

    while (currentDate <= maxdate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() +1);
    }
    return dateArray;
  };
   
  const {mindate, maxdate} = findminmaxdates();
  const dateArray = generateDateArray(mindate, maxdate);



  /*버튼을 클릭했을 때 수행하는 함수*/
  const selectAll=()=>{
    alert("select all!");
    axios.get('http://localhost:4000/activities')
    .then(response =>{
      const updatedData = response.data.map(item => ({
      ...item,
      'Start Date': item['Start Date'] || '2024-01-02',
      'Finish Date': item['Finish Date'] || '2024-01-02',
      }));
      setData(updatedData);
      setShowTable(true);

      
    })
    .catch(error => {
      console.error('Error', error);
    });
  }

  const toggleEllipsis = (index) => {
    setActiveCellIndex(index);
  };

  return (
    <div className="Project">
        <Navigation></Navigation>
        <h2>Project 진행한 것에 대한 기록입니다.</h2>
        <button onClick={selectAll}>모두 조회</button>
        {showTable && (
        <div className="tables-container">
          <div className="project-table-container">
            <table className="project-table">
              <thead>
                <tr>
                <th>WBS Code</th>
                <th>WBS Name</th>
                <th>Activity ID</th>
                <th>Activity Name</th>
                <th>Start Date</th>
                <th>Finish Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) =>(
                  <tr key={index}>
                    <td
                      className={activeCellIndex === index ? "ellipsis-active" : ""}
                      onClick={() => toggleEllipsis(index)}>{item['WBS Code']}</td>
                    <td
                      className={activeCellIndex === index ? "ellipsis-active" : ""}
                      onClick={() => toggleEllipsis(index)}>{item['(*)WBS Name']}</td>
                    <td
                      className={activeCellIndex === index ? "ellipsis-active" : ""}
                      onClick={() => toggleEllipsis(index)}>{item['Activity ID']}</td>
                    <td
                      className={activeCellIndex === index ? "ellipsis-active" : ""}
                      onClick={() => toggleEllipsis(index)}>{item['Activity Name']}</td>
                    <td
                      className={activeCellIndex === index ? "ellipsis-active" : ""}
                      onClick={() => toggleEllipsis(index)}>{item['Start Date']}</td>
                    <td
                      className={activeCellIndex === index ? "ellipsis-active" : ""}
                      onClick={() => toggleEllipsis(index)}>{item['Finish Date']}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="time-table-container">
            <table>
              <thead>
              <tr className="year-month">
                {dateArray.reduce((uniqueHeaders, date, index) => {
                  const currentHeader = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
                  const isDuplicate = uniqueHeaders.includes(currentHeader);

                  if (!isDuplicate) {
                    uniqueHeaders.push(currentHeader);
                  }

                  return uniqueHeaders;
                }, []).map((uniqueHeader, index) => (
                  <th key={index} colSpan={dateArray.filter(date => uniqueHeader === `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`).length}>
                    {uniqueHeader}
                  </th>
                ))}
              </tr>
                <tr>
                  {dateArray.map((date,index) =>(
                    <th key={index}>{date.getDate()}</th>
                  ))}</tr>
              </thead>
              <tbody>
                {/* {getGraphData()} */}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Project;