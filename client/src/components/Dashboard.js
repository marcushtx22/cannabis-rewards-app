import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalPurchases: 0,
    totalRevenue: 0,
    totalPoints: 0
  });
  const [recentPurchases, setRecentPurchases] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch clients
      const clientsResponse = await fetch('/api/clients');
      if (!clientsResponse.ok) {
        throw new Error('Failed to fetch clients');
      }
      const clientsData = await clientsResponse.json();

      // Fetch transactions
      const transactionsResponse = await fetch('/api/transactions');
      if (!transactionsResponse.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const transactionsData = await transactionsResponse.json();

      // Calculate statistics
      const totalRevenue = Array.isArray(transactionsData) 
        ? transactionsData.reduce((sum, transaction) => sum + (transaction.points || 0), 0)
        : 0;

      const totalPoints = Array.isArray(clientsData)
        ? clientsData.reduce((sum, client) => sum + (client.points || 0), 0)
        : 0;

      setStats({
        totalCustomers: Array.isArray(clientsData) ? clientsData.length : 0,
        totalPurchases: Array.isArray(transactionsData) ? transactionsData.length : 0,
        totalRevenue,
        totalPoints
      });

      // Get recent purchases
      const sortedPurchases = Array.isArray(transactionsData)
        ? [...transactionsData]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5)
        : [];
      setRecentPurchases(sortedPurchases);

      // Get top customers
      const sortedCustomers = Array.isArray(clientsData)
        ? [...clientsData]
            .sort((a, b) => (b.points || 0) - (a.points || 0))
            .slice(0, 5)
        : [];
      setTopCustomers(sortedCustomers);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card">
          <h3>Total Customers</h3>
          <p className="stat">{stats.totalCustomers}</p>
        </div>
        <div className="card">
          <h3>Total Purchases</h3>
          <p className="stat">{stats.totalPurchases}</p>
        </div>
        <div className="card">
          <h3>Total Revenue</h3>
          <p className="stat">${stats.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Total Points</h3>
          <p className="stat">{stats.totalPoints}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        <div className="card">
          <h3>Recent Purchases</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {recentPurchases.map(purchase => (
                  <tr key={purchase._id}>
                    <td>{new Date(purchase.date).toLocaleDateString()}</td>
                    <td>{purchase.client?.name || 'Unknown'}</td>
                    <td>{purchase.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/transactions" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            View All Transactions
          </Link>
        </div>

        <div className="card">
          <h3>Top Customers</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.map(customer => (
                  <tr key={customer._id}>
                    <td>{customer.firstName} {customer.lastName}</td>
                    <td>{customer.points || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/clients" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            View All Customers
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 