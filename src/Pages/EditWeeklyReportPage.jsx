import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

function EditWeeklyReportPage() {
  const { reportId } = useParams();
  const [report, setReport] = useState({});
  const [editable, setEditable] = useState(false);

  const navigate = useNavigate();


  const [employeeName, setEmployeeName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [plannedCompletionDate, setPlannedCompletionDate] = useState("");
  const [actualCompletionDate, setActualCompletionDate] = useState("");
  const [deliverables, setDeliverables] = useState("");
  const [noOfHours, setNoOfHours] = useState("");
  const [activity, setActivity] = useState("");
  const [remark, setRemark] = useState("");
  const [
    expectedActivitiesOfUpcomingWeek,
    setExpectedActivitiesOfUpcomingWeek,
  ] = useState("");
  const [reportStatus, setReportStatus] = useState("IN_PROGRESS");
  const [teamLeaderName, setTeamLeaderName] = useState("");

  useEffect(() => {
    async function fetchReportDetails() {
      try {
        // Fetch report details by reportId
        const reportResponse = await axios.get(
          `http://localhost:8080/reports/${reportId}`
        );

        const reportData = reportResponse.data;
        console.log(reportData);
        setReport(reportData);
        // Check if the report status is IN_PROGRESS
        if (reportData.reportStatus === "IN_PROGRESS") {
            console.log(reportData)
          setEmployeeName(reportData.employee.employeeName);
          setProjectName(reportData.project.projectName);
          setPlannedCompletionDate(
            moment(reportData.plannedCompletionDate).format("YYYY-MM-DD")
          );
          setActualCompletionDate(
            moment(reportData.actualCompletionDate).format("YYYY-MM-DD")
          );
          setDeliverables(reportData.deliverables);
          setNoOfHours(reportData.noOfHours);
          setActivity(reportData.activity);
          setRemark(reportData.remark);
          setExpectedActivitiesOfUpcomingWeek(
            reportData.expectedActivitiesOfUpcomingWeek
          );
          setReportStatus(reportData.reportStatus);

          // Set other data like team leader name
          setTeamLeaderName(reportData.project.teamLeader.employeeName);
        } else {
          // Redirect or show an error message if the report status is not IN_PROGRESS
          console.error("Cannot edit a report with status other than IN_PROGRESS");
          navigate.push("/"); // Redirect to the main page or handle the error as needed
        }
      } catch (error) {
        console.error("Error fetching report details:", error);
      }
    }

    fetchReportDetails();
  }, [reportId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Construct the data object for the API call
    const updatedReportData = {
        employee: {
            employeeId: report.employee.employeeId, 
            employeeName: employeeName,
          },
          project: {
            projectId: report.project.projectId, 
            projectName: projectName,
          },
        plannedCompletionDate: plannedCompletionDate,
        actualCompletionDate: actualCompletionDate,
        deliverables: deliverables,
        noOfHours: noOfHours,
        activity: activity,
        remark: remark,
        expectedActivitiesOfUpcomingWeek: expectedActivitiesOfUpcomingWeek,
        reportStatus: reportStatus
      };

    try {
      // Send the report data to the backend API
      await axios.put(`http://localhost:8080/reports/${reportId}`, updatedReportData);
    } catch (error) {
      console.error("Error creating weekly report:", error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-4">
        <label
          htmlFor="employeeName"
          className="block font-medium text-gray-700"
        >
          Employee Name
        </label>
        <p>{employeeName}</p>
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
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="teamLeaderName"
          className="block font-medium text-gray-700"
        >
          Team Leader
        </label>
        <p>{teamLeaderName}</p>
      </div>

      <div className="mb-4">
        <label
          htmlFor="plannedCompletionDate"
          className="block font-medium text-gray-700"
        >
          Planned Completion Date
        </label>
        <input
          type="date"
          id="plannedCompletionDate"
          name="plannedCompletionDate"
          value={plannedCompletionDate}
          onChange={(e) => setPlannedCompletionDate(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div className="mb-4">
  <label htmlFor="actualCompletionDate" className="block font-medium text-gray-700">
    Actual Completion Date
  </label>
  <input
    type="date"
    id="actualCompletionDate"
    name="actualCompletionDate"
    value={actualCompletionDate}
    onChange={(e) => setActualCompletionDate(e.target.value)}
    className="mt-1 p-2 border rounded-md w-full"
  />
</div>

<div className="mb-4">
  <label htmlFor="deliverables" className="block font-medium text-gray-700">
    Deliverables
  </label>
  <input
    type="text"
    id="deliverables"
    name="deliverables"
    value={deliverables}
    onChange={(e) => setDeliverables(e.target.value)}
    className="mt-1 p-2 border rounded-md w-full"
  />
</div>

<div className="mb-4">
  <label htmlFor="noOfHours" className="block font-medium text-gray-700">
    Number of Hours
  </label>
  <input
    type="number"
    id="noOfHours"
    name="noOfHours"
    value={noOfHours}
    onChange={(e) => setNoOfHours(e.target.value)}
    className="mt-1 p-2 border rounded-md w-full"
  />
</div>

<div className="mb-4">
  <label htmlFor="activity" className="block font-medium text-gray-700">
    Activity
  </label>
  <input
    type="text"
    id="activity"
    name="activity"
    value={activity}
    onChange={(e) => setActivity(e.target.value)}
    className="mt-1 p-2 border rounded-md w-full"
  />
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
        disabled={editable}
      >
        Edit Weekly Report
      </button>
    </form>
  );
}

export default EditWeeklyReportPage;
