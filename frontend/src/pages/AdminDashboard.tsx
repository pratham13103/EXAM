import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";  // Import AxiosError type
import { useNavigate } from "react-router-dom";

interface DashboardData {
  usersCount: number;
}

const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");

      // If no token is found, redirect to the signin page
      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/v1/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data); // Set data on successful response
      } catch (error) {
        console.error("Error fetching dashboard data", error);

        // Check if the error is an instance of AxiosError
        if (axios.isAxiosError(error)) {
          // Handle the AxiosError
          if (error.response && error.response.status === 401) {
            navigate("/signin");
          }
        } else {
          // Handle any other errors (non-Axios errors)
          console.error("An unexpected error occurred:", error);
        }
      }
    };

    fetchDashboardData();
  }, [navigate]);

  // Loading state
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Total Users: {data.usersCount}</h2>
      </div>
    </div>
  );
};

export default AdminDashboard;
