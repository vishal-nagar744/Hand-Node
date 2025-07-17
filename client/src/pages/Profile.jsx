import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login.");
        return;
      }

      const res = await axios.get("http://localhost:3000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send token in headers
        },
      });

      setUser(res.data.data); // Backend returns user data in res.data.data
    } catch (err) {
      console.error("Error fetching profile:", err);
      if (err.response?.status === 401) {
        setError("Unauthorized. Please login again.");
      } else {
        setError("Something went wrong. Try again later.");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Welcome: {user.name}</h2>
      <p>Email: {user.email}</p>
      <img src={user.avatar?.url} alt="avatar" width="100" />
    </div>
  );
};

export default Profile;
