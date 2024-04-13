import axios from "axios";
import Navigation from "../../Navigation/Navigation";
import { useEffect, useState } from "react";
import './project.css';


function Project() {

  const [data, setData] = useState({activities:[], relations:[]});
  const [showTable, setShowTable] = useState(false);
  const [activeCellIndex, setActiveCellIndex] = useState(null);

  /*시작일과 종료일의 최소 최대값 구하기*/
  const findminmaxdates = () =>{
    if (data.activities.length === 0) {
      return { mindate : null, maxdate : null};
    }

    const startdates = data.activities
      .map((item) => item['Start Date'])
      .filter(Boolean)
      .map((startdate) => new Date(startdate));

    const finishdates = data.activities
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
   
  const {mindate, maxdate} = findminmaxdates();          //최소일, 최대일 찾기
  const dateArray = generateDateArray(mindate, maxdate); //최소일부터 최대일까지의 데이터 배열
  

  //랜덤한 색상 설정하기//
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i =0; i< 6; i++){
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };


  // FInish to Start 연결선 그리기
  const drawFSRelation = () =>{
    // const fsLines = [];
    const FSIndex = [];
    const fsline = [];
    data.relations.forEach(relation =>{
      if (relation.RelationshipType === 'FS'){
        const predecessor = data.activities.find(activity => activity['Activity ID'] === relation.Predecessor);   //relation 데이터의 선행 작업과 동일한 작업 activity 데이터에서 찾기
        const predecessorIndex = data.activities.indexOf(predecessor);                                            //선행 작업의 행 인덱스
        const successor = data.activities.find(activity => activity['Activity ID'] === relation.Successor);       //relation 데이터의 후행 작업과 동일한 작업 activity 데이터에서 찾기
        const successorIndex = data.activities.indexOf(successor);                                                //후행 작업의 행 인덱스
        if (predecessor && successor){
          // Predecessor의 Finish date가 dateArray에 몇 번째 인덱스에 해당하는지 확인
          const predecessorFinishDate = new Date(predecessor['Finish Date']);                                     //선행 작업 종료일 체크
          const predecessorFinishDateIndex = dateArray.findIndex(date => {                                        
            const currentDate = new Date(date);
            return currentDate.toDateString() === predecessorFinishDate.toDateString();
          });                                           
          // successor의 Start date가 dateArray에 몇 번째 인덱스에 해당하는지 확인
          const successorStartDate = new Date(successor['Start Date']);
          const successorFinishDateIndex = dateArray.findIndex(date => {
            const currentDate2 = new Date(date);
            return currentDate2.toDateString() === successorStartDate.toDateString();
          });
          FSIndex.push([predecessorIndex, predecessorFinishDateIndex, successorIndex,successorFinishDateIndex]);  //[선행 작업 행 인덱스, 선행 작업 열 인덱스, 후행 작업 행 인덱스, 후행 작업 열 인덱스]
          fsline.push([predecessorIndex, predecessorFinishDateIndex+1, successorIndex,successorFinishDateIndex-1]);
        }
      }
    });
    return [FSIndex, fsline];
  };

  const [FSIndexList, fsline] = drawFSRelation();

  /*버튼을 클릭했을 때 수행하는 함수*/
  const selectAll=()=>{
    alert("select all!");
    axios.get('http://localhost:4000/data')
    .then(response =>{
      const {activities, relations} = response.data;
      const updatedActivities = activities.map(item => ({
      ...item,
      'Start Date': item['Start Date'] || '2024-01-02',
      'Finish Date': item['Finish Date'] || '2024-01-02',
      'Color' : generateRandomColor(), // 랜덤한 색상 추가
      }));
      setData({activities: updatedActivities, relations});
      setShowTable(true);
      drawFSRelation(); // FS관계 그리기
    })
    .catch(error => {
      console.error('Error', error);
    });
  }

  // 셀이 선택되었는지에 대한 여부확인
  const toggleEllipsis = (index) => {
    if (activeCellIndex === index){
      setActiveCellIndex(null);
    }else{
    setActiveCellIndex(index);
    }
  };

  // 웹에 보여지기 위한 코드
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
                {data.activities.map((item, index) =>(
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
                {data.activities.map((item, rowIndex) => (
                  <tr key={rowIndex}>
                    {dateArray.map((date, dateIndex) => {
                      const startdate = new Date(item['Start Date']);
                      const finishdate = new Date(item['Finish Date']);

                      //해당 작업의 시작일부터 종료일까지의 범위에 속하는지 확인
                      const isActive = date >= startdate && date <= finishdate;

                      //막대의 스타일을 설정
                      const barStyle = {
                        height: '20px', //막대의 높이
                        width: '40px',
                        background : isActive ? item['Color'] : 'transparent', // 작업 기간에 따른 배경색 설정
                      };

                      //막대 양끝에 둥글게 표시
                      if (isActive && date.getTime() === startdate.getTime()){
                        barStyle.borderTopLeftRadius = '5px'; // 시작부분
                        barStyle.borderBottomLeftRadius = '5px';
                      }
                      if (isActive && date.getTime() === finishdate.getTime()){
                        barStyle.borderTopRightRadius = '5px'; // 종료부분
                        barStyle.borderBottomRightRadius = '5px';
                      }
                      

                      //FS 연결선 추가
                      const isFSLine1 = FSIndexList.some(
                        item => item[0] === rowIndex && item[1] ===dateIndex-1
                      );

                      const isFSLine2 = FSIndexList.some(
                        item => item[2] === rowIndex && item[3] ===dateIndex+1
                      );
                      

                      const isFSLine3 = FSIndexList.some(
                        item => item[0] === rowIndex && item[1] ===dateIndex
                      );

                      const isFSarrow = FSIndexList.some(
                        item => item[2] === rowIndex && item[3] ===dateIndex
                      );
                      
                      // isFSLine1.fs-line1.width = '20px';

                      
                      
                      //결과값 반환
                      return(
                        <td key={dateIndex} className={`${isFSLine1 ? 'FS-line1' : ''} ${isFSLine3 ? 'FS-line3' : ''}
                        ${isFSLine2 ? 'FS-line2' : ''} ${isFSarrow ? 'arrow-right' : ''}  `}>
                          <style>
                            {`
                            .FS-line1::after{
                              height : 63px;
                            }
                            `}
                            </style>
                        
                          <div className="gantt-bar" style={barStyle}>
                          </div>
                          
                        </td>
                        
                      );
                      
                    })}
                  </tr>
                ))}
                
                        
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Project;