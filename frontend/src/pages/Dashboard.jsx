import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await axios.get('http://localhost:5000/api/expenses', { headers });
    setExpenses(res.data);
  };

  const addExpense = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/expenses',
      { title, amount: Number(amount), category },
      { headers }
    );
    setTitle(''); setAmount(''); setCategory('Food');
    fetchExpenses();
  };

  const deleteExpense = async (id) => {
    await axios.delete(`http://localhost:5000/api/expenses/${id}`, { headers });
    fetchExpenses();
  };

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.logo}>💰 Expense Tracker</h1>
        <div style={styles.userInfo}>
          <span>Hi, {user?.name}!</span>
          <button onClick={logout} style={styles.logoutBtn}>Logout</button>
        </div>
      </div>

      <div style={styles.content}>
        {/* Total Card */}
        <div style={styles.totalCard}>
          <p style={styles.totalLabel}>Total Spent</p>
          <h2 style={styles.totalAmount}>₹{total.toLocaleString()}</h2>
        </div>

        {/* Add Expense Form */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Add Expense</h3>
          <form onSubmit={addExpense}>
            <input style={styles.input} placeholder="Title e.g. Lunch"
              value={title} onChange={e => setTitle(e.target.value)} required />
            <input style={styles.input} type="number" placeholder="Amount (₹)"
              value={amount} onChange={e => setAmount(e.target.value)} required />
            <select style={styles.input} value={category}
              onChange={e => setCategory(e.target.value)}>
              {['Food','Transport','Shopping','Bills','Entertainment','Other'].map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <button style={styles.button} type="submit">Add Expense</button>
          </form>
        </div>

        {/* Expense List */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Recent Expenses</h3>
          {expenses.length === 0 && <p style={{color:'#999'}}>No expenses yet. Add one above!</p>}
          {expenses.map(exp => (
            <div key={exp._id} style={styles.expenseItem}>
              <div>
                <p style={styles.expenseTitle}>{exp.title}</p>
                <span style={styles.badge}>{exp.category}</span>
              </div>
              <div style={styles.expenseRight}>
                <p style={styles.expenseAmount}>₹{exp.amount}</p>
                <button onClick={() => deleteExpense(exp._id)} style={styles.deleteBtn}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f0f2f5' },
  header: { background: '#6c63ff', color: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: '1.5rem' },
  userInfo: { display: 'flex', alignItems: 'center', gap: '1rem' },
  logoutBtn: { background: 'white', color: '#6c63ff', border: 'none', padding: '0.4rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  content: { maxWidth: '600px', margin: '2rem auto', padding: '0 1rem' },
  totalCard: { background: '#6c63ff', color: 'white', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' },
  totalLabel: { opacity: 0.8, marginBottom: '0.5rem' },
  totalAmount: { fontSize: '2.5rem', fontWeight: 'bold' },
  card: { background: 'white', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
  cardTitle: { marginBottom: '1rem', fontSize: '1.2rem' },
  input: { width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', display: 'block' },
  button: { width: '100%', padding: '0.75rem', background: '#6c63ff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' },
  expenseItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #f0f0f0' },
  expenseTitle: { fontWeight: '500', marginBottom: '0.25rem' },
  badge: { background: '#f0f0f0', padding: '0.2rem 0.5rem', borderRadius: '20px', fontSize: '0.75rem', color: '#666' },
  expenseRight: { display: 'flex', alignItems: 'center', gap: '1rem' },
  expenseAmount: { fontWeight: 'bold', color: '#6c63ff' },
  deleteBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }
};

export default Dashboard;