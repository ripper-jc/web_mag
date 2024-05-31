import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function UserDataForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log({ firstName, lastName, email, phone });
  };

  return (
    <>
      {success ? (
        <section className="flex justify-center items-center flex-col w-64 h-24 bg-green-500 text-white rounded shadow-xl">
          <h1 className="font-bold text-2xl mb-2">Success!</h1>
          <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
            Main Page
          </Link>
        </section>
      ) : null}
      <section className="form">
        <h1>Confirm account</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            id="firstName"
            placeholder="Enter First Name"
          />

          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            id="lastName"
            placeholder="Enter Last Name"
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Enter Email"
          />

          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            placeholder="Enter Phone Number"
          />

          <button
            type="submit"
            onClick={() => {
              setSuccess(true);
            }}
          >
            Confirm
          </button>
        </form>
      </section>
    </>
  );
}

export default UserDataForm;