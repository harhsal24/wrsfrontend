import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditWeeklyReportPage() {
  const { reportId } = useParams();
  const [employeeName, setEmployeeName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [reportDetails, setReportDetails] = useState([]);
  const [remark, setRemark] = useState("");
  const [expectedActivitiesOfUpcomingWeek, setExpectedActivitiesOfUpcomingWeek] = useState("");
  const [reportStatus, setReportStatus] = useState("IN_PROGRESS");
  const [teamLeaderName, setTeamLeaderName] = useState("");

  useEffect(() => {
    async function fetchReportDetails() {
      try {
        // Fetch report details by reportId
        const reportResponse = await axios.get(`http://localhost:8080/reports/${reportId}`);
        const reportData = reportResponse.data;

        setEmployeeName(reportData.employee.employeeName);
        setProjectName(reportData.project.projectName);
        setReportDetails(reportData.reportDetailsList);
        setRemark(reportData.remark);
        setExpectedActivitiesOfUpcomingWeek(reportData.expectedActivitiesOfUpcomingWeek);
        setReportStatus(reportData.reportStatus);

        // Assuming that reportData.project.teamLeader exists
        setTeamLeaderName(reportData.project.teamLeader.employeeName);
      } catch (error) {
        console.error("Error fetching report details:", error);
      }
    }

    fetchReportDetails();
  }, [reportId]);

  const handleReportDetailsChange = (index, field, value) => {
    const updatedReportDetails = [...reportDetails];
    updatedReportDetails[index][field] = value;
    setReportDetails(updatedReportDetails);
  };


  
  const addReportDetail = () => {
    // Check if any of the input fields in the current report detail are empty
    const isCurrentReportDetailEmpty =
      reportDetails.some(
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
  
    // Add a new empty report detail to the array
    setReportDetails([...reportDetails, {}]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedReportData = {
      employee: {
        employeeName: employeeName,
      },
      project: {
        projectName: projectName,
      },
      reportDetailsList: reportDetails,
      remark: remark,
      expectedActivitiesOfUpcomingWeek: expectedActivitiesOfUpcomingWeek,
      reportStatus: reportStatus,
    };

    try {
      // Send the updated report data to the backend API
      await axios.put(`http://localhost:8080/reports/${reportId}`, updatedReportData);
    } catch (error) {
      console.error("Error updating weekly report:", error);
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

      {/* Team Leader Display */}
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
    htmlFor="reportDetailsList"
    className="block font-medium text-gray-700"
  >
    Report Details List
  </label>
  {reportDetails.map((detail, index) => (
    <div key={index} className="mt-2 p-2 border rounded-md">
      <p>Row {index + 1}</p>
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

      <label
        htmlFor={`noOfHours_${index}`}
        className="block font-medium text-gray-700"
      >
        Number of Hours
      </label>
      <input
        type="number"
        id={`noOfHours_${index}`}
        name={`noOfHours_${index}`}
        value={detail.noOfHours || ""}
        onChange={(e) =>
          handleReportDetailsChange(index, "noOfHours", e.target.value)
        }
        className="mt-1 p-2 border rounded-md w-full"
      />

      <label
        htmlFor={`activity_${index}`}
        className="block font-medium text-gray-700"
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
        className="mt-1 p-2 border rounded-md w-full"
      />
    </div>
  ))}
  <button
    onClick={addReportDetail}
    className="mt-2 bg-blue-500 text-white py-1 px-2 rounded"
  >
    Add Report Detail
  </button>
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
        Update Weekly Report
      </button>
    </form>
  );

}

export default EditWeeklyReportPage;
