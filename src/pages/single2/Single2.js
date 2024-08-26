import axios from "axios";
import "./single2.css";

import useFetch from "../hooks/useFetch";

const Single2 = ({ item, onChange }) => {
  const [show, setShow] = useState(false);
  const [files, setFiles] = useState("");

  const { setData, data, loading, error } = useFetch(
    `/properties/find/${path}`
  );

  function handle(e) {
    setData({ ...data, [e.target.name]: e.target.value });

    if (typeof onChange === "function") {
      onChange(e.target.value);
    }
  }

  const handleClick = async ({ e, id }) => {
    setShow(true);
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
        ...data,
        photos: list,
      };

      await axios.put(
        `http://localhost:5000/api/blog/${data._id}`,
        newproperties
      );
      alert("successfully Updated Property");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />

        {loading ? (
          "Loading"
        ) : (
          <>
            <div className="new">
              <div className="newContainer">
                <div className="top">
                  <h1>Edit Property</h1>
                </div>
                <div className="item" key={data._id}>
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
                    <div className="form">
                      <div className="formInput">
                        <label htmlFor="file">
                          Image:{" "}
                          <DriveFolderUploadOutlinedIcon className="icon" />
                        </label>
                        <input
                          type="file"
                          id="file"
                          multiple
                          onChange={(e) => setFiles(e.target.files)}
                          style={{ display: "none" }}
                        />
                      </div>

                      <div className="formInput">
                        <span className="itemKey">
                          <label>
                            {" "}
                            <strong> Name:</strong>
                          </label>

                          <input
                            placeholder="hi"
                            onChange={(e) => handle(e)}
                            value={data.name}
                            type="text"
                            name="name"
                          />
                        </span>
                        <br></br>
                        <span className="itemValue"></span>
                      </div>

                      <div className="formInput">
                        <span className="itemKey">
                          <label>
                            {" "}
                            <strong> Address:</strong>
                          </label>
                        </span>
                        <br></br>
                        <input
                          placeholder="hi"
                          onChange={(e) => handle(e)}
                          value={data.address}
                          type="text"
                          name="address"
                        />
                      </div>
                      <div className="formInput">
                        <span className="itemKey">
                          <label>
                            {" "}
                            <strong> City:</strong>
                          </label>
                        </span>
                        <br></br>
                        <input
                          placeholder="hi"
                          onChange={(e) => handle(e)}
                          value={data.city}
                          type="text"
                          name="city"
                        />
                      </div>
                      <div className="formInput">
                        <span className="itemKey">
                          <label>
                            <strong> Distance:</strong>
                          </label>
                        </span>
                        <br></br>
                        <input
                          placeholder="hi"
                          onChange={(e) => handle(e)}
                          value={data.distance}
                          type="text"
                          name="distance"
                        />
                      </div>
                      <div className="formInput">
                        <span className="itemKey">
                          <label>
                            <strong> Details:</strong>
                          </label>
                        </span>
                        <br></br>
                        <input
                          placeholder="hi"
                          onChange={(e) => handle(e)}
                          value={data.detail}
                          type="text"
                          name="detail"
                        />
                      </div>
                      <div className="formInput">
                        <span className="itemKey">
                          <label>
                            <strong> Description:</strong>
                          </label>
                        </span>
                        <br></br>
                        <input
                          placeholder="hi"
                          onChange={(e) => handle(e)}
                          value={data.desc}
                          type="text"
                          name="desc"
                        />
                      </div>
                      <div className="formInput">
                        <span className="itemKey">
                          <label>
                            <strong> Price:</strong>
                          </label>
                        </span>
                        <br></br>
                        <input
                          placeholder="hi"
                          onChange={(e) => handle(e)}
                          value={data.cheapestPrice}
                          type="text"
                          name="cheapestPrice"
                        />
                      </div>

                      <div className="formInput">
                        <span className="itemKey">
                          <label>
                            <strong> Featured:</strong>
                          </label>
                        </span>
                        <br></br>
                        <input
                          placeholder="hi"
                          onChange={(e) => handle(e)}
                          value={data.featured}
                          type="text"
                          name="featured"
                        />
                      </div>

                      <div>
                        <button className="button" onClick={handleClick}>
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Single2;
