import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postcreatuser } from '../service/userservice';
import { toast } from 'react-toastify';
const Modaladdnew = (props) => {
    const { show, handleClose, handleUpdateUser } = props;
    const [name, setname] = useState("");
    const [job, setjob] = useState("");
    const handleSaveUser = async () => {
        let arr = await postcreatuser(name, job);
        if (arr && arr.id && arr.name) {
            //Success
            handleClose();
            setname("");
            setjob("");
            toast.success("A user creat Success !");//call success
            handleUpdateUser({ first_name: name, id: arr.id });
        }
        else {
            //Error
            toast.error("Creat a user Error !");
            handleClose();

        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control"
                                value={name}
                                onChange={(event) => setname(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">job</label>
                            <input type="text" className="form-control"
                                value={job}
                                onChange={(event) => setjob(event.target.value)}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}
export default Modaladdnew;