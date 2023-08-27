import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

function CreateWeeklyReportPage() {
  const { employeeId, projectId } = useParams();
  const [employeeName, setEmployeeName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [remark, setRemark] = useState("");
  const [
    expectedActivitiesOfUpcomingWeek,
    setExpectedActivitiesOfUpcomingWeek,
  ] = useState("");
  
  const [reportStatus, setReportStatus] = useState("IN_PROGRESS");
  const [teamLeaderName, setTeamLeaderName] = useState("");
  
  const [reportDetails, setReportDetails] = useState([]);
  const [deliverables, setDeliverables] = useState("");
  const [noOfHours, setNoOfHours] = useState("");
  const [activity, setActivity] = useState("");
  const [plannedCompletionDate, setPlannedCompletionDate] = useState();
  const [actualCompletionDate, setActualCompletionDate] = useState();
 

  
 
 
  useEffect(() => {
    async function fetchEmployeeAndProjectDetails() {
      try {
        // Fetch employee details by employeeId
        const employeeResponse = await axios.get(
          `http://localhost:8080/employees/${employeeId}`
        );
        setEmployeeName(employeeResponse.data.name);

        // Fetch project details by projectId
        const projectResponse = await axios.get(
          `http://localhost:8080/projects/${projectId}`
        );
        setProjectName(projectResponse.data.projectName);

        console.log(projectResponse.data);

        setTeamLeaderName(projectResponse.data.teamLeader.employeeName);
      } catch (error) {
        console.error("Error fetching employee or project details:", error);
      }
    }

    fetchEmployeeAndProjectDetails();
  }, [employeeId, projectId]);

  const addReportDetail = () => {
    // Check if any of the input fields in the current report detail are empty
    const isCurrentReportDetailEmpty = reportDetails.some(
      (detail) =>
        !detail.plannedCompletionDate ||
        !detail.actualCompletionDate ||
        !detail.deliverables ||
        !detail.noOfHours ||
        !detail.activity
    );

    // If any field is empty, prevent adding new report detail
    if (isCurrentReportDetailEmpty) {
      alert("Please fill in all fields for the current report detail.");
      return;
    }

    // Initialize a new report detail object with input values
    const newReportDetail = {
      deliverables: deliverables,
      noOfHours: noOfHours,
      activity: activity,
      plannedCompletionDate: plannedCompletionDate,
      actualCompletionDate: actualCompletionDate,
    };

  
    // Add the new report detail to the array
    setReportDetails([...reportDetails, newReportDetail]);

    // Clear the input values
    setDeliverables("");
    setNoOfHours("");
    setActivity("");
    setPlannedCompletionDate("");
    setActualCompletionDate("");
  };


  const removeReportDetail = (indexToRemove) => {
    const updatedReportDetails = reportDetails.filter(
      (_, index) => index !== indexToRemove
    );
    setReportDetails(updatedReportDetails);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Construct the data object for the API call

    const reportData = {
      employee: {
        employeeId: employeeId,
        employeeName: employeeName,
      },
      project: {
        projectId: projectId,
        projectName: projectName,
      },
      reportDetailsList: reportDetails,
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
      className="max-w-md w-full mx-auto p-8 bg-white shadow-md rounded-md md:max-w-2xl xl:max-w-3xl"
      onSubmit={handleFormSubmit}
    >
      <div className="mb-4">
        <label
          htmlFor="employeeName"
          className="block font-medium text-gray-700"
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
        <input
          type="text"
          id="teamLeaderName"
          name="teamLeaderName"
          value={teamLeaderName}
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
        {/* show data */}
          {reportDetails.map((detail,index) => (
            <div key={crypto.randomUUID()}>
              <div className="mt-3 mb-1 flex gap-6  items-baseline">
                
                <p className="text-xl text-gray-700">Row {index + 1}</p>
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
                  id={`deliverables_${index}`}
                  name={`deliverables_${index}`}
                    type="text" 
                    value={detail.deliverables}
                    disabled
                    readOnly
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>
              </div>
              <div
                key={index}
                className="mt-2 p-2 border rounded-md md:flex md:items-center md:gap-6  md:justify-evenly"
              >
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
                    value={detail.plannedCompletionDate}
                    disabled
                    readOnly
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
                    value={detail.actualCompletionDate}
                    disabled
                    readOnly
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
                    value={detail.noOfHours}
                    disabled
                    readOnly
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
                    value={detail.activity}
                    disabled
                    readOnly
                    className="mt-1 p-2 border rounded-md w-full "
                  />
                </div>
              </div>
            </div>
          ))}

         
          
        </div>
      </div>


            {/* add report detail from here */}
      <div >
              <div className="mt-5 mb-4">
                <div className="p-2 border rounded-md">
                  <label
                    htmlFor={`deliverables`}
                    className="block font-medium text-gray-700"
                  >
                    Deliverables
                  </label>
                  <input
                    type="text"
                    id={`deliverables`}
                    name={`deliverables`}
                    value={deliverables}
                    onChange={(e)=>setDeliverables(e.target.value)}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>
              </div>
              <div
                className="mt-2 p-2 border rounded-md md:flex md:items-center md:gap-6  md:justify-evenly"
              >
                <div className="my-4">
                  <label
                    htmlFor={`plannedCompletionDate`}
                    className="block font-medium text-gray-700"
                  >
                    Planned Completion Date
                  </label>
                  <input
                    type="date"
                    id={`plannedCompletionDate`}
                    name={`plannedCompletionDate`}
                    value={plannedCompletionDate}
                    onChange={(e) => setPlannedCompletionDate(e.target.value)}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>

                <div className="my-4">
                  <label
                    htmlFor={`actualCompletionDate`}
                    className="block font-medium text-gray-700"
                  >
                    Actual Completion Date
                  </label>
                  <input
                    type="date"
                    id={`actualCompletionDate`}
                    name={`actualCompletionDate`}
                    value={actualCompletionDate}
                    onChange={(e) =>
                     setActualCompletionDate(e.target.value)
                    }
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>
                <div className=" ">
                  <label
                    htmlFor={`noOfHours`}
                    className="block font-medium text-gray-700  w-28"
                  >
                    No of Hours
                  </label>
                  <input
                    type="number"
                    id={`noOfHours`}
                    name={`noOfHours`}
                    value={noOfHours}
                    onChange={(e) => setNoOfHours(e.target.value)}
                    className="mt-1 p-2 border rounded-md w-full md:w-[158px]"
                  />
                </div>
              </div>
              <div className="mt-5 p-2 border rounded-md ">
                <div className="mx-5 my-4 md:flex md:items-center justify-start">
                  <label
                    htmlFor={`activity`}
                    className="block font-medium text-gray-700 w-28 md:w-20 "
                  >
                    Activity
                  </label>
                  <input
                    type="text"
                    id={`activity`}
                    name={`activity`}
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    className="mt-1 p-2 border rounded-md w-full "
                  />
                </div>
              </div>
            </div>
            <button
              onClick={addReportDetail}
              
              className="mt-4 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Add Report Detail 
            </button>

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
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        
      >
        Create Weekly Report
      </button>
    </form>
  );
}

export default CreateWeeklyReportPage;
