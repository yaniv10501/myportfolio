/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import Home from './Home';
import Header from './Header';
import About from './About';
import Portfolio from './Portfolio';
import Footer from './Footer';
import { initParticles } from '../utils/particles';
import { handleEmailChange, checkPhoneNumber, checkName, checkMessage } from '../utils/form';
import getPortraitVh from '../utils/costumVh';

const App = function App() {
  smoothscroll.polyfill();

  const { REACT_APP_API_AUTH = 'secret-key' } = process.env;
  console.log(REACT_APP_API_AUTH);

  const [fontLoading, setFontLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [pageLoadText, setPageLoadText] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formResponse, setFormResponse] = useState({
    ok: false,
    message: '',
  });
  const [nameError, setNameError] = useState({
    isValid: false,
    inputError: '',
  });
  const [emailError, setEmailError] = useState({
    isValid: false,
    inputError: '',
  });
  const [phoneNumberError, setPhoneNumberError] = useState({
    isValid: true,
    inputError: '',
  });
  const [messageError, setMessageError] = useState({
    isValid: false,
    inputError: '',
  });
  const [formValid, setFormValid] = useState(false);
  // const [portfolioControlActive, setPortfolioControlActive] = useState(false);

  const handleNameChange = (event) => {
    setNameInput(event.target.value);
    checkName(event.target.value, setNameError);
  };
  const handlePhoneNumberChange = (event) => {
    setPhoneNumberInput(event.target.value);
    checkPhoneNumber(event.target.value, setPhoneNumberError);
  };
  const handleEmailInput = (event) => handleEmailChange(event, setEmailInput, setEmailError);
  const handleMessageChange = (event) => {
    setMessageInput(event.target.value);
    checkMessage(event.target.value, setMessageError);
  };
  const handleFormSubmit = (event) => {
    console.log(process.env);
    event.preventDefault();
    if (!formValid) return;
    setIsLoading(true);
    fetch('https://yanivapi.com/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: emailInput,
        name: nameInput,
        text: messageInput,
        phoneNumber: phoneNumberInput,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        setFormResponse({ ok: true, message: 'Your message was sent successfully' });
      })
      .catch(() => {
        setFormResponse({ ok: false, message: 'Something went wrong, please try again' });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (
      phoneNumberError.isValid &&
      emailError.isValid &&
      nameError.isValid &&
      messageError.isValid
    ) {
      setFormValid(true);
      return;
    }
    setFormValid(false);
  }, [nameInput, phoneNumberInput, emailInput, messageInput]);

  useEffect(() => {
    fetch('/test').then((res) => console.log(res));
    getPortraitVh();
    window.addEventListener('resize', getPortraitVh);
    window.addEventListener('orientationchange', getPortraitVh);
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        event.preventDefault();

        const scrollToElement = document.querySelector(event.target.getAttribute('href'));
        scrollToElement.scrollIntoView({
          behavior: 'smooth',
        });
      });
    });
    initParticles();
  }, []);
  return (
    <div className={fontLoading ? 'page page_hidden' : 'page'}>
      <div className={isPageLoading ? 'page-spinner' : 'page-spinner page-spinner_hidden'}>
        <div className="page-spinner__container">
          <i />
        </div>
        <p className="page-spinner__text">{pageLoadText}</p>
      </div>
      <div className={isPageLoading ? 'content content_hidden' : 'content'}>
        <Home
          setIsPageLoading={setIsPageLoading}
          setPageLoadText={setPageLoadText}
          setFontLoading={setFontLoading}
        />
        <main className="main">
          <Header />
          <About />
          <Portfolio />
          <section className="contact" id="contact">
            <div className={isLoading ? 'spinner' : 'spinner spinner_hidden'}>
              <i />
            </div>
            <form
              noValidate
              className={isLoading ? 'contact__form contact__form_hidden' : 'contact__form'}
              onSubmit={handleFormSubmit}
            >
              <h2 className="contact__title">Contact Me</h2>
              <div className="contact__input-container">
                <input
                  required
                  className="contact__input"
                  placeholder="Name *"
                  value={nameInput}
                  onChange={handleNameChange}
                />
                <span className="contact__input-error">{nameError.inputError}</span>
              </div>
              <div className="contact__input-container">
                <input
                  required
                  className="contact__input"
                  placeholder="Email *"
                  value={emailInput}
                  onChange={handleEmailInput}
                />
                <span className="contact__input-error">{emailError.inputError}</span>
              </div>
              <div className="contact__input-container">
                <input
                  className="contact__input"
                  placeholder="Phone Number"
                  value={phoneNumberInput}
                  onChange={handlePhoneNumberChange}
                />
                <span className="contact__input-error">{phoneNumberError.inputError}</span>
              </div>
              <textarea
                required
                className="contact__text-area"
                placeholder="Your Message *"
                rows="10"
                value={messageInput}
                onChange={handleMessageChange}
              />
              <span className="contact__input-error">{messageError.inputError}</span>
              <button
                className={
                  formValid
                    ? 'contact__submit-button contact__submit-button_active'
                    : 'contact__submit-button'
                }
                type="submit"
              >
                Send
              </button>
              <span
                className="contact__response"
                style={
                  formResponse.ok ? { color: 'var(--successColor)' } : { color: 'var(--failColor)' }
                }
              >
                {formResponse.message}
              </span>
            </form>
          </section>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default App;
