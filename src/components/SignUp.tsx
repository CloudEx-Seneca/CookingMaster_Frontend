import React, { useState } from 'react';

const SignUp: React.FC = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Signing up with', email, password);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
      <div>
          <label>First Name:</label>
          <input
            type="firstname"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            // required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="lastname"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // How to create check for confirm password
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
