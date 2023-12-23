import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MobileDetails = () => {
  const { mobileId } = useParams();
  const [mobileDetails, setMobileDetails] = useState(null);

  useEffect(() => {
    const fetchMobileDetails = async () => {
      try {
        const response = await fetch(
          `https://mobile-bite-backend.vercel.app/api/mobiles/${mobileId}`
        );
        const data = await response.json();

        if (data.mobile) {
          setMobileDetails(data.mobile);
        } else {
          console.error("Mobile details not found");
        }
      } catch (error) {
        console.error("Error fetching mobile details:", error);
      }
    };

    fetchMobileDetails();
  }, [mobileId]);

  if (!mobileDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid max-md:grid-cols-1 md:grid-cols-3 p-5">
        <div className="flex justify-center flex-col items-center">
          <img
            className="col-span-1 w-fit  h-auto rounded-md"
            src={mobileDetails.image}
            alt={mobileDetails.name}
          />
          <div className="flex m-6">
            <button className="bg-blue-400 hover:bg-blue-500 hover:text-white rounded-lg p-3 m-2 max-w-sm">
              Add To Cart
            </button>
            <button className="bg-blue-400 hover:bg-blue-500 hover:text-white rounded-lg p-3 m-2 max-w-sm">
              Buy Now
            </button>
          </div>
        </div>

        <div className=" col-span-2 p-3 md:p-8">
          <div className="flex flex-col justify-evenly items-stretch text-lg">
            <h2 className="font-semibold text-4xl ">{mobileDetails.name}</h2>
            <p className="pt-2 text-2xl text-blue-500">
              {mobileDetails.ratingsAndReviews}
            </p>
            <p className="text-gray-700 text-2xl font-semibold max-md:font-bold py-3">
              Price: ₹ {mobileDetails.price}
            </p>
            <p className="text-gray-700 ">
              <span className="font-semibold max-md:font-bold mr-1">
                {" "}
                Type:{" "}
              </span>
              {mobileDetails.type}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold max-md:font-bold"> battery: </span>{" "}
              {mobileDetails.battery}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold max-md:font-bold"> camera: </span>{" "}
              {mobileDetails.camera}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold max-md:font-bold">
                {" "}
                Processor:{" "}
              </span>{" "}
              {mobileDetails.processor}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold max-md:font-bold">
                {" "}
                displaySize:{" "}
              </span>{" "}
              {mobileDetails.displaySize}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold max-md:font-bold"> Memory: </span>
              {mobileDetails.memory}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold max-md:font-bold"> OS: </span>{" "}
              {mobileDetails.os}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold max-md:font-bold">
                {" "}
                Description:{" "}
              </span>
              {mobileDetails.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDetails;
