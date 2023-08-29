import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import BottomSlider from "./BottomSlider";

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
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  
  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };
 
 
  const editReportDetail = (indexToEdit) => {
    setIsSliderOpen(true)
    setEditIndex(indexToEdit)
    const editedDetail = reportDetails[indexToEdit];
  
    setDeliverables(editedDetail.deliverables);
    setNoOfHours(editedDetail.noOfHours);
    setActivity(editedDetail.activity);
    setPlannedCompletionDate(editedDetail.plannedCompletionDate);
    setActualCompletionDate(editedDetail.actualCompletionDate);
  
  };
  
  const handleSaveEditReport=()=>{
   
    if (
      deliverables === null ||
      noOfHours === null ||
      activity === null ||
      plannedCompletionDate === null ||
      actualCompletionDate === null ||
      deliverables === "" ||
      noOfHours === "" ||
      activity === "" ||
      plannedCompletionDate === "" ||
      actualCompletionDate === ""
    ) {
      alert("Please fill in all fields for the new report detail.");
      return;
    }
  
      // Initialize a new report detail object with input values
      const updatedReportDetails = {
        deliverables: deliverables,
        noOfHours: noOfHours,
        activity: activity,
        plannedCompletionDate: plannedCompletionDate,
        actualCompletionDate: actualCompletionDate,
      };
      
      reportDetails[editIndex]=updatedReportDetails;
      setEditIndex(-1);
         // Clear the input values
    setDeliverables("");
    setNoOfHours("");
    setActivity("");
    setPlannedCompletionDate("");
    setActualCompletionDate("");
    setIsSliderOpen(false)
  }

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
    // Check if any of the fields in newReportDetail are null or empty
  if (
    deliverables === null ||
    noOfHours === null ||
    activity === null ||
    plannedCompletionDate === null ||
    actualCompletionDate === null ||
    deliverables === "" ||
    noOfHours === "" ||
    activity === "" ||
    plannedCompletionDate === "" ||
    actualCompletionDate === ""
  ) {
    alert("Please fill in all fields for the new report detail.");
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

      // Calculate the total number of hours in the report details
  const totalHours = reportDetails.reduce((total, detail) => total + parseInt(detail.noOfHours), 0);
  
  if (totalHours > 42) {
    alert("Total number of hours cannot exceed 42.");
    return;
  }


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
          value={projectName}
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
          value={teamLeaderName}
          className="mt-1 p-2 border rounded-md w-full"
          readOnly
          disabled
        />
      </div>
      </div> 

      <div className=" ">
        <div className="m-6">
          <label
            htmlFor="reportDetailsList"
            className="block font-medium text-gray-700"
          >
            Report Details List
          </label>
        {/* show data */}
        {/* Report Detail Input Section */}
<div className={`bg-gray-50 rounded-lg shadow-xl `}>
  <div className="m-6">
    <h3 className="text-lg font-semibold mb-4">Report Details</h3>
    {reportDetails.length > 0 ? (
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border">Deliverables</th>
            <th className="py-2 px-4 border">Planned Completion Date</th>
            <th className="py-2 px-4 border">Actual Completion Date</th>
            <th className="py-2 px-4 border">No of Hours</th>
            <th className="py-2 px-4 border">Activity</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reportDetails.map((detail, index) => (
            <tr key={index} className={`text-center ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
              <td className="py-2 px-4 border">{detail.deliverables}</td>
              <td className="py-2 px-4 border">{moment(detail.plannedCompletionDate).format("DD-MM-YYYY")}</td>
              <td className="py-2 px-4 border">{moment(detail.actualCompletionDate).format("DD-MM-YYYY")}</td>
              <td className="py-2 px-4 border">{detail.noOfHours}</td>
              <td className="py-2 px-4 border">{detail.activity}</td>
              <td className="py-2 px-4 border flex  justify-around">
                <button onClick={() => editReportDetail(index)} className="text-blue-500 hover:text-blue-700">
                <RiEdit2Line className="text-blue-500 cursor-pointer" onClick={() => editReportDetail(index)} />
            Edit

                </button>
                <button onClick={() => removeReportDetail(index)} className="ml-2 text-red-500 hover:text-red-700">
                <RiDeleteBin6Line className="text-red-500 cursor-pointer ml-2" onClick={() => removeReportDetail(index)} /> Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No report details available.</p>
    )}
  </div>
</div>
            </div>
      </div>
 
      
  {/* Bottom Slider */}
  <BottomSlider isOpen={isSliderOpen} onClose={toggleSlider}>
<div className="m-6">
            {/* add report detail from here */}
      <div  className="bg-gray-50 rounded-lg shadow-xl ">
              <div className="mt-5 mb-4">
                <div className="pt-3 px-3 rounded-md lg:flex lg:gap-4 lg:items-baseline">
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
                    className="mt-1 p-2 border-2 border-slate-300 shadow placeholder:text-gray-600 rounded-md w-full"
                  />
                </div>
              </div>
              <div
                className="  rounded-md md:flex md:items-center md:gap-6  md:justify-evenly"
              >
                <div className="my-4 ">
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
                    className="mt-1 p-2 border-2 border-slate-300 shadow placeholder:text-gray-600 rounded-md w-full"
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
                    className="mt-1 p-2 border-2 border-slate-300 shadow placeholder:text-gray-600 rounded-md w-full"
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
                    value={ noOfHours}
                    onChange={(e) => setNoOfHours(e.target.value)}
                    className="mt-1 p-2 border-2 border-slate-300 shadow placeholder:text-gray-600 rounded-md w-full md:w-[158px]"
                  />
                </div>
              </div>
              <div className="pb-3  rounded-md ">
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
                    value={ activity}
                    onChange={(e) => setActivity(e.target.value)}
                    className="mt-1 p-2 border-2 border-slate-300 shadow placeholder:text-gray-600 rounded-md w-full "
                  />
                </div>
              </div>
            </div>
            { editIndex !== -1 ?  <button
            onClick={handleSaveEditReport}
            
            className="mt-4 bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 transition duration-300"
          >
            save Report Detail 
          </button> :<button
              onClick={addReportDetail}
              
              className="mt-4 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Add Report Detail 
            </button>
           
            }
            </div>
            </BottomSlider>
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

      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        
      >
        Create Weekly Report
      </button>
  {/* Centered Slider Toggle Button */}
  <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={toggleSlider}
          className={`bg-blue-500 text-white py-2 px-4 rounded-tl-full rounded-tr-full hover:bg-blue-600 transition duration-300  ${isSliderOpen ? 'hidden':''} `}
        >
          {isSliderOpen ? (
            <RiArrowDownSLine className="w-6 h-6 inline-block" />
            ) : (
              <RiArrowUpSLine className="w-6 h-6 inline-block" />
          )}
        </button>
      </div>


    </form>
  );
}


export default CreateWeeklyReportPage;
