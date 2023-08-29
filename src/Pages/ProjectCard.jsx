import React, { useState } from 'react';
import Avatar from 'react-avatar';
import randomColor from 'randomcolor';
import Modal from './Modal';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
const ProjectCard = ({ project, selected, setSelectedProjectId ,forShowDetails }) => {
  // Generate a random color for the avatar
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleDeleteIconClick = () => {
    setShowDeleteModal(true);
  };



  const handleDeleteConfirm = () => {
    if (inputValue === project.projectName) {
      // Delete the project here
      console.log('Project deleted:', project.projectName);
      setShowDeleteModal(false);
      // Call a function to delete the project using an API or other means
      // You might want to refresh the project list after deletion
    }
  };

  const avatarColor = randomColor({ seed: project.projectName });
  if(forShowDetails){
   return (<div
    className={`border-2 my-2  bg-white rounded-lg shadow-md p-4 cursor-pointer md:w-[300px] lg:w-[350px] xl:w-[360px] xl:my-3 ${
        selected ? 'bg-blue-300' : 'hover:bg-gray-100'
      }`}
       
    >
      <div className="flex justify-between">
      <Link to={`/projectDetail/${project.projectId}`} >
      <div className="flex items-center mb-3">
        <Avatar
          name={project.projectName}
          size="30"
          round={true}
          color={avatarColor}
          style={{ marginRight: '10px' }}
        />
        <h3 className="text-xl font-semibold">{project.projectName}</h3>
      </div>
        </Link> 

        </div>
        <Link to={`/employeeDetail/${project.teamLeader.employeeId}`} >
          
      <p className="text-gray-600">Team Leader:  <Avatar
          name={project.teamLeader.employeeName}
          size="30"
          round={true}
          color={randomColor({seed:project.teamLeader.employeeName})}
          style={{ marginRight: '10px' }}
        /> {project.teamLeader.employeeName}</p>
        </Link>
      <div className='flex'>
      <p className="text-gray-600"> {formatDate (project.startDate)}</p>
      <p className='px-2'>-</p>
      <p className="text-gray-600"> {formatDate(project.expectedEndDate)}</p>

      </div>
       {/* Delete Project Modal */}
       <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Project"
      >
        <p>Are you sure you want to delete this project?</p>
        <p>Type the project name to confirm: </p>
        <input
          type="text"
          className="border-2 rounded-md p-2 w-full mt-2"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
       <div className="mt-4 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={handleDeleteConfirm}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>)
  }
  return (
    <div
    className={`border-2 my-2  bg-white rounded-lg shadow-md p-4 cursor-pointer md:w-[300px] lg:w-[350px] xl:w-[360px] xl:my-3 ${
        selected ? 'bg-blue-300' : 'hover:bg-gray-100'
      }`}
      onClick={() => setSelectedProjectId(project.projectId)} 
    >
      <div className="flex justify-between">
      <Link to={`/projectDetail/${project.projectId}`} >
      <div className="flex items-center mb-3">
        <Avatar
          name={project.projectName}
          size="30"
          round={true}
          color={avatarColor}
          style={{ marginRight: '10px' }}
        />
        <h3 className="text-xl font-semibold">{project.projectName}</h3>
      </div>
      </Link>
     <div className='flex'>

          <MdDelete
            className="text-red-600 cursor-pointer mr-2"
            onClick={()=>setShowDeleteModal(true)}
            size={25}
            />
            <Link to={`/editProject/${project.projectId}`}>
          <MdEdit className="text-green-600 cursor-pointer" 
            size={25}/>
            </Link>
            </div>
        </div>
        <Link to={`/employeeDetail/${project.teamLeader.employeeId}`} >
          
          <p className="text-gray-600">Team Leader:  <Avatar
              name={project.teamLeader.employeeName}
              size="30"
              round={true}
              color={randomColor({seed:project.teamLeader.employeeName})}
              style={{ marginRight: '10px' }}
            /> Team Leader: {project.teamLeader.employeeName}</p>
            </Link>
      <div className='flex'>
      <p className="text-gray-600"> {formatDate (project.startDate)}</p>
      <p className='px-2'>-</p>
      <p className="text-gray-600"> {formatDate(project.expectedEndDate)}</p>

      </div>
       {/* Delete Project Modal */}
       <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Project"
      >
        <p>Are you sure you want to delete this project?</p>
        <p>Type the project name to confirm: </p>
        <input
          type="text"
          className="border-2 rounded-md p-2 w-full mt-2"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
       <div className="mt-4 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={handleDeleteConfirm}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectCard;
