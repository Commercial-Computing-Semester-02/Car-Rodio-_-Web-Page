import React, { useState } from "react"
import MaterialTable from 'material-table'
import { Modal } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { authenticationService } from "../../Backend Services/UserService";
import Swal from 'sweetalert2'

const UserHandeling = () => {

    let { users } = authenticationService.AllUsers()
    users = users.filter(user=>user.role!="admin")

    const [initialValues, setInitialValues] = useState({
        role: ''
    })
    const [showEditPost, setShowEditPost] = useState(false)
    const [tempEditID, settempEditID] = useState(null)

    const editPost = (rowData) => {
        setInitialValues({
            role: rowData.is_deleted ? "2":"1"
        })
        settempEditID(rowData.id)
        editPostModal()
    }

    const editPostModal = () => {
        setShowEditPost(!showEditPost)
    }

    const onSubmit = (fields) =>{
        let state = fields.role == "1" ? 0:1
        console.log(state)
        authenticationService.ChangeRole(state, tempEditID)
        .then(response =>{
            Swal.fire({
                position: 'middle',
                icon: 'warning',
                title: "Successfully Changed",
                showConfirmButton: false,
                timer: 2500
            }).then(function () {
              window.location.reload(true)
            })
        })
        .catch(error => {
            Swal.fire({
                position: 'middle',
                icon: 'warning',
                title: error.response.data,
                showConfirmButton: false,
                timer: 2500
            }).then(function () {
              window.location.reload(true)
            })
        })
    }

    return (
        <>
            <div class="container-fluid">
                <MaterialTable
                    title="User Handeling"
                    columns={[
                        {
                            title: 'Name',
                            field: 'firstname',
                            render: rowData => rowData.firstname + " " + rowData.lastname
                        },
                        { title: 'Email', field: 'email', type: 'email' },
                        { title: 'Contact', field: 'contact_number', type: 'number' },
                        {
                            title: 'Role',
                            field: 'role',
                            render: rowData => <span class={rowData.is_deleted ? "badge badge-danger" : "badge badge-success"}>{rowData.is_deleted ? "Block" : rowData.role}</span>
                        }
                    ]}
                    data={users}
                    options={{
                        sorting: true
                    }}
                    actions={[
                        {
                            icon: () => <i class="fas fa-eye"></i>,
                            onClick: (event, rowData) => editPost(rowData)
                        }
                    ]}
                    options={{
                        actionsColumnIndex: -1
                    }}
                />
            </div>

            <Modal show={showEditPost}>
                <Modal.Body class="container-fluid">
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        {({ isSubmitting }) => {

                            return (
                                <Form>
                                    <div className="form-row">
                                        <div className="form-group col-6">
                                            <label>User Role</label>
                                            <Field name="role" as="select" className='form-control' >
                                                <option value={1}>user</option>
                                                <option value={2}>block</option>
                                            </Field>
                                        </div>
                                    </div>

                                    <button class="btn btn-dark pull-right" type="submit">
                                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                        Update
                                    </button>

                                    <a class="btn btn-light mr-2 pull-right" onClick={editPostModal}>
                                        Cancel
                                    </a>
                                </Form>
                            )
                        }}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    )

}


export default UserHandeling
