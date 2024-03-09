import React, { useState } from 'react';
import './email.css';
import Navigation from '../Navigation/Navigation';
import emailjs from '@emailjs/browser';

function Send_Email() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    emailjs.sendForm('service_x686pw4', 'template_nfk587c', e.target, 'dG9oDd5x_sS89ULv4');
    alert("제출되었습니다");

    // 클라이언트 측에서는 여기에서 서버로 이메일 및 메시지 데이터를 전송합니다.
    // 서버 측에서는 해당 데이터를 이용해 이메일을 전송하는 로직을 구현해야 합니다.

    // 예를 들어, 서버 API를 호출하거나 웹소켓을 이용하여 서버에 데이터를 전달할 수 있습니다.
    // 서버 측에서는 이메일 전송 라이브러리를 사용해 실제로 이메일을 보낼 수 있습니다.
  };
  
  return (
    <div className='email'>
    <Navigation></Navigation>
      <h1 className='page_title'>Contact Me</h1>
      <form className='contact_form' onSubmit={handleSubmit}>
        <label htmlFor='emailFrom'>Your Email:</label>
        <input
          type='email'
          name='email_from'
          id='emailFrom'
          className='email__from'
          value={email}
          onChange={handleEmailChange}
          required
        />
        <label htmlFor='message'>Message:</label>
        <textarea
          name='message'
          id='message'
          className='message__box'
          value={message}
          onChange={handleMessageChange}
          required
        />
        <button type='submit' className='send_button'>
          Send
        </button>
      </form>
    </div>
  );
}

export default Send_Email;
