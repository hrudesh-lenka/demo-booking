import React, { useState } from 'react';
import axios from 'axios';
import { validation } from '../validators/validation';

const BookingComponent = () => {
    const url = "http://localhost:4800/bookings/";

    const [state, setState] = useState({
        buffetName: "",
        emailId: "",
        plateCount: "",
        bookedon: ""
    });

    const [formErrors, setFormErrors] = useState({
        buffetNameError: "",
        emailIdError: "",
        plateCountError: "",
        bookedonError: ""
    });

    const [mandatory, setMandatory] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [valid, setValid] = useState(false);

    const messages = {
        "EMAILID_ERROR": "Please enter valid email",
        "PLATE_COUNT_ERROR": "Plate count(s) should be 1 or more",
        "BUFFET_NAME_ERROR": "Please select buffet type",
        "BOOKEDON_ERROR": "Booking date should be after today's date",
        "ERROR": "Something went wrong",
        "MANDATORY": "Enter all the form fields"
    };

    const validateField = (name, value) => {
        let errors = { ...formErrors };

        switch (name) {
            case "buffetName":
                errors.buffetNameError = validation.validateBuffet(value)
                    ? "" : messages.BUFFET_NAME_ERROR;
                break;
            case "emailId":
                errors.emailIdError = validation.validateEmail(value)
                    ? "" : messages.EMAILID_ERROR;
                break;
            case "plateCount":
                errors.plateCountError = validation.validatePlatecount(value)
                    ? "" : messages.PLATE_COUNT_ERROR;
                break;
            case "bookedon":
                errors.bookedonError = validation.validateDate(value)
                    ? "" : messages.BOOKEDON_ERROR;
                break;
            default:
                break;
        }

        setFormErrors(errors);
        setValid(
            errors.buffetNameError === "" &&
            errors.emailIdError === "" &&
            errors.plateCountError === "" &&
            errors.bookedonError === "" &&
            state.buffetName && state.emailId && state.plateCount && state.bookedon
        );
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMandatory(false);
        setSuccessMessage("");
        setErrorMessage("");

        const { buffetName, emailId, plateCount, bookedon } = state;

        if (!buffetName || !emailId || !plateCount || !bookedon) {
            setMandatory(true);
            return;
        }

        try {
            const response = await axios.post(url, state);
            setSuccessMessage(`Booking is successfully created with bookingId: ${response.data.id}`);
            setState({ buffetName: "", emailId: "", plateCount: "", bookedon: "" });
        } catch (err) {
            setErrorMessage(messages.ERROR);
        }
    };

    return (
        <div className="createBooking">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header bg-custom">
                            <h4>Book Your Buffet</h4>
                        </div>
                        <div className="card-body">
                            <form data-testid="buffet-form" noValidate onSubmit={handleSubmit}>
                                {/* Buffet Name */}
                                <div className="form-group">
                                    <label>Buffet Name</label>
                                    <select
                                        name="buffetName"
                                        data-testid="buffetName"
                                        className="form-control"
                                        value={state.buffetName}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select a buffet</option>
                                        <option value="SouthIndianFestivalSpecial">South Indian Festival Special</option>
                                        <option value="NorthIndianFestivalSpecial">North Indian Festival Special</option>
                                        <option value="ChineseSpecial">Chinese Special</option>
                                    </select>
                                    {formErrors.buffetNameError && (
                                        <span data-testid="buffetName-error" className="text-danger">
                                            {formErrors.buffetNameError}
                                        </span>
                                    )}
                                </div>

                                {/* Email Id */}
                                <div className="form-group">
                                    <label>Email Id</label>
                                    <input
                                        type="email"
                                        data-testid="emailId"
                                        name="emailId"
                                        className="form-control"
                                        value={state.emailId}
                                        onChange={handleChange}
                                    />
                                    {formErrors.emailIdError && (
                                        <span data-testid="email-error" className="text-danger">
                                            {formErrors.emailIdError}
                                        </span>
                                    )}
                                </div>

                                {/* Plate Count */}
                                <div className="form-group">
                                    <label>Plate Count</label>
                                    <input
                                        type="number"
                                        data-testid="plateCount"
                                        name="plateCount"
                                        className="form-control"
                                        value={state.plateCount}
                                        onChange={handleChange}
                                    />
                                    {formErrors.plateCountError && (
                                        <span data-testid="plateCount-error" className="text-danger">
                                            {formErrors.plateCountError}
                                        </span>
                                    )}
                                </div>

                                {/* Booking Date */}
                                <div className="form-group">
                                    <label>Booking Date</label>
                                    <input
                                        type="date"
                                        data-testid="bookedon"
                                        name="bookedon"
                                        className="form-control"
                                        value={state.bookedon}
                                        onChange={handleChange}
                                    />
                                    {formErrors.bookedonError && (
                                        <span data-testid="bookingDate-error" className="text-danger">
                                            {formErrors.bookedonError}
                                        </span>
                                    )}
                                </div>

                                <br />
                                <button
                                    data-testid="button"
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={!valid}
                                >
                                    Book Buffet
                                </button>

                                {/* Messages */}
                                {mandatory && <div data-testid="mandatory" className="text-danger">{messages.MANDATORY}</div>}
                                {errorMessage && <div data-testid="error" className="text-danger">{errorMessage}</div>}
                                {successMessage && <div data-testid="success" className="text-success">{successMessage}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingComponent;
