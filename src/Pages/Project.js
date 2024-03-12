import axios from "axios";
import Navigation from "../Navigation/Navigation";
import { useEffect, useState } from "react";

function Project() {

  const [data, setData] = useState([]);

  // useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             const response = await axios.get('http://localhost:4000/customers');
  //             setData(response.data);
  //         } catch (error) {
  //             console.error('Error:', error);
  //         }
  //     };

  //     fetchData();
  // }, []);

  const selectAll=()=>{
    alert("select all!");
    axios.get('http://localhost:4000/customers');
    alert("check")
  }


  return (
    <div className="Project">
        <Navigation></Navigation>
        <h2>Project 진행한 것에 대한 기록입니다.</h2>
        <button onClick={selectAll}>모두 조회</button>
        <div>
          <h3>가져온 데이터:</h3>
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
    </div>
  );
}

export default Project;