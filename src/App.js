// src/App.js
import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './globals.css';
import Home from './pages/Home';
import GroupDetail from './pages/GroupDetail';
import AddStudentModal from './components/AddStudentModal';


// Контекст приложения
export const AppContext = createContext();

const App = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: 'Гриффиндор', students: 200, rating: 1280 },
    { id: 2, name: 'Слизерин', students: 180, rating: 1009, },
    { id: 3, name: 'Когтевран', students: 120, rating: 963,}
  ]);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  // eslint-disable-next-line no-unused-vars
  

  // eslint-disable-next-line no-unused-vars
  

  const addGroup = (newGroup) => {
    const id = groups.length > 0 ? Math.max(...groups.map(g => g.id)) + 1 : 1;
    const groupWithId = { 
      ...newGroup, 
      id, 
      rating: 0,
      students: parseInt(newGroup.students) || 0
    };
    setGroups([...groups, groupWithId]);
  };

  return (
    <AppContext.Provider value={{ 
      groups, 
      addGroup,
      openAddStudentModal: () => setIsAddStudentOpen(true)
    }}>
      <Router>
        <div className="app">
          <div className="main-container">
            <Sidebar onAddStudent={() => setIsAddStudentOpen(true)} />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/group/:id" element={<GroupDetail />} />
              </Routes>
            </div>
          </div>
        </div>
        
        <AddStudentModal 
          isOpen={isAddStudentOpen}
          onClose={() => setIsAddStudentOpen(false)}
        />
      </Router>
    </AppContext.Provider>
  );
};

// Боковая панель
const Sidebar = ({ onAddStudent }) => {
  const [isGroupsOpen, setIsGroupsOpen] = useState(true);

  return (
    <aside className="sidebar">
      <div className="sidebar-actions">
        <h1>ХОГВАРДС</h1>
        
        <div className="dropdown-section">
          <button 
            className="dropdown-toggle" 
            onClick={() => setIsGroupsOpen(!isGroupsOpen)}
          >
            📋 Группы {isGroupsOpen ? '⌃' : '⌄'}
          </button>
          
          {isGroupsOpen && (
            <div className="dropdown-content">
              <button className="dropdown-item active">
                + Новая группа
              </button>
              <button className="dropdown-item">
                Все группы
              </button>
            </div>
          )}
        </div>
        
        <button 
          className="sidebar-user"
          onClick={onAddStudent}
        >
          👤 Добавить ученика
        </button>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-notifications">
          🔔 Уведомления
        </div>
      </div>
    </aside>
  );
};



export default App;