import React from 'react';
import '../css/Dashboard.css';

const Dashboard = () => {
  const data = [
    { title: 'Total Sales', value: '$12,345', icon: '📈' },
    { title: 'New Users', value: '150', icon: '👥' },
    { title: 'Website Traffic', value: '3,456', icon: '🌐' },
  ];

  return (
    <div className="dashboard">
      {data.map((item, index) => (
        <div key={index} className="card">
          <div className="icon">{item.icon}</div>
          <h3>{item.title}</h3>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
