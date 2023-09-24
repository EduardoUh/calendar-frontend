import { useState, useEffect } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';

import { useUiStore, useCalendarStore } from '../../hooks';

import 'react-datepicker/dist/react-datepicker.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    const [formFieldsErrors, setFormFieldsErrors] = useState({
        title: false,
        notes: false,
        start: false,
        end: false,
    });
    // using custom hook that manages ui store
    const { closeDateModal, isDateModalOpen } = useUiStore();
    // using custom hook that manages calendar store
    const { activeEvent, startSavingEvent } = useCalendarStore();

    useEffect(() => {
        if (activeEvent) {
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent]);


    const handleChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const handleChangeDate = (e, changing) => {
        setFormValues({
            ...formValues,
            [changing]: e
        })
    }

    const validateFields = () => {
        let passed = true;
        // We will always want the end date to be greater than the start date 
        const difference = differenceInSeconds(formValues.end, formValues.start);
        if (difference <= 0 || isNaN(difference)) {
            console.log('date errors');
            difference <= 0 ? setFormFieldsErrors(formFieldsErrors => { return { ...formFieldsErrors, start: true } }) : setFormFieldsErrors(formFieldsErrors => { return { ...formFieldsErrors, start: true, end: true } });
            passed = false;
        }
        if (!formValues.title.length) {
            setFormFieldsErrors(formFieldsErrors => { return { ...formFieldsErrors, title: true } });
            passed = false;
        }

        if (!formValues.notes.length) {
            setFormFieldsErrors(formFieldsErrors => { return { ...formFieldsErrors, notes: true } });
            passed = false;
        }
        return passed;
    }

    const handleCloseDateModal = () => {
        setFormSubmitted(false);
        /* setFormValues({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
        }); */
        setFormFieldsErrors({
            title: false,
            notes: false,
            start: false,
            end: false,
        });
        closeDateModal();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        const passed = validateFields();

        if (!passed) return;

        await startSavingEvent(formValues);

        handleCloseDateModal();
    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={handleCloseDateModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> New Event </h1>
            <hr />
            <form
                className="container"
                onSubmit={handleSubmit}
            >

                <div className="form-group mb-2">
                    <label className="mb-2">Start date</label>
                    <DatePicker selected={formValues.start} onChange={(e) => handleChangeDate(e, 'start')} dateFormat='Pp' className={`form-control w-full ${formSubmitted && formFieldsErrors.start ? "is-invalid" : ""}`} showTimeSelect />
                    {
                        formSubmitted && formFieldsErrors.start && (<small id="emailHelp" className="form-text text-danger">Must be less than end date</small>)
                    }
                </div>

                <div className="form-group mb-2">
                    <label className="mb-2">End date</label>
                    <DatePicker minDate={formValues.start} selected={formValues.end} onChange={(e) => handleChangeDate(e, 'end')} dateFormat='Pp' className={`form-control w-full ${formSubmitted && formFieldsErrors.end ? "is-invalid" : ""}`} showTimeSelect />
                    {
                        formSubmitted && formFieldsErrors.end && (<small id="emailHelp" className="form-text text-danger">Invalid date</small>)
                    }
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label className="mb-2">Title and notes</label>
                    <input
                        type="text"
                        className={`form-control ${formSubmitted && formFieldsErrors.title ? "is-invalid" : ""}`}
                        placeholder="Event title"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={handleChange}
                    />
                    {
                        formSubmitted && formFieldsErrors.title && (<small id="emailHelp" className="form-text text-danger d-block">Title is a required field</small>)
                    }
                    <small id="emailHelp" className="form-text text-muted">Small description</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className={`form-control ${formSubmitted && formFieldsErrors.notes ? "is-invalid" : ""}`}
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={handleChange}
                    >
                    </textarea>
                    {
                        formSubmitted && formFieldsErrors.notes && (<small id="emailHelp" className="form-text text-danger d-block">Description is a required field</small>)
                    }
                    <small id="emailHelp" className="form-text text-muted">Extra info</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    &nbsp;
                    <span>Save</span>
                </button>

            </form>
        </Modal>
    )
}
