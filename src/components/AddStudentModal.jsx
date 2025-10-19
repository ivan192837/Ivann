import React, { useState } from 'react';
import './AddStudentModal.css';

const students = [
  { id: 1, name: 'Харитонов Андрей Романович', class: '10.2', selected: true },
  { id: 2, name: 'Бондаренко Алексей Игоревич', class: '10.2', selected: false },
  { id: 3, name: 'Пашкина Лариса Николаевна', class: '10.2', selected: false },
  { id: 4, name: 'Алексеева Кристина Аркадьевна', class: '10.2', selected: false },
  { id: 5, name: 'Елизаров Данил Александрович', class: '10.2', selected: false },
];

export default function AddStudentModal({ isOpen, onClose }) {
  const [studentList, setStudentList] = useState(students);

  const toggleStudent = (id) => {
    setStudentList(prev => 
      prev.map(student => 
        student.id === id ? { ...student, selected: !student.selected } : student
      )
    );
  };

  const handleAdd = () => {
    const selectedStudents = studentList.filter(s => s.selected);
    console.log('Добавляем студентов:', selectedStudents);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Добавить ученика</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="students-table">
            <div className="table-header">
              <span>ФИО</span>
              <span>Класс</span>
            </div>
            
            <div className="students-list">
              {studentList.map(student => (
                <label key={student.id} className="student-row">
                  <input
                    type="checkbox"
                    checked={student.selected}
                    onChange={() => toggleStudent(student.id)}
                  />
                  <span className="student-name">{student.name}</span>
                  <span className="student-class">{student.class}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn-add" onClick={handleAdd}>
            Добавить
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Отменить
          </button>
        </div>
      </div>
    </div>
  );
}