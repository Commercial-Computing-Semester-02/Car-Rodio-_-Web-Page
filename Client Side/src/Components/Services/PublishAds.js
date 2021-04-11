import React, { useState } from "react"
import MaterialTable from 'material-table'
import { Modal, Badge } from 'react-bootstrap';
import { postService } from "../../Backend Services/PostService";
import PostForm from "./postform";
import Swal from 'sweetalert2'
import { useHistory } from "react-router-dom"

const PublishAds = () => {

  let history = useHistory()
  const {posts} = postService.GetPostsList()

  const [showAddPost, setShowAddPost] = useState(false)
  const [showDeletePost, setShowDeletePost] = useState(false)
  const [showEditPost, setShowEditPost] = useState(false)

  const [tempDeleteID, settempDeleteID] = useState(null)
  const [tempEditID, settempEditID] = useState(null)

  const editPost = (id) => {
    settempEditID(id)
    editPostModal()
  }

  const editPostModal = () => {
    setShowEditPost(!showEditPost)
  }

  const deletePost = (id) => {
    settempDeleteID(id)
    deletePostModal()
  }
  
  const deletePostConfirm = () => {
    deletePostModal()
    postService.DeletePost(tempDeleteID)
    .then(response =>{
      Swal.fire({
          position: 'middle',
          icon: 'warning',
          title: "Successfully Deleted",
          showConfirmButton: false,
          timer: 2500
      })
      history.push("/services")
    })
    .catch(error => {
      Swal.fire({
          position: 'middle',
          icon: 'warning',
          title: error.response.data,
          showConfirmButton: false,
          timer: 2500
      })
      history.push("/services")
  })
  }

  const deletePostModal = () => {
    setShowDeletePost(!showDeletePost)
  }

  const addPost = () => {
    setShowAddPost(!showAddPost)
  }

  const ApprovedBadge = (approve, reject) => {
    if(approve==0 && reject==0){
      return "info"
    }else if(approve==1 && reject==0){
      return "success"
    }else{
      return "danger"
    }
  }

  const ApprovedMessage = (approve, reject) => {
    if(approve==0 && reject==0){
      return "Pending"
    }else if(approve==1 && reject==0){
      return "Approved"
    }else{
      return "Rejected"
    }
  }


  return (
    <>
      <div class="container-fluid">
        <MaterialTable
          title="My Advertisements"
          columns={[
            { title: 'Title', field: 'title', type: 'text' },
            { title: 'Price', field: 'price', type: 'number' },
            { title: 'Post Status', 
              field: 'approved', 
              render: rowData => <Badge variant={ApprovedBadge(rowData.approved, rowData.rejected)}>{ApprovedMessage(rowData.approved, rowData.rejected)}</Badge>
            },
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
              icon: () => <i class="fas fa-trash-alt"></i>,
              onClick: (event, rowData) => deletePost(rowData.id)
            },
            {
              icon: () => <button class="btn btn-sm btn-info">Add a Post</button>,
              isFreeAction: true,
              onClick: () => addPost()
            },
          ]}
          options={{
            actionsColumnIndex: -1
          }}
        />
      </div>

      <Modal show={showAddPost}>
        <Modal.Body class="container-fluid">
          <PostForm uid={0}/>
          <button type="button" className="btnContact mb-4" onClick={addPost}>Cancel</button>
        </Modal.Body>
      </Modal>

      <Modal show={showDeletePost}>
        <Modal.Body class="container-fluid">
          <div class="contact-form">
            <h3 class="ml-2 font-weight-lighter" style={{ marginTop: "-6rem", textAlign: "left" }}>Are you sure you want<br />to delete this post ?</h3>
          </div>
          <button type="button" className="btnContact mb-4" onClick={deletePostConfirm}>Confirm</button>
          <button type="button" className="btnContact mb-4" onClick={deletePostModal}>Cancel</button>
        </Modal.Body>
      </Modal>

      <Modal show={showEditPost}>
        <Modal.Body class="container-fluid">
          <PostForm uid={tempEditID}/>
          <button type="button" className="btnContact mb-4" onClick={editPostModal}>Cancel</button>
        </Modal.Body>
      </Modal>

    </>
  )

}


export default PublishAds
