import React, { useState } from 'react';

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([
        { name: 'John Doe', favoriteMovie: 'The Shawshank Redemption' },
        { name: 'Jane Smith', favoriteMovie: 'Inception' },
    ]);
    const [newEmployeeName, setNewEmployeeName] = useState('');
    const [newEmployeeMovie, setNewEmployeeMovie] = useState('');

    const addEmployee = () => {
        const newEmployee = { name: newEmployeeName, favoriteMovie: newEmployeeMovie };
        setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
        setNewEmployeeName('');
        setNewEmployeeMovie('');
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Employee Name"
                    className="py-2 px-4 border rounded-l"
                    value={newEmployeeName}
                    onChange={e => setNewEmployeeName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Favorite Movie"
                    className="py-2 px-4 border rounded-r"
                    value={newEmployeeMovie}
                    onChange={e => setNewEmployeeMovie(e.target.value)}
                />
                <button
                    onClick={addEmployee}
                    className="bg-blue-500 text-white py-2 px-4 rounded-r"
                >
                    Add
                </button>
            </div>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Favorite Movie</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="py-2 px-4 border">{employee.name}</td>
                            <td className="py-2 px-4 border">{employee.favoriteMovie}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;
