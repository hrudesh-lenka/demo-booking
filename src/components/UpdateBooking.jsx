import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const url = "http://localhost:4000/bookings/";

const UpdateBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState({});
  const [buffetName, setBuffetName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [plateCount, setPlateCount] = useState("");
  const [bookedOn, setBookedOn] = useState("");

  const [success, setSuccess] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const messages = {
    ERROR: "Something went wrong",
    MANDATORY: "All the fields are mandatory",
  };

  // Fetch booking details when component mounts
  useEffect(() => {
    axios
      .get(url + id)
      .then((res) => {
        setBooking(res.data);
        setBuffetName(res.data.buffetName || "");
        setEmailId(res.data.emailId || "");
        setPlateCount(res.data.plateCount || "");
        setBookedOn(res.data.bookedOn || "");
      })
      .catch(() => {
        setErrMsg(messages.ERROR);
      });
  }, [id]);

  const update = (e) => {
    e.preventDefault();

    if (!buffetName || !emailId || !plateCount || !bookedOn) {
      setErrMsg(messages.MANDATORY);
      setSuccess("");
      return;
    }

    const newBooking = {
      buffetName,
      emailId,
      plateCount,
      bookedOn,
      id: booking.id,
    };

    axios
      .put(url + booking.id, newBooking)
      .then(() => {
        setSuccess(`Booking has been updated: ${booking.id}`);
        setErrMsg("");
        setTimeout(() => navigate("/viewBookings"), 1500);
      })
      .catch(() => {
        setErrMsg(messages.ERROR);
        setSuccess("");
      });
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header bg-custom">
              <h4>Update Booking</h4>
            </div>
            <div className="card-body">
              <form data-testid="update-form" onSubmit={update}>
                <label>Buffet Name</label>
                <select
                  data-testid="buffetName"
                  name="buffetName"
                  className="form-control"
                  value={buffetName}
                  onChange={(e) => setBuffetName(e.target.value)}
                >
                  <option value="" disabled>
                    Select a buffet
                  </option>
                  <option value="SouthIndianFestivalSpecial">
                    South Indian Festival Special
                  </option>
                  <option value="NorthIndianFestivalSpecial">
                    North Indian Festival Special
                  </option>
                  <option value="ChineseSpecial">Chinese Special</option>
                </select>

                <label>Email Id</label>
                <input
                  data-testid="emailId"
                  type="email"
                  name="emailId"
                  className="form-control"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />

                <label>Plate Count</label>
                <input
                  data-testid="plateCount"
                  type="number"
                  name="plateCount"
                  className="form-control"
                  value={plateCount}
                  onChange={(e) => setPlateCount(e.target.value)}
                />

                <label>Booked On</label>
                <input
                  data-testid="bookedOn"
                  type="date"
                  name="bookedOn"
                  className="form-control"
                  value={bookedOn}
                  onChange={(e) => setBookedOn(e.target.value)}
                />

                <button
                  type="submit"
                  name="active"
                  className="btn btn-primary mt-2"
                >
                  Update Buffet
                </button>

                {success && (
                  <p className="text-success" data-testid="success">
                    {success}
                  </p>
                )}
                {errMsg && (
                  <p className="text-danger" data-testid="error">
                    {errMsg}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UpdateBooking;
