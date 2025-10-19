import React, { useContext } from 'react';
import { AppContext } from '../App';
import './groupDetail.css';

const tasks = [
  {
    id: 1,
    title: 'Организация школьного спектакля',
    dates: '12.04 - 26.04',
    level: 'Школьный уровень',
    status: 'Не выполнено',
  },
  {
    id: 2,
    title: 'Принять участие в викторине',
    dates: '10.04 - 17.04',
    level: 'Муниципальный уровень',
    status: 'Не выполнено',
  },
  {
    id: 3,
    title: 'Поучаствовать во ВКОШП',
    dates: '10.04 - 17.04',
    level: 'Всероссийский уровень',
    status: 'Выполнено',
  },
];

const students = [
  { place: 1, name: 'Гришенкин Александр Олегович', grade: '11.2', points: 215 },
  { place: 2, name: 'Харитонова Ксения Андреевна', grade: '10.2', points: 200 },
  { place: 3, name: 'Михальчук Олеся Алексеевна', grade: '8.1', points: 190 },
  { place: 4, name: 'Андреев Николай Александрович', grade: '10.2', points: 160 },
  { place: 5, name: 'Михальчук Игорь Алексеевич', grade: '11.2', points: 130 },
];

export default function GroupDetail() {
  const { openAddStudentModal } = useContext(AppContext);
  
  return (
    <div className="group-detail">
      <section className="section">
        <div className="group-hero">
          <div className="group-avatar" />
          <h1 className="group-title">Гриффиндор</h1>
          <button className="edit-title" aria-label="Редактировать название">✎</button>
        </div>
        <p className="group-desc">
          Среди наших учеников царит дух смелости и отваги. Мы приветствуем инициативу и поощряем самых ярких и активных
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">Задания группы</h2>
        <div className="task-grid">
          {tasks.map((t) => (
            <div className="task-card" key={t.id}>
              <div className="task-title">{t.title}</div>
              <div className="task-meta">
                <div className="meta-left">
                  <div className="meta-row">📅 {t.dates}</div>
                  <div className="meta-row">📌 {t.level}</div>
                </div>
                <div className="meta-right">
                  <span className={`badge ${t.status === 'Выполнено' ? 'done' : 'pending'}`}>{t.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Рейтинг</h2>
        <div className="rating-toolbar">
          <input className="search-input" placeholder="Найти по ФИО..." />
          <button className="btn-primary add-student" onClick={openAddStudentModal}>Добавить ученика</button>
        </div>
        <div className="table-container">
          <table className="rating-table">
            <thead>
              <tr>
                <th>Место</th>
                <th>ФИО</th>
                <th>Класс</th>
                <th>Количество баллов</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.place}>
                  <td>{s.place}</td>
                  <td>{s.name}</td>
                  <td>{s.grade}</td>
                  <td>
                    {s.points} <span className="bolt">⚡</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
