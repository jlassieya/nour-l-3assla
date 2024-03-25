import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import login from '../assets/login.json';
import Lottie from 'lottie-react';


export default function Login() {
  const [nomUtilisateur, setNomUtilisateur] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    // Input validation
    if (!nomUtilisateur || !motDePasse) {
      console.log('Merci de remplir tous les champs.');
      alert('Merci de remplir tous les champs.');
      return;
    }
  
    try {
      // Make API request using Axios
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        nomUtilisateur: nomUtilisateur,
        motDePasse: motDePasse,
      });
  
      // Extract token and role from response
      const { token, message, role } = response.data;
  
      // Save token to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userType', role);
  
      alert(message);
      setNomUtilisateur('');
      setMotDePasse('');
  
      // Redirect based on user's role
      switch (role) {
        case 'ADMIN':
          window.location.href = '/admin/dashboard';
          break;
        case 'USER':
          window.location.href = '/user/dashboard';
          break;
        case 'VOYAGEUR':
          window.location.href = '/voyageur/dashboard';
          break;
        default:
          // Redirect to a default page if role is not recognized
          window.location.href = '/default';
      }
    } catch (error) {
      console.error('La connexion a échoué:', error.response.data);
      // Handle error: show an error message or redirect
    }
  };
  

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex justify-center items-center h-full">
        <Lottie animationData={login}/>
      </div>
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Connecter</h1>
        <input
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          type="text"
          placeholder="NomUtilisateur"
          value={nomUtilisateur}
          onChange={(e) => setNomUtilisateur(e.target.value)}
        />
        <div className="relative w-full mb-4">
          <input
            className="p-2 border border-gray-300 rounded w-full"
            type={showPassword ? 'text' : 'password'}
            placeholder="MotDePasse"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
          />
          <span
            className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2 12s3 4.5 5 6a9 9 0 0010 0c2-1.5 5-6 5-6"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2 12s3 4.5 5 6a9 9 0 0010 0c2-1.5 5-6 5-6"
                ></path>
              </svg>
            )}
          </span>
        </div>
        <p className="mb-2">
          <Link to="/auth/forget-password" className="text-blue-500 cursor-pointer">
          Mot de passe oublié?
          </Link>
        </p>
        <p>
        Vous n'avez pas de compte ?{' '}
          <Link to="/auth/register" className="text-blue-500">
          Inscrivez-vous ici
          </Link>
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={handleLogin}
        >
          Connecter
        </button>
      </div>
    </div>
  );
}