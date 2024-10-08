import "./edit.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";

const Edit = ({ inputs, title }) => {
  const location = useLocation();
  const { id } = useParams();
  const path = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/users/${path}`);
  const [file, setFile] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const [info, setInfo] = useState({});
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/find/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };

    fetchBlog();
  }, [id, apiUrl]);

  if (!blog) {
    return <div>Loading...</div>;
  }
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dftygokow/image/upload",
        data
      );

      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };

      await axios.post("/auth/register", newUser);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              {loading ? (
                "Loading"
              ) : (
                <>
                  <div className="formInput">
                    <label htmlFor="file">
                      Image: <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input
                      type="file"
                      id="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </div>

                  {inputs.map((input) => (
                    <div className="formInput" key={input.id}>
                      <label>{input.label}</label>
                      <input
                        onChange={handleChange}
                        type={input.type}
                        placeholder={input.placeholder}
                        id={input.id}
                      />
                    </div>
                  ))}
                  <button onClick={handleClick}>Send</button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
