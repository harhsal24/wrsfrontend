import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";


function RemarkPage() {
  const { reportId } = useParams();

  const [remark, setRemark] = useState("");
  const [
    expectedActivitiesOfUpcomingWeek,
    setExpectedActivitiesOfUpcomingWeek,
  ] = useState("");
  
  const [reportDetails, setReportDetails] = useState([]);
const [employee, setEmployee] = useState({})
const [project, setProject] = useState({})
const [reportDetailsList, setReportDetailsList] = useState([])
const [reportStatus, setReportStatus] = useState("")
const [teamLeader, setTeamLeader] = useState({})
const [employeeName, setEmployeeName] = useState("")
const [projectName, setProjectName] = useState("")
  useEffect(() => {
  // Fetch the report detail using Axios
  const fetchReportDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/reports/${reportId}`);
      setReportDetails(response.data);
      setEmployee(response.data.employee)
      setEmployeeName(response.data.employee.employeeName)
      setProject(response.data.project)
      setProjectName(response.data.project.projectName)
      setReportDetailsList(response.data.reportDetailsList)
      setReportStatus(response.data.reportStatus)
      setTeamLeader(response.data.project.teamLeader.employeeName)
        
    } catch (error) {
      console.error('Error fetching report detail:', error);
    }
  };

  fetchReportDetail();
  }, [reportId]);

  
  const isFieldMissing = (fieldValue) => {
    return !fieldValue || fieldValue.trim() === "";
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const missingFields = [];

    if (!remark) missingFields.push("Remark");
    if (!expectedActivitiesOfUpcomingWeek) missingFields.push("Expected Activities of Upcoming Week");
    if (!reportStatus) missingFields.push("Report Status");
    
    if (missingFields.length > 0) {
      alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
      return;
    }

      

    const reportData = {
      employee: {
        employeeId: employee.employeeId,
        employeeName: employee.employeeName,
      },
      project: {
        projectId: project.projectId,
        projectName:project.projectName,
      },
      reportDetailsList: reportDetailsList,
      remark: remark,
      expectedActivitiesOfUpcomingWeek: expectedActivitiesOfUpcomingWeek,
      reportStatus: reportStatus,
    };

    try {
      // Send the report data to the backend API
      console.log("reportData");
      console.log(reportData);
      await axios.post(`http://localhost:8080/reports`, reportData);
    } catch (error) {
      console.error("Error creating weekly report:", error);
    }
  };

  return (
    <form
      className="max-w-md w-full mx-auto p-3  shadow-md  md:max-w-2xl lg:max-w-full bg-gray-200"
      onSubmit={handleFormSubmit}
    >
     <div className="border  lg:pt-3 rounded-lg  lg:flex lg:justify-center lg:items-center lg:gap-8  bg-white xl:gap-24 ">
      
      <div className="mb-4 lg:flex xl:items-baseline">
        <label
          htmlFor="employeeName"
          className="block font-medium text-gray-700 xl:w-48"
        >
          Employee Name
        </label>
        <input
          type="text"
          value={employeeName}
          id="employeeName"
          name="employeeName"
          onChange={(e) => setEmployeeName(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
          readOnly
          disabled
        />
      </div>

      <div className="mb-4 lg:flex xl:items-baseline">
        <label
          htmlFor="projectName"
          className="block font-medium text-gray-700 xl:w-40"
        >
          Project Name
        </label>
        <input
          type="text"
          id="projectName"
          name="projectName"
          value={project.projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
          readOnly
          disabled
        />
      </div>

      <div className="mb-4 lg:flex xl:gap-5 xl:items-baseline">
        <label
          htmlFor="teamLeaderName"
          className="block font-medium text-gray-700 xl:w-36"
        >
          Team Leader
        </label>
        <input
          type="text"
          id="teamLeaderName"
          name="teamLeaderName"
          value={teamLeader}
          className="mt-1 p-2 border rounded-md w-full"
          readOnly
          disabled
        />
      </div>
      </div> 

      <div className=" ">
        <div className=" my-2 bg-white p-4 rounded-lg">
          <label
            htmlFor="reportDetailsList"
            className="block font-medium text-gray-700"
          >
            Report Details List
          </label>
        {/* show data */}


    {reportDetailsList.length > 0 ? (
      <table className="min-w-full border-2 shadow-xl  border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border">Deliverables</th>
            <th className="py-2 px-4 border">Planned Completion Date</th>
            <th className="py-2 px-4 border">Actual Completion Date</th>
            <th className="py-2 px-4 border">No of Hours</th>
            <th className="py-2 px-4 border">Activity</th>
          </tr>
        </thead>
        <tbody>
          {reportDetailsList.map((detail, index) => (
            <tr key={index} className={`text-center ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
              <td className="py-2 px-4 border">{detail.deliverables}</td>
              <td className="py-2 px-4 border">{moment(detail.plannedCompletionDate).format("DD-MM-YYYY")}</td>
              <td className="py-2 px-4 border">{moment(detail.actualCompletionDate).format("DD-MM-YYYY")}</td>
              <td className="py-2 px-4 border">{detail.noOfHours}</td>
              <td className="py-2 px-4 border">{detail.activity}</td>          
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No report details available.</p>
    )}


        
            </div>
      </div>
 
      
  
<div className="border p-3 mt-6 max-w-md w-full mx-auto  bg-slate-400 shadow-md  md:max-w-2xl lg:max-w-full">

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
          className={`mt-1 p-2 border rounded-md w-full ${isFieldMissing(remark) ? 'border-red-500' : 'border-gray-300'}`}
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
          className={`mt-1 p-2 border rounded-md w-full ${isFieldMissing(expectedActivitiesOfUpcomingWeek) ? 'border-red-500' : 'border-gray-300'}`}

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
          className={`mt-1 p-2 border rounded-md w-full'border-red-500' : 'border-gray-300'}`}
          >
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="APPROVED">APPROVED</option>
        </select>
      </div>

      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        
      >
        Create Weekly Report
      </button>



    </form>

  );
}


export default RemarkPage;
