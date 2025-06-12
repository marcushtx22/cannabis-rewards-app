import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CustomerList() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients');
      if (!response.ok) {
        throw new Error('Failed to fetch clients');
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received from server');
      }
      setClients(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        const response = await fetch(`/api/clients/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete client');
        }
        setClients(clients.filter(client => client._id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="table-container">
      <h2>Clients</h2>
      <Link to="/clients/new" className="btn btn-primary" style={{ marginBottom: '1rem' }}>
        Add New Client
      </Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client._id}>
              <td>{client.firstName} {client.lastName}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>{client.points || 0}</td>
              <td>
                <Link to={`/clients/${client._id}`} className="btn btn-primary" style={{ marginRight: '0.5rem' }}>
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(client._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList; 