import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (

    <div className="App">
      <header className="App-header">
        <img src='./creatingbox.png' className="App-logo" alt="logo" />
        <p>
          KKH's blog
        </p>
        <a
          className="App-link"
          href="/home"
          // target="_blank"     // 새페이지로 열기 위해서 설정
          // rel="noopener noreferrer"
        >
          시작하기
        </a>
      </header>
    </div>


      
  );
}

export default App;
