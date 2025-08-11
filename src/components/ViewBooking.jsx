import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewBooking = () => {
  const [bookingId, setBookingId] = useState("");
  const [bookingData, setBookingData] = useState(null);
  const [infoMessage, setInfoMessage] = useState("");

  const navigate = useNavigate();

  const messages = {
    INFO: "The booking has been deleted! Please refresh the page.",
    NOT_FOUND: (id) => `Reservation for booking id: ${id} is not found!`,
  };

  const onChange = (event) => {
    setBookingId(event.target.value);
  };

  const handleAction = async (action) => {
    if (action === "onDelete") {
      try {
        await axios.delete(
          // `http://localhost:4008/bookings/${bookingId}`
          `https://crudcrud.com/api/fb4533a860294dfab4f2f2caec548056/bookings/${bookingId}`
        );
        setInfoMessage(messages.INFO);
        setBookingData(null);
      } catch (error) {
        setInfoMessage(messages.NOT_FOUND(bookingId));
      }
    } else if (action === "isUpdate") {
      navigate(`/updateBooking/${bookingId}`);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        // `http://localhost:4008/bookings/${bookingId}`
        `https://crudcrud.com/api/fb4533a860294dfab4f2f2caec548056/bookings/${bookingId}`
      );
      // setBookingData(response.data);
      setBookingData({
        id: response.data._id,
        buffetName: response.data.buffetName,
        emailId: response.data.emailId,
        plateCount: response.data.plateCount,
        bookingDate: response.data.bookedOn,
      });
      setInfoMessage("");
    } catch (error) {
      setInfoMessage(messages.NOT_FOUND(bookingId));
      setBookingData(null);
    }
  };

  return (
    <div className="row">
      <div className="col-md-10 offset-md-1">
        <div className="card mt-4">
          <div className="card-header bg-custom">
            <h4>View Booking</h4>
          </div>
          <div className="card-body">
            <form
              className="form"
              data-testid="viewBooking-form"
              onSubmit={onSubmit}
            >
              <div className="form-group">
                <label>Booking Id</label>
                <input
                  type="text"
                  data-testid="bookingId"
                  name="bookingId"
                  className="form-control"
                  placeholder="Enter a booking id"
                  value={bookingId}
                  onChange={onChange}
                />
              </div>
              <button
                type="submit"
                name="button"
                className="btn btn-primary mt-2"
              >
                Get Booking
              </button>
            </form>

            {bookingData && (
              <table className="table table-bordered mt-4">
                <thead className="thead">
                  <tr>
                    <th>Booking Id</th>
                    <th>Buffet Name</th>
                    <th>Email Id</th>
                    <th>Plate Count</th>
                    <th>Booking Date</th>
                    <th>Action Items</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-testid="id">{bookingData.id}</td>
                    <td data-testid="buffetName">{bookingData.buffetName}</td>
                    <td data-testid="emailId">{bookingData.emailId}</td>
                    <td data-testid="plateCount">{bookingData.plateCount}</td>
                    <td data-testid="bookingOn">{bookingData.bookingDate}</td>
                    <td>
                      <button
                        className="btn btn-danger mt-2 ms-2"
                        data-testid="delete-button"
                        onClick={() => handleAction("onDelete")}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-success mt-2 ms-2"
                        data-testid="update-button"
                        onClick={() => handleAction("isUpdate")}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}

            {infoMessage && (
              <p data-testid="message" className="text-info mt-2">
                {infoMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBooking;
