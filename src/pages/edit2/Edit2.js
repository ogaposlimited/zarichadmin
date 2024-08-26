import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { propertiesInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Edit2 = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/properties/find/properties`);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  console.log(files);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dftygokow/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newproperties = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.post("/properties", newproperties);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Property</h1>
        </div>

        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
              {loading ? (
                "Loading"
              ) : (
                <>
                  {propertiesInputs &&
                    propertiesInputs.map((data) => (
                      <div className="formInput" key={data.id}>
                        <label>{data.name}</label>
                        <input
                          id={data.id}
                          onChange={handleChange}
                          type={data.name}
                          placeholder={data.placeholder}
                        />
                      </div>
                    ))}

                  <div className="formInput">
                    <label>Featured</label>
                    <select id="featured" onChange={handleChange}>
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </div>
                </>
              )}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit2;
