import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../state/store";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect to login if no token
      return;
    }

    // Fetch profile data
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/login"); // Redirect on error (e.g., expired token)
      }
    };

    fetchProfile();
  }, [token, navigate]);

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <p>Email: {user.email}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
