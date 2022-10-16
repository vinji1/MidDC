import { GoLinkExternal } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import "../index.css";

import useFetch from "../hooks/useFetch";

const GetData = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(
    "https://sis.materdeicollege.com/api/venues"
  );

  const goSingleVenue = (venue) => {
    navigate(`/venues/${venue}`);
  };

  return (
    <>
      <h1 className="text-center bg-danger text-white">
        Mater Dei College Venues
      </h1>
      {error && (
        <p className="text-danger text-center">Something wrong from the API</p>
      )}
      {loading && (
        <div className="text-center bg-danger text-white">
          Loading Venues...
        </div>
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Building</th>
            <th scope="col">Capacity</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data)?.map((venue, index) => {
            return (
              <tr key={index} className="hover-effect">
                <td>{data[venue].id}</td>
                <td>{data[venue].name}</td>
                <td>{data[venue].building}</td>
                <td className="d-flex justify-content-between  align-items-center">
                  <div>{data[venue].capacity}</div>
                  <GoLinkExternal
                    className="go-to"
                    onClick={() => {
                      goSingleVenue(data[venue].id);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default GetData;
