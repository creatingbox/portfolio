import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import './interesting.css';

function Interesting() {
  const [data, setData] = useState({}); // 객체 형태로 초기화
  const [radarChart, setRadarChart] = useState(null);

  useEffect(() => {
    fetchData(); // 컴포넌트가 마운트될 때 데이터를 가져옴
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음으로 렌더링될 때만 실행

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
            borderColor: 'rgba(255, 192, 192, 1)',
            borderWidth: 2,
            
          }]
        },
        options: {
          plugins: {
            legend :{backgroundColor: 'rgba(255,255,255,1)',
            labels:{
              color : 'white',
              font : {
                size : 14,
              }
              }
            }
          },
          scales: {
            r: {
              suggestedMin: 0,
              suggestedMax: 100,
              pointLabels: {
                color: 'white', // 레이블의 글씨 색상 설정
                font : {
                  size : 14,
                }
              }
            }
          }
        }
      }));
    }
  }, [data]);

  // 데이터 가져오는 함수
  const fetchData = () => {
    fetch("http://localhost:5000/runAlgorithm")
      .then(res => res.json())
      .then(data => {
        // JSON 데이터 가공
        const processedData = processData(data);
        // 가공된 데이터를 상태에 설정
        setData(processedData);
        console.log(processedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  // JSON 데이터 가공 함수
  const processData = (jsonData) => {
    const processedData = {};
    // performance 키에 대한 값들을 반복하여 가공
    jsonData.performance.forEach((item, index) => {
      const key = Object.keys(item)[0]; // 예: "period_performance"
      const value = Math.round(item[key].performance * 100) / 100; // 예: 99.0
      const upperKey = key.split('_')[0].toUpperCase();
      processedData[upperKey] = value;
      console.log(key.split('_')[0])
    });
    return processedData;
  };

  return (
    <div className="Interesting">
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
      <div className="randarchart_container">
        <canvas id="radarChart" />
      </div>
      <div className="additional-text">
        <h1>Hi</h1>
      </div>
    </div>
  );
}

export default Interesting;
