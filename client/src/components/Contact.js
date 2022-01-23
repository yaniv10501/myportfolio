import React, { useState } from 'react';
import useFormValidation from '../utils/useFormValidation';

function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [formResponse, setFormResponse] = useState({
    ok: false,
    message: '',
  });
  const { values, handleChange, errors, isValid, resetForm } = useFormValidation();
  const { email = '', name = '', phoneNumber = '', message = '' } = values;
  const {
    email: emailError,
    name: nameError,
    phoneNumber: phoneNumberError,
    message: messageError,
  } = errors;
  const handleContactSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    setIsLoading(true);
    fetch('/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: email,
        name,
        text: message,
        phoneNumber,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        resetForm();
        setFormResponse({ ok: true, message: 'Your message was sent successfully' });
      })
      .catch(() => {
        setFormResponse({ ok: false, message: 'Something went wrong, please try again' });
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <section className="contact" id="contact">
      <div className={isLoading ? 'spinner' : 'spinner spinner_hidden'}>
        <i />
      </div>
      <form
        noValidate
        className={isLoading ? 'contact__form contact__form_hidden' : 'contact__form'}
        onSubmit={handleContactSubmit}
      >
        <h2 className="contact__title">Contact Me</h2>
        <div className="contact__input-container">
          <input
            required
            className="contact__input"
            name="name"
            placeholder="Name *"
            value={name}
            onChange={handleChange}
          />
          <span className="contact__input-error">{nameError}</span>
        </div>
        <div className="contact__input-container">
          <input
            required
            className="contact__input"
            name="email"
            placeholder="Email *"
            value={email}
            onChange={handleChange}
          />
          <span className="contact__input-error">{emailError}</span>
        </div>
        <div className="contact__input-container">
          <input
            className="contact__input"
            name="phoneNumber"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={handleChange}
          />
          <span className="contact__input-error">{phoneNumberError}</span>
        </div>
        <textarea
          required
          className="contact__text-area"
          name="message"
          placeholder="Your Message *"
          rows="10"
          value={message}
          onChange={handleChange}
        />
        <span className="contact__input-error">{messageError}</span>
        <button
          className={
            isValid
              ? 'contact__submit-button contact__submit-button_active'
              : 'contact__submit-button'
          }
          type="submit"
        >
          Send
        </button>
        <span
          className="contact__response"
          style={formResponse.ok ? { color: 'var(--successColor)' } : { color: 'var(--failColor)' }}
        >
          {formResponse.message}
        </span>
      </form>
    </section>
  );
}

export default Contact;
