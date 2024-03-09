import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';

function Navigation3() {
    const [ activePage, setActivePage ] = useState('home');

    const handlePageClick = (page) => {
        setActivePage(page);
    };

    return (
        <div className='App'>

            <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">

            <div className="container">
                    <a className="navbar-brand" href="/">
                        <img src='../creatingbox.png' alt='Bootstrap' width="30" height="24"></img>
                    </a>
                    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className={`nav-item ${activePage === 'home' ? 'active' : ''}`}>
                                <a className="nav-link active" onClick={()=> handlePageClick('home')} aria-current="page" href="/home">Home</a>
                            </li>
                            <li className={`nav-item ${activePage === 'Personal_Statement' ? 'active' : ''}`}>
                                <a className="nav-link" onClick={()=> handlePageClick('Personal_Statement')} href="/Personal_Statement">Personal Statement</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider"></hr></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navigation3;
