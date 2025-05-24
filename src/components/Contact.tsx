"use client";

import { useState } from 'react';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://formspree.io/f/xdkgvawk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail('');
        setMessage('');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <h2 className="sectionTitle">Get in touch</h2>
      <div className="contactContainer">
        {submitted ? (
          <div className="formSuccess">
            <h3>Thank you for your message!</h3>
            <p>I'll get back to you as soon as possible.</p>
            <button 
              className="resetButton" 
              onClick={() => setSubmitted(false)}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contactForm">
            <div className="formGroup">
              <label htmlFor="email" className="formLabel">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                className="formInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="message" className="formLabel">Message</label>
              <textarea
                id="message"
                name="message"
                className="formInput formTextarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Your message..."
                rows={5}
              />
            </div>
            {error && <div className="formError">{error}</div>}
            <button 
              type="submit" 
              className="socialLink emailLink submitButton"
              disabled={isSubmitting}
            >
              <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
