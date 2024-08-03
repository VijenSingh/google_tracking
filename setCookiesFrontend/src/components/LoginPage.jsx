// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Replace with your actual login logic
//     if (username === 'admin' && password === 'password') {
//         console.table(username,password)
//       localStorage.setItem('isAdmin', 'true');
//       navigate('/track');

//     } else {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <div style={{ padding: '20px', textAlign: 'center' }}>
//       <h1>Admin Login</h1>
//       <form onSubmit={handleLogin}>
//         <div>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div>
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div>
//           <button type="submit">Login</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;


// Client/src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:13148/track/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/track');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
