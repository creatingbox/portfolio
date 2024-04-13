// import Navigation from "../Navigation";
import Navigation from "../../Navigation/Navigation";
import './personal_statement.css';
import kimkyeongho from "../../assets/images/kimkyeongho.jpg";

function Personal_Statement() {
  return (
    
      <div className="Personal_Statement">
        {/* <Navigation></Navigation> */}
        <Navigation></Navigation>
        <section className="personal_section1">
          
          <div className="personal_div1">
            <img src={kimkyeongho}></img>
          </div>
          <div className="personal_div2">
            <h1>ABOUT ME</h1>
            <hr></hr>
            <li>이름 : 김경호</li>
            <li>생년월일 : 1997.09.03</li>
            <li>학력사항 
              <br></br>
              <li className="education">
                - 2022.03~2024.02 한국해양대 조선해양시스템공학 석사 졸업
              </li>
              <li className="education">
                - 2016.03~2022.02 한국해양대 조선해양시스템공학 학사 졸업</li>
              <li className="education">
                - 2013.03~2016.02 양운고등학교 졸업
              </li>
            </li>
              <hr></hr>
            <h2>일단 해보자!</h2>
            <br></br>
            <h3>해보지도 않고 포기하기보다는 도전해보자는 생각을 갖고 있습니다.</h3>
          </div>
        </section>
        <section className="personal_section2">
          <h1>Timeline</h1>
        </section>
      </div>

      
  );
}

export default Personal_Statement;
