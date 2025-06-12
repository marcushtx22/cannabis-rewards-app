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
      // Fetch customers
      const customersResponse = await fetch('http://localhost:5000/api/customers');
      const customersData = await customersResponse.json();

      // Fetch purchases
      const purchasesResponse = await fetch('http://localhost:5000/api/purchases');
      const purchasesData = await purchasesResponse.json();

      // Calculate statistics
      const totalRevenue = purchasesData.reduce((sum, purchase) => sum + purchase.total, 0);
      const totalPoints = customersData.reduce((sum, customer) => sum + customer.rewardsPoints, 0);

      setStats({
        totalCustomers: customersData.length,
        totalPurchases: purchasesData.length,
        totalRevenue,
        totalPoints
      });

      // Get recent purchases
      const sortedPurchases = [...purchasesData]
        .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate))
        .slice(0, 5);
      setRecentPurchases(sortedPurchases);

      // Get top customers
      const sortedCustomers = [...customersData]
        .sort((a, b) => b.totalSpent - a.totalSpent)
        .slice(0, 5);
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

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <div className="card">
          <h3>Recent Purchases</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {recentPurchases.map(purchase => (
                  <tr key={purchase._id}>
                    <td>{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                    <td>{`${purchase.customer.firstName} ${purchase.customer.lastName}`}</td>
                    <td>${purchase.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/purchases" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            View All Purchases
          </Link>
        </div>

        <div className="card">
          <h3>Top Customers</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Total Spent</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.map(customer => (
                  <tr key={customer._id}>
                    <td>{`${customer.firstName} ${customer.lastName}`}</td>
                    <td>${customer.totalSpent.toFixed(2)}</td>
                    <td>{customer.rewardsPoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/customers" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            View All Customers
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 