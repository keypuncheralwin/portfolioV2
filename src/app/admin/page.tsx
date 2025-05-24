'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import styles from './admin.module.css';

interface Visitor {
  id: string;
  ip: string;
  city: string;
  country: string;
  platform: string;
  device: string;
  referrer: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      document.documentElement.setAttribute('data-theme', storedTheme);
      document.body.setAttribute('data-theme', storedTheme);
    }
  }, []);

  useEffect(() => {
    setLoading(false);
  }, []);

  const authenticate = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    
    if (password === adminPassword) {
      setIsAuthenticated(true);
      fetchVisitors();
    } else {
      alert('Incorrect password');
    }
  };

  const fetchVisitors = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('visitors')
      .select('*')
      .order('timestamp', { ascending: false });
    
    if (error) {
      console.error('Error fetching visitors:', error);
    } else {
      setVisitors(data || []);
    }
    setLoading(false);
  };

  // Authentication only stays active for the current session

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <h1>Admin Dashboard</h1>
        <form onSubmit={authenticate} className={styles.authForm}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Website Visitor Analytics</h1>
      </div>
      
      {loading ? (
        <p>Loading visitor data...</p>
      ) : (
        <>
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <h3>Total Visitors</h3>
              <p>{visitors.length}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Unique Countries</h3>
              <p>{new Set(visitors.map(v => v.country)).size}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Mobile Users</h3>
              <p>{visitors.filter(v => v.device === 'Mobile').length}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Desktop Users</h3>
              <p>{visitors.filter(v => v.device === 'PC').length}</p>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Platform</th>
                  <th>Device</th>
                  <th>Referrer</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((visitor) => (
                  <tr key={visitor.id}>
                    <td>{new Date(visitor.timestamp).toLocaleString()}</td>
                    <td>{visitor.city}, {visitor.country}</td>
                    <td>{visitor.platform}</td>
                    <td>{visitor.device}</td>
                    <td>{visitor.referrer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
