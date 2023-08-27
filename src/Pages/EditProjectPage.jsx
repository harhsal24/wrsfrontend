import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import moment from 'moment';



function EditProjectPage() {
    // const { projectId } = useParams();
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [teamLeader, setTeamLeader] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [listRegularEmployees, setListRegularEmployees] = useState([]);
  const [listTeamLeaders, setListTeamLeaders] = useState([]);
  const { employeeId, projectId } = useParams();
  const [employeeName, setEmployeeName] = useState("");
  const [reportDetails, setReportDetails] = useState([]);
  const [remark, setRemark] = useState("");
  const [
    expectedActivitiesOfUpcomingWeek,
    setExpectedActivitiesOfUpcomingWeek,
  ] = useState("");
  useEffect(() => {
    async function fetchProjectDetails() {
        try {
            // Fetch project details by project ID
            const response = await axios.get(`http://localhost:8080/projects/${projectId}`);
            console.log(response);
            const project = response.data;
            setProjectName(project.projectName);
            setStartDate(moment(project.startDate).format('YYYY-MM-DD')); // Format the start date
            setEndDate(moment(project.expectedEndDate).format('YYYY-MM-DD')); // Format the end date
            setTeamLeader({ value: project.teamLeader.employeeId, label: project.teamLeader.employeeName });
            const selectedEmployeeOptions = project.employees.map(employee => ({
                value: employee.employeeId,
                label: employee.employeeName
            }));
            setSelectedEmployees(selectedEmployeeOptions);
        } catch (error) {
            console.error('Error fetching project details:', error);
        }
      }
      async function fetchRegularEmployees() {
        try {
          const response = await axios.get('http://localhost:8080/employees/byRole/REGULAR_EMPLOYEE');
          const options = response.data.map(employee => ({
            value: employee.employeeId,
            label: employee.employeeName
          }));
          setListRegularEmployees(options);
        } catch (error) {
          console.error('Error fetching regular employees:', error);
        }
      }
      async function fetchTeamLeaders() {
        try {
          const response = await axios.get('http://localhost:8080/employees/byRole/TEAM_LEADER');
          const options = response.data.map(employee => ({
            value: employee.employeeId,
            label: employee.employeeName
          }));
          setListTeamLeaders(options);
        } catch (error) {
          console.error('Error fetching team leaders:', error);
        }
      }
  
      fetchProjectDetails();
      fetchRegularEmployees();
      fetchTeamLeaders();

  }, [projectId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create a project object to submit
    const projectData = {
        teamLeader: { employeeId: teamLeader.value, employeeName: teamLeader.label },
        employees: selectedEmployees.map(employee => ({
          employeeId: employee.value,
          employeeName: employee.label
        })),
        projectId, 
        projectName,
        startDate,
        expectedEndDate: endDate
      };
      
    try {
      // Update project details
      await axios.put(`http://localhost:8080/projects/${projectId}`, projectData);
      console.log("Successfully Updated Project");
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

return (
  <form  className="max-w-md w-full mx-auto p-8 bg-white shadow-md rounded-md md:max-w-2xl xl:max-w-3xl"
  onSubmit={handleFormSubmit}>
    <div className="mb-4">
      <label
        htmlFor="employeeName"
        className="block font-medium text-gray-700"
      >
        Employee Name
      </label>
      <input type="text"
      value={employeeName}
      id="employeeName"
      name="employeeName"
      onChange={(e)=>setEmployeeName(e.target.value)}
      className="mt-1 p-2 border rounded-md w-full"
      readOnly
      disabled
      />
    </div>

    <div className="mb-4">
      <label
        htmlFor="projectName"
        className="block font-medium text-gray-700"
      >
        Project Name
      </label>
      <input
        type="text"
        id="projectName"
        name="projectName"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="mt-1 p-2 border rounded-md w-full"
        readOnly
        disabled
      />
    </div>

    <div className="mb-4">
      <label
        htmlFor="teamLeaderName"
        className="block font-medium text-gray-700"
      >
        Team Leader
      </label>
      <input type="text" id="teamLeaderName" name="teamLeaderName" value={teamLeaderName}
       className="mt-1 p-2 border rounded-md w-full"
       readOnly
       disabled
       />
    </div>


<div className="">
<div className="mb-6">
      <label
        htmlFor="reportDetailsList"
        className="block font-medium text-gray-700"
      >
        Report Details List
      </label>
      {reportDetails.map((detail, index) => (
        <div >
<div className="mt-3 mb-1 flex gap-6  items-baseline">

          <p className="text-xl text-gray-700">Row {index +1}</p>
          <button
      onClick={() => removeReportDetail(index)}
      className=" bg-red-500 text-white  px-2 rounded"
      >
      Remove 
    </button>
      </div>
          <div className="mt-5 mb-4">


<div className="p-2 border rounded-md">

<label
htmlFor={`deliverables_${index}`}
className="block font-medium text-gray-700"
>
Deliverables
</label>
<input
type="text"
id={`deliverables_${index}`}
name={`deliverables_${index}`}
value={detail.deliverables || ""}
onChange={(e) =>
handleReportDetailsChange(index, "deliverables", e.target.value)
}
className="mt-1 p-2 border rounded-md w-full"
/>
</div>


</div>
        <div key={index} className="mt-2 p-2 border rounded-md md:flex md:items-center md:gap-6  md:justify-evenly">
        
<div className="my-4">


          <label
            htmlFor={`plannedCompletionDate_${index}`}
            className="block font-medium text-gray-700"
          >
            Planned Completion Date
          </label>
          <input
            type="date"
            id={`plannedCompletionDate_${index}`}
            name={`plannedCompletionDate_${index}`}
            value={detail.plannedCompletionDate || ""}
            onChange={(e) =>
              handleReportDetailsChange(
                index,
                "plannedCompletionDate",
                e.target.value
              )
            }
            className="mt-1 p-2 border rounded-md w-full"
          />
</div>

<div className="my-4">

          <label
            htmlFor={`actualCompletionDate_${index}`}
            className="block font-medium text-gray-700"
          >
            Actual Completion Date
          </label>
          <input
            type="date"
            id={`actualCompletionDate_${index}`}
            name={`actualCompletionDate_${index}`}
            value={detail.actualCompletionDate || ""}
            onChange={(e) =>
              handleReportDetailsChange(
                index,
                "actualCompletionDate",
                e.target.value
              )
            }
            className="mt-1 p-2 border rounded-md w-full"
          />


</div>
<div className=" ">
<label
htmlFor={`noOfHours_${index}`}
className="block font-medium text-gray-700  w-28"
>
No of Hours 
</label>
<input
type="number"
id={`noOfHours_${index}`}
name={`noOfHours_${index}`}
value={detail.noOfHours || ""}
onChange={(e) =>
  handleReportDetailsChange(index, "noOfHours", e.target.value)
}
className="mt-1 p-2 border rounded-md w-full md:w-[158px]"
/>
</div>

           
        </div>
        <div className="mt-5 p-2 border rounded-md ">
 

<div className="mx-5 my-4 md:flex md:items-center justify-start">

<label
htmlFor={`activity_${index}`}
className="block font-medium text-gray-700 w-28 md:w-20 "
>
Activity
</label>
<input
type="text"
id={`activity_${index}`}
name={`activity_${index}`}
value={detail.activity || ""}
onChange={(e) =>
  handleReportDetailsChange(index, "activity", e.target.value)
}
className="mt-1 p-2 border rounded-md w-full "
/>
</div >
        </div>
        </div>
      ))}
      
      <div className="flex items-center justify-center">

      <button
        onClick={addReportDetail}
        className="my-4 bg-blue-500 text-white py-1 px-2 rounded"
        >
       Tap to Add You'r Report Detail here
      </button>
        </div>
     
    </div>
</div>
    

    <div className="mb-4">
      <label htmlFor="remark" className="block font-medium text-gray-700">
        Remark
      </label>
      <input
        type="text"
        id="remark"
        name="remark"
        value={remark}
        onChange={(e) => setRemark(e.target.value)}
        className="mt-1 p-2 border rounded-md w-full"
      />
    </div>

    <div className="mb-4">
      <label
        htmlFor="expectedActivitiesOfUpcomingWeek"
        className="block font-medium text-gray-700"
      >
        Expected Activities of Upcoming Week
      </label>
      <input
        type="text"
        id="expectedActivitiesOfUpcomingWeek"
        name="expectedActivitiesOfUpcomingWeek"
        value={expectedActivitiesOfUpcomingWeek}
        onChange={(e) => setExpectedActivitiesOfUpcomingWeek(e.target.value)}
        className="mt-1 p-2 border rounded-md w-full"
      />
    </div>

    <div className="mb-4">
      <label
        htmlFor="reportStatus"
        className="block font-medium text-gray-700"
      >
        Report Status
      </label>
      <select
        id="reportStatus"
        name="reportStatus"
        value={reportStatus}
        onChange={(e) => setReportStatus(e.target.value)}
        className="mt-1 p-2 border rounded-md w-full"
      >
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="APPROVED">APPROVED</option>
      </select>
    </div>

    <button
      type="submit"
      className="bg-blue-500 text-white py-2 px-4 rounded"
    >
      Create Weekly Report
    </button>
  </form>
);
}

export default EditProjectPage;
