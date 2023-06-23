import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchallUser } from '../service/userservice';
import ReactPaginate from 'react-paginate';
import Modaladdnew from './Modalnew';
import ModalEdituser from './ModalEdit';
import ModalDeleteuser from './ModalDelete';
import { toast } from 'react-toastify';
import { CSVLink } from "react-csv";
import _ from 'lodash';
import { debounce } from 'lodash';
import Papa from 'papaparse';
import './Tableuser.scss';
const Tableuser = (props) => {
    // Reader data to API --> react
    const [listuser, setListUsers] = useState([]);//list user
    const [totalUser, setTotalUser] = useState(0);// total user (tong so phan tu)
    const [totalpage, setTotalpage] = useState(0);//total page (tong so trang)
    //de hien thi value modal,co trong table
    const [showModaladdnew, setshowModaladdnew] = useState(false);
    // Edit user
    const [listEdituser, setEdituser] = useState(false);
    const [dataEdituser, setdataEdituser] = useState({})
    //delete user
    const [listDeleteuser, setDeleteuser] = useState(false);
    const [dataDeleteuser, setdataDeleteuser] = useState({});
    //asc and desc
    const [sortBy, setSortBy] = useState("asc");
    // tang giam theo id
    const [sortFieldBy, setSortFieldBy] = useState("id");
    // exprot data 
    const [dataExport, setdataExport] = useState([]);

    const handleClose = () => {
        setshowModaladdnew(false);
        setEdituser(false)
        setDeleteuser(false)
    }

    const handleUpdateUser = (user) => {
        setListUsers([user, ...listuser]);
    }
    useEffect(() => {
        //call API
        getUser(1);
    }, [])
    //use API to web Htt://reques.in
    const getUser = async (page) => {
        let arr = await fetchallUser(page);
        if (arr && arr.data) {
            setListUsers(arr.data);
            setTotalUser(arr.total);
            setTotalpage(arr.total_pages);
        }
    }
    const handlePageClick = (event) => {
        getUser(+event.selected + 1);
    }
    //Edit user
    const handleEdituser = (user) => {
        setdataEdituser(user);
        setEdituser(true)
    }
    const handelEditusertable = (user) => {
        let clonelistuser = _.cloneDeep(listuser);
        let index = listuser.findIndex((item) => item.id === user.id);
        clonelistuser[index].first_name = user.first_name;
        setListUsers(clonelistuser)
    }
    // Delete user
    const handleDeleteuser = (user) => {
        setDeleteuser(true)
        setdataDeleteuser(user)
    }
    const handleDeletefromuser = (user) => {
        let clonelistuser = _.cloneDeep(listuser);
        clonelistuser = listuser.filter((item) => item.id !== user.id);
        setListUsers(clonelistuser)
    }

    const handleSort = (sortBy, sortFieldBy) => {
        setSortBy(sortBy);
        setSortFieldBy(sortFieldBy);
        let clonelistuser = _.cloneDeep(listuser);
        //user lodash sortby
        clonelistuser = _.orderBy(clonelistuser, [sortFieldBy], [sortBy]);
        setListUsers(clonelistuser);
    }
    //search user
    const handleSearch = debounce((event) => {
        let str = event.target.value;
        if (str) {
            let clonelistuser = _.cloneDeep(listuser);
            clonelistuser = clonelistuser.filter((item) => item.email.includes(str));
            setListUsers(clonelistuser);
        } else {
            getUser(1);
        }
    }, 400);
    // use Export and import in csv react-csv@2.2.2 and papaperse@5.3.2
    const getUserexport = (event, done) => {
        let result = [];
        if (listuser && listuser.length > 0) {
            result.push(["Id", "Email", "First name", "Last name"]);
            listuser.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                result.push(arr);
            })
            setdataExport(result);
            done();
        }
    }
    // import data use papaperse
    const handleimportCSV = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            if (file.type !== "text/csv") {
                toast.error("Only accept csv flie !")
                return;
            }
            // Parse local CSV file
            Papa.parse(file, {
                complete: function (results) {
                    // arr --> object
                    let rawCSV = results.data;
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (rawCSV[0][0] !== "email" || rawCSV[0][1] !== "first_name" || rawCSV[0][2] !== "last_name") {
                                toast.error(" Wrong format  Header CSV file !");
                            } else {
                                let result = [];
                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let Obj = {};
                                        Obj.email = item[0];
                                        Obj.fist_name = item[1];
                                        Obj.last_name = item[2];
                                        result.push(Obj);
                                    }
                                })
                                setListUsers(result);

                            }
                        } else {
                            toast.error("Wrong format CSV file !");
                        }
                    } else {
                        toast.error("Not found  data on CSV file !");
                    }
                }
            });
        }

    }
    return (<>
        {/* nút add new user */}
        <div className='my-3 add-new d-sm-flex'>
            <span><b>List user:</b></span>
            <div className='group-btns mt-sm-0 mt-3'>
                <label for="test" className='btn btn-warning'><i className="fa-solid fa-file-import"></i> Import</label>
                <input
                    type="file" id="test" hidden
                    onChange={(event) => handleimportCSV(event)}
                />
                <CSVLink
                    filename={"my-file.csv"}
                    className="btn btn-primary"
                    data={dataExport}
                    asyncOnClick={true}
                    onClick={getUserexport}
                >
                    <i className="fa-solid fa-file-arrow-down"></i> Export
                </CSVLink>
                <button className='btn btn-success' onClick={() => setshowModaladdnew(true)} type="">
                    <i className="fa-solid fa-circle-plus"></i> Add New
                </button>
            </div>

        </div>
        {/*  avatar: "https://reqres.in/img/faces/7-image.jpg"
        email: "michael.lawson@reqres.in"
        first_name: "Michael"
        id: 7
        last_name:  "Lawson"*/}
        {/*table user html*/}
        <div className='col-12 col-sm-4 my-3'>
            <input
                className='form-control'
                placeholder='Search user by email !'
                onChange={(event) => handleSearch(event)}
            />
        </div>
        <div className='cutomize-table'>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>
                            <div className='sort-Header'>
                                <span>
                                    ID
                                </span>
                                <span>
                                    <i
                                        className="fa-solid fa-arrow-down"
                                        onClick={() => handleSort('desc', 'id')}
                                    ></i>
                                    <i
                                        className="fa-solid fa-arrow-up"
                                        onClick={() => handleSort('asc', 'id')}
                                    ></i>
                                </span>

                            </div>

                        </th>
                        <th>Email</th>
                        <th>
                            <div className='sort-Header'>
                                <span>
                                    First Name
                                </span>
                                <span>
                                    <i
                                        className="fa-solid fa-arrow-down"
                                        onClick={() => handleSort('desc', 'first_name')}
                                    ></i>
                                    <i
                                        className="fa-solid fa-arrow-up"
                                        onClick={() => handleSort('asc', 'first_name')}
                                    ></i>
                                </span>
                            </div>


                        </th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listuser && listuser.length > 0 &&
                        listuser.map((item, index) => {
                            return (
                                <tr key={`users- ${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email} </td>
                                    <td>{item.first_name} </td>
                                    <td>{item.last_name}</td>
                                    <td className='d-flex'>
                                        <button
                                            className='btn btn-warning mx-3' type=""
                                            onClick={() => handleEdituser(item)}
                                        >
                                            Edit</button>
                                        <button className='btn btn-danger mx-3' type=""
                                            onClick={() => handleDeleteuser(item)}
                                        >
                                            Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>
        </div>

        {/*paginte bang phan trang user*/}
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={totalUser}
            pageCount={totalpage}// call total user
            previousLabel="< previous"
            renderOnZeroPageCount={null}

            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
        />
        <Modaladdnew
            show={showModaladdnew}
            handleClose={handleClose}
            handleUpdateUser={handleUpdateUser}
        />
        <ModalEdituser
            show={listEdituser}
            handleClose={handleClose}
            dataEdituser={dataEdituser}
            handelEditusertable={handelEditusertable}

        />
        <ModalDeleteuser
            show={listDeleteuser}
            handleClose={handleClose}
            dataDeleteuser={dataDeleteuser}
            handleDeletefromuser={handleDeletefromuser}
        />
    </>)

}
export default Tableuser;