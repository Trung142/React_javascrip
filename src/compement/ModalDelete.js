import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Deleteuser } from '../service/userservice';
import { toast } from 'react-toastify';
const ModalDeleteuser = (props) => {
    const { show, handleClose, dataDeleteuser, handleDeletefromuser } = props;
    const handleDeleteuser = async () => {
        let arr = await Deleteuser(dataDeleteuser.id);
        if (arr && +arr.statusCode === 204) {
            toast.success("Delete user success !");
            handleClose()
            handleDeletefromuser(dataDeleteuser);
        } else {
            toast.error("Delete user error !");
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
                        This action can't be undone! Do you want to delete this user ?
                        <br />
                        <b>Email = {dataDeleteuser.email} ?</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteuser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}
export default ModalDeleteuser;