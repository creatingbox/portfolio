import axios from "axios";
import Navigation from "../../Navigation/Navigation";
import { useEffect, useState } from "react";
import './project.css';

function Project() {

  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [activeCellIndex, setActiveCellIndex] = useState(null);

  const selectAll=()=>{
    alert("select all!");
    axios.get('http://localhost:4000/activities')
    .then(response =>{
      setData(response.data);
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
                    onClick={() => toggleEllipsis(index)}
                  >{item['WBS Code']}</td>
                  <td
                    className={activeCellIndex === index ? "ellipsis-active" : ""}
                    onClick={() => toggleEllipsis(index)}
                  >{item['(*)WBS Name']}</td>
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
      )}
    </div>
  );
}

export default Project;