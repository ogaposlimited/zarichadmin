import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

import "./newprop.css";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { propertiesInputs } from "../formSource";
import Modal from "../modal/Modal";

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // Text formatting options
    [{ header: 1 }, { header: 2 }], // Headings
    ["link", "image", "video"], // Links, images, and videos
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    ["clean"], // Remove formatting
  ],
};
const NewProperties4 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [selectedOption, setSelectedOption] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editorHtml, setEditorHtml] = useState(""); // State for the editor content
  const apiUrl = process.env.REACT_APP_API_URL;

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
  const handleEditorChange = (html) => {
    setEditorHtml(html);
  };
  console.log(files);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          setLoading(true);
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
      // Replace <p> tags with empty strings and remove extra spaces

      const newproperties = {
        ...info,
        rooms,
        photos: list,
        desc1: editorHtml,
      };

      await axios.post(`${apiUrl}/api/blog`, newproperties);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const removeHtmlTags = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Create a blog post</h1>
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
              style={{ width: "200px", height: "200px", borderRadius: "50%" }}
            />
          </div>
          <div className="right">
            <form>
              <label htmlFor="fileInput">
                Image: <DriveFolderUploadOutlinedIcon className="icon" />
                <input
                  type="file"
                  id="fileInput"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </label>

              {propertiesInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <span>{input.label}</span>
                  <br></br>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div>
                <ReactQuill
                  theme="snow"
                  value={editorHtml}
                  onChange={handleEditorChange}
                  placeholder="Write your blog content here"
                  formats={formats}
                  modules={modules}
                />
              </div>

              <div className="formInput">
                <p>Featured</p>

                <select
                  onChange={(e) => setSelectedOption(e.target.value === "Yes")}
                >
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>

              <button onClick={handleClick} className="primaryBtn">
                {loading ? <>Loading..</> : <>Send</>}
              </button>
              {isOpen && <Modal setIsOpen={setIsOpen} />}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProperties4;
