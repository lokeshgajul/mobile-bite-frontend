import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const Mobiles = () => {
  const [mobiles, setMobiles] = useState([]);
  const [filteredMobiles, setFilteredMobiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);

  const props = useSpring({
    opacity: isVisible ? 1 : 0,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const fetchMobiles = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await fetch(
        "https://mobile-bite-backend.vercel.app/api/displayMobiles"
      );
      const data = await response.json();

      if (data && data.mobiles && Array.isArray(data.mobiles.mobiles)) {
        setMobiles(data.mobiles.mobiles);
        setFilteredMobiles(data.mobiles.mobiles);
        setIsVisible(true); // Set visibility to true after data is fetched
      } else if (data && data.error) {
        setErrorMessage(data.error);
        setIsVisible(true); // Set visibility to true even if there's an error
      } else {
        console.error("Invalid data format received from the server");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMobiles();
  }, []);

  useEffect(() => {
    const filtered = mobiles.filter((mobile) => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        mobile.name.toLowerCase().includes(searchTermLower) ||
        mobile.processor.toLowerCase().includes(searchTermLower) ||
        mobile.memory.toLowerCase().includes(searchTermLower)
      );
    });
    setFilteredMobiles(filtered);
    setErrorMessage("");
  }, [searchTerm, mobiles]);

  return (
    <div className="">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        <div className="md:bg-slate-300 max-h-full flex flex-col justify-start md:col-span-1 md:block px-7">
          <Filters
            setFilteredMobiles={setFilteredMobiles}
            mobiles={mobiles}
            setSearchTerm={setSearchTerm}
          />
        </div>

        <animated.div
          className="md:col-span-2 xl:col-span-3 lg:col-span-3 xl:col-span-3 grid gap-4 px-5 md:p-8"
          style={props}
        >
          {errorMessage ? (
            <p className="text-center text-2xl text-red-500 font-semibold"></p>
          ) : filteredMobiles.length === 0 ? (
            <p className="text-center text-2xl text-red-500 font-semibold flex justify-center items-center">
              Sorry! Mobile not found.{errorMessage}
            </p>
          ) : (
            filteredMobiles.map((mobile, index) => (
              <animated.div
                key={mobile.name}
                className={`p-4 my-3 shadow-lg border-2 rounded-md cursor-pointer transition-transform transform hover:scale-105 duration-300 delay-${
                  index * 100
                }`}
                onClick={() => {
                  navigate(`/mobiles/${mobile.name}`);
                }}
              >
                <p className="text-right text-2xl text-blue-500">
                  {mobile.ratingsAndReviews}
                </p>
                <div className="grid max-md:grid-cols-1 md:grid-cols-3 p-3">
                  <img
                    className="col-span-1 h-auto rounded-md "
                    src={mobile.image}
                    alt={mobile.name}
                  />
                  <div className="col-span-2 md:px-8 text-lg mt-4">
                    <h2 className="font-semibold text-2xl text-blue-400">
                      {mobile.name}
                    </h2>
                    <p className="text-gray-700">Price: ₹ {mobile.price}</p>
                    <p className="text-gray-700">Type: {mobile.type}</p>
                    <p className="text-gray-700">Battery: {mobile.battery}</p>
                    <p className="text-gray-700">Camera: {mobile.camera}</p>
                    <p className="text-gray-700">
                      Processor: {mobile.processor}
                    </p>
                    <p className="text-gray-700">
                      Display Size: {mobile.displaySize}
                    </p>
                    <p className="text-gray-700">Memory: {mobile.memory}</p>
                    <p className="text-gray-700">OS: {mobile.os}</p>
                  </div>
                </div>
                <div className="bg-blue-500 p-2 mt-4 text-lg cursor-pointer text-center hover:text-white hover:bg-blue-600 rounded-md transition-all duration-300">
                  <button className="">View More Details</button>
                </div>
              </animated.div>
            ))
          )}
        </animated.div>
      </div>
    </div>
  );
};

export default Mobiles;
