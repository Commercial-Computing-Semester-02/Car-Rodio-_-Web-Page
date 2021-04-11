/* Copyright (C) 2021 Chameera De Silva - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the XYZ license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the XYZ license with
 * this file. If not, please write to:info.chameera.de@gmail.com , or visit :https://chameera-de.github.io
 */
import React, { useState } from "react"
import MaterialTable from 'material-table'
import { Modal } from 'react-bootstrap';
import { postService } from "../../Backend Services/PostService";
import PostForm from "../Services/postform";
import Swal from 'sweetalert2'
import { useHistory } from "react-router-dom"

const PendingAds = () => {

  let history = useHistory()
  const {posts} = postService.GetAllPosts(0, 0)

  const [showEditPost, setShowEditPost] = useState(false)
  const [tempEditID, settempEditID] = useState(null)

  const editPost = (id) => {
    settempEditID(id)
    editPostModal()
  }

  const acceptPost = (id) => {
    postService.AcceptPost(id)
      .then(response =>{
          Swal.fire({
              position: 'middle',
              icon: 'warning',
              title: "Successfully Changed",
              showConfirmButton: false,
              timer: 2500
          }).then(function () {
            window.location = "/pendingads";
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
            window.location = "/pendingads";
          })
      })
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
            window.location = "/pendingads";
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
            window.location = "/pendingads";
          })
      })
  }


  const editPostModal = () => {
    setShowEditPost(!showEditPost)
  }

  return (
    <>
      <div class="container-fluid">
        <MaterialTable
          title="Pending Advertisements"
          columns={[
            { title: 'Title', field: 'title', type: 'text' },
            { title: 'Price', field: 'price', type: 'number' },
            { title: 'Posted By', field: 'seller_name', type: 'text' },
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
              icon: () => <i class="far fa-check-circle"></i>,
              onClick: (event, rowData) => acceptPost(rowData.id)
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


export default PendingAds
