import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

// Components
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import PurchaseList from './components/PurchaseList';
import PurchaseForm from './components/PurchaseForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-brand">Cannabis Rewards</div>
          <ul className="nav-links">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/customers">Customers</Link></li>
            <li><Link to="/customers/new">New Customer</Link></li>
            <li><Link to="/purchases">Purchases</Link></li>
            <li><Link to="/purchases/new">New Purchase</Link></li>
          </ul>
        </nav>

        <main className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/new" element={<CustomerForm />} />
            <Route path="/purchases" element={<PurchaseList />} />
            <Route path="/purchases/new" element={<PurchaseForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 