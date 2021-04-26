import React, { useState } from "react"
import MaterialTable from 'material-table'
import { Modal } from 'react-bootstrap';
import { postService } from "../../Backend Services/PostService";
import PostForm from "../Services/postform";
import Swal from 'sweetalert2'

const AdminAds = () => {

  const {posts} = postService.GetAllPosts(1, 0)

  const [showEditPost, setShowEditPost] = useState(false)
  const [tempEditID, settempEditID] = useState(null)

  const editPost = (id) => {
    settempEditID(id)
    editPostModal()
  }

  const editPostModal = () => {
    setShowEditPost(!showEditPost)
  }

  const rejectPost = (id) => {
    postService.RejectPost(id)
      .then(response =>{
          Swal.fire({
              position: 'middle',
              icon: 'warning',
              title: "Successfully Changed",
              showConfirmButton: false,
              timer: 2500
          }).then(function () {
            window.location = "/publishads";
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
            window.location = "/publishads";
          })
      })
  }


  return (
    <>
      <div class="container-fluid">
        <MaterialTable
          title="Published Advertisements"
          columns={[
            { title: 'Title', field: 'title', type: 'text' },
            { title: 'Price', field: 'price', type: 'number' },
            { title: 'Posted By', field: 'name', type: 'text' },
          ]}
          data={posts}
          options={{
            sorting: true
          }}
          actions={[
            {
              icon: () => <i class="fas fa-eye"></i>,
              onClick: (event, rowData) => editPost(rowData.id)
            },
            {
              icon: () => <i class="far fa-times-circle"></i>,
              onClick: (event, rowData) => rejectPost(rowData.id)
            }
          ]}
          options={{
            actionsColumnIndex: -1
          }}
        />
      </div>

      <Modal show={showEditPost}>
        <Modal.Body class="container-fluid">
          <PostForm uid={tempEditID}/>
          <button type="button" className="btnContact mb-4" onClick={editPostModal}>Cancel</button>
        </Modal.Body>
      </Modal>

    </>
  )

}


export default AdminAds
