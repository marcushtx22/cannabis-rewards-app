import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PurchaseForm() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    customer: '',
    items: [{ productName: '', quantity: 1, price: 0, category: 'Flower' }],
    subtotal: 0,
    tax: 0,
    total: 0,
    pointsEarned: 0,
    pointsRedeemed: 0,
    paymentMethod: 'Cash'
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [formData.items]);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/customers');
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax rate
    const total = subtotal + tax;
    const pointsEarned = Math.floor(subtotal); // 1 point per dollar spent

    setFormData(prev => ({
      ...prev,
      subtotal,
      tax,
      total,
      pointsEarned
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: field === 'quantity' || field === 'price' ? Number(value) : value
    };
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { productName: '', quantity: 1, price: 0, category: 'Flower' }]
    }));
  };

  const removeItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save purchase');
      }

      navigate('/purchases');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>New Purchase</h2>
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customer">Customer</label>
          <select
            id="customer"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            required
          >
            <option value="">Select a customer</option>
            {customers.map(customer => (
              <option key={customer._id} value={customer._id}>
                {`${customer.firstName} ${customer.lastName}`}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Items</label>
          {formData.items.map((item, index) => (
            <div key={index} className="item-row" style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  value={item.productName}
                  onChange={(e) => handleItemChange(index, 'productName', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={item.category}
                  onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                  required
                >
                  <option value="Flower">Flower</option>
                  <option value="Edibles">Edibles</option>
                  <option value="Concentrates">Concentrates</option>
                  <option value="Pre-rolls">Pre-rolls</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                  required
                />
              </div>
              {index > 0 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeItem(index)}
                >
                  Remove Item
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={addItem}
          >
            Add Item
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="Cash">Cash</option>
            <option value="Debit">Debit</option>
            <option value="Credit">Credit</option>
          </select>
        </div>

        <div className="form-group">
          <label>Points to Redeem</label>
          <input
            type="number"
            min="0"
            value={formData.pointsRedeemed}
            onChange={(e) => setFormData(prev => ({ ...prev, pointsRedeemed: Number(e.target.value) }))}
          />
        </div>

        <div className="summary" style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <h3>Summary</h3>
          <p>Subtotal: ${formData.subtotal.toFixed(2)}</p>
          <p>Tax (8%): ${formData.tax.toFixed(2)}</p>
          <p>Total: ${formData.total.toFixed(2)}</p>
          <p>Points Earned: {formData.pointsEarned}</p>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: '1rem' }}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Purchase'}
        </button>
      </form>
    </div>
  );
}

export default PurchaseForm; 