import React, { useState } from 'react';

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password reset requested for', email);
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handlePasswordReset}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default PasswordReset;
