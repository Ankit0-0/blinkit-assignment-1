import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        // If not an image, display an error message and return
        console.error("Only image files are allowed.");
        toast.error("Only image files are allowed");
        setSelectedFile(null);
        return;
      }

      setLoading(true); // Set loading to true when starting the upload
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/images/upload",
          {
            method: "POST",
            body: formData,
            credentials: "include",
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            navigate("/login");
          }
          throw {
            message: data.message,
            errorCode: response.status,
          };
        }
        const data = await response.json();
        console.log("Upload response:", data);
        toast.success("image uploaded succesfully");
        setLoading(false); // Set loading to false when upload is complete
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("image uploaded failed");
        setLoading(false); // Set loading to false in case of error
      }
    } else {
      toast.error("No file selected");
      console.log("No file selected");
    }
  };

  return (
    <div className=" w-full border-b h-[30%] flex flex-col justify-center items-center p-4">
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Choose File
      </label>
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
      />
      {selectedFile ? (
        <div className="mt-4">
          <p className="text-gray-600 overflow-hidden max-w-30">
            {selectedFile.name}
          </p>
        </div>
      ) : (
        <p className="font-semibold text-neutral-500">No file chosen</p>
      )}
      <button
        onClick={handleUpload}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload
      </button>
      {/* {loading && <div className="mt-4">Uploading...</div>} */}
      <div className="w-full h-full flex justify-center items-center">
        {loading && (
          <div className="border-t-4 border-gray-400 rounded-full h-8 w-8 animate-spin mr-3"></div>
        )}
        {loading && <div className="mt-4">Uploading...</div>}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Upload;
