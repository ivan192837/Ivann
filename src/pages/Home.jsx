import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

const COLOR_PALETTE = [
  { bg: 'linear-gradient(135deg, #ff8a65, #ffab40)', border: '#ff8a65' }, // orange gradient
  { bg: 'linear-gradient(135deg, #4db6ac, #26a69a)', border: '#4db6ac' }, // teal gradient  
  { bg: 'linear-gradient(135deg, #7986cb, #5c6bc0)', border: '#7986cb' }, // blue gradient
];

// Секция групп
const GroupSection = () => {
  const { groups } = useContext(AppContext);

  return (
    <section className="section">
      <h2 className="section-title">Группы</h2>
      <div className="groups-list">
        {groups.map(group => (
          <GroupCard key={group.id} group={group} />
        ))}
        <AddGroupForm />
      </div>
    </section>
  );
};

// Карточка группы
const GroupCard = ({ group }) => {
  const palette = COLOR_PALETTE;
  const idx = typeof group.id === 'number' ? (group.id - 1) : 0;
  const color = palette[((idx % palette.length) + palette.length) % palette.length];

  return (
    <Link 
      to={group.name === 'Гриффиндор' ? '/group/1' : '#'}
      className="group-card-link"
      style={{ textDecoration: 'none' }}
    >
      <div className="group-card">
        <div className="group-card-header" style={{ background: color.bg }}>
          <div className="group-icon">
            {group.icon}
          </div>
        </div>
        <div className="group-card-footer">
          <h3 className="group-name">{group.name}</h3>
          <span className="student-count">{group.students} учеников</span>
        </div>
      </div>
    </Link>
  );
};

// Форма добавления группы
const AddGroupForm = () => {
  const { addGroup } = useContext(AppContext);
  const [isOpen, setIsOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({ 
    name: '', 
    students: '' 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      addGroup(formData);
      setFormData({ name: '', students: '' });
      setIsOpen(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) {
    return (
      <div className="add-group-card">
        <div className="add-group-content">
          <div className="add-icon">+</div>
          <div className="add-text">Добавить группу</div>
        </div>
      </div>
    );
  }
};

// Секция рейтинга групп
const RatingSection = () => {
  const { groups } = useContext(AppContext);
  const sortedGroups = [...groups].sort((a, b) => b.rating - a.rating);

  return (
    <section className="section">
      <h2 className="section-title">Рейтинг групп</h2>
      <div className="table-container">
        <table className="rating-table">
          <thead>
            <tr>
              <th>Место</th>
              <th>Название группы</th>
              <th>Количество баллов</th>
            </tr>
          </thead>
          <tbody>
            {sortedGroups.map((group, index) => (
              <tr key={group.id}>
                <td className="place-number">{index + 1}</td>
                <td>{group.name}</td>
                <td className="rating-score">
                  {group.rating} ⚡
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="main-panel">
      <GroupSection />
      <RatingSection />
    </div>
  );
}