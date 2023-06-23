import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putupdateuser } from '../service/userservice';
import { toast } from 'react-toastify';
const ModalEdituser = (props) => {
    const { show, handleClose, dataEdituser, handelEditusertable } = props;
    const [name, setname] = useState("");
    const [job, setjob] = useState("");

    const handleEdituser = async () => {
        let arr = await putupdateuser(name, job);
        if (arr && arr.updatedAt) {
            handelEditusertable({
                first_name: name,
                id: dataEdituser.id
            })
            handleClose();
            toast("Apdate a success");
        }
    }
    useEffect(() => {
        if (show) {
            setname(dataEdituser.first_name)
        }
    }, [dataEdituser])
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit new user</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleEdituser()}>
                        Confimd
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}
export default ModalEdituser;