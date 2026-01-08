import React, { useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const {signOut, session, loading} = UserAuth();

  useEffect(() => {
    if (!loading && !session) {
      navigate("/login");
    }
  }, [session, loading, navigate]);

  const handleSignOut = async () =>{
    const result = await signOut();
    if(result.success){
      navigate("/login");
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div>
      <div>
        <h1>Dashboard</h1>
        <p>Welcome, {session.user.email}!</p>
      </div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default Dashboard;