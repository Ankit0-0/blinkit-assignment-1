import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ImageGallery = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const logout = () => {
    fetch("http://localhost:5000/api/v1/auth/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Logout failed");
        }
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setImages([]);
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/images/fetch",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        if (response.status === 401) {
          navigate("/login");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Images:", data);
      setImages(data);
    } catch (error) {
      console.error("Fetch images error:", error);
    }
  };

  return (
    <section className="w-full h-auto ">
      <div className="flex flex-row w-full h-[10%] justify-between p-6 pt-2">
        <button onClick={fetchImages}>Refresh</button>
        <p className="text-bold text-3xl">Your gallery</p>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="w-full h-[90%] flex flex-wrap justify-center items-center">
        {images.map((image, index) => (
          <div key={index} className="border m-2">
            <a href={image} target="_blank" rel="noreferrer">
              <img
                src={image}
                alt={`Image ${index}`}
                className="w-32 h-32 bg-red-100"
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageGallery;
