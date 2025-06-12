import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PurchaseList() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/purchases');
      if (!response.ok) {
        throw new Error('Failed to fetch purchases');
      }
      const data = await response.json();
      setPurchases(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="table-container">
      <h2>Purchases</h2>
      <Link to="/purchases/new" className="btn btn-primary" style={{ marginBottom: '1rem' }}>
        New Purchase
      </Link>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Points Earned</th>
            <th>Points Redeemed</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map(purchase => (
            <tr key={purchase._id}>
              <td>{formatDate(purchase.purchaseDate)}</td>
              <td>{`${purchase.customer.firstName} ${purchase.customer.lastName}`}</td>
              <td>
                {purchase.items.map((item, index) => (
                  <div key={index}>
                    {item.quantity}x {item.productName} (${item.price.toFixed(2)})
                  </div>
                ))}
              </td>
              <td>${purchase.total.toFixed(2)}</td>
              <td>{purchase.pointsEarned}</td>
              <td>{purchase.pointsRedeemed}</td>
              <td>{purchase.paymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PurchaseList; 