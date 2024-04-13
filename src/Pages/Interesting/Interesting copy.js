import { useState, useEffect  } from "react";
import Navigation from "../../Navigation/Navigation";
import Chart from "chart.js/auto";
import './interesting.css';


function Interesting() {
  const [data, setData] = useState({}); // 객체 형태로 초기화
  const [radarChart, setRadarChart] = useState(null);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      if (radarChart) {
        radarChart.destroy(); // 이전 차트 제거
      }
      const ctx = document.getElementById('radarChart');
      setRadarChart(new Chart(ctx, {
        type: 'radar',
        data: {
          labels: Object.keys(data),
          datasets: [{
            label: 'Performance',
            data: Object.values(data),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            r: {
              suggestedMin: 0,
              suggestedMax: 100
            }
          }
        }
      }));
    }
  }, [data]);



  // 버튼 클릭 이벤트 핸들러
  const handleButtonClick = () => {
    fetch("http://localhost:5000/runAlgorithm")
      .then(res => res.json())
      .then(data => {
        // JSON 데이터 가공
        const processedData = processData(data);
        // 가공된 데이터를 상태에 설정
        setData(processedData);
        console.log(processedData);
        
      });
  };

  // JSON 데이터 가공 함수
  const processData = (jsonData) => {
    const processedData = {};
    // performance 키에 대한 값들을 반복하여 가공
    jsonData.performance.forEach((item,index)=> {
      const key = Object.keys(item)[0]; // 예: "period_performance"
      const value = Math.round(item[key].performance * 100)/100 ; // 예: 99.0
      const upperKey = key.split('_')[0].toUpperCase();
      processedData[upperKey] = value;
      console.log(key.split('_')[0])
    });
    return processedData;
  };

  return (
    <div className="Interesting">
      {/* 버튼에 클릭 이벤트 핸들러 연결 */}
      <button onClick={handleButtonClick}>Check the Score!</button>
      {/* 데이터 표시 */}
      <div>
        <h2>Visualization</h2>
        <table>
          <thead>
              <tr>
                <th>항목</th>
                {Object.keys(data).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Score</td>
                {Object.values(data).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            </tbody>
        </table>
      </div>
      <div style={{width: '800px', height: '800px'}}>
        <canvas id="radarChart" />
      </div>

    </div>
  );
}

export default Interesting;
