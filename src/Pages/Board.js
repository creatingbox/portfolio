// import Navigation from "../Navigation";
import Navigation from "../Navigation/Navigation";
import './Board.css';
function Board() {
  //예시 데이터
  const data = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
  ];

  const celldata = [
    [0, 1], [1, 0], [2, 2], [3, 3] 
  ];
  return (
    <div className="Board">
      <Navigation />
      <h>게시판입니다.</h>
      <div className="table-container">
        <table>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className={celldata.some(item => item[0] === rowIndex && item[1] === cellIndex) ? 'diagonal-line' : ''}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Board;
