import React, { useEffect, useRef, useState } from 'react';
import { Formik, Field, Form, } from 'formik';
import Swal from 'sweetalert2'
import { postService } from '../../Backend Services/PostService';
import { authenticationService } from '../../Backend Services/UserService';

function CommentSection({ postid, uid }) {

    let role = false

    if (authenticationService.currentUserValue == null) {
        role = false
    } else {
        role = true
    }

    const comment = {
        message: '',
    }

    const { users } = authenticationService.AllUsers()
    const { comments } = postService.GetComments(postid)
    console.log(postid)

    for(var i=0; i<comments.length; i++){
        let user = users.filter(user=>user.id===comments[i].commentedby)
        comments[i].username = user[0].firstname + " " + user[0].lastname
        if(comments[i].commentedby===uid){
            comments[i].role = "Author"
            comments[i].color = "primary"
        }else{
            comments[i].role = user[0].role
            comments[i].color = "success"
        }
    }

    //console.log(comments)

    function onSubmit(fields) {
        postService.AddComment(fields.message, postid)
            .then(response => {
                Swal.fire({
                    position: 'middle',
                    icon: 'warning',
                    title: "Successfully Posted",
                    showConfirmButton: false,
                    timer: 2500
                }).then(function () {
                    window.location.reload(true);
                })
            })
            .catch(error => {
                Swal.fire({
                    position: 'middle',
                    icon: 'warning',
                    title: "Something wrong !",
                    showConfirmButton: false,
                    timer: 2500
                }).then(function () {
                    window.location.reload(true);
                })
            })
    }


    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card comment-widgets m-b-20">

                        {comments.map((item, index)=>{
                            return(
                                <div class="d-flex flex-row comment-row">
                                    <div class="p-2"><span class="round"><img src="https://img.icons8.com/bubbles/100/000000/user.png" alt="user" width="50" /></span></div>
                                    <div class="p-2 comment-text">
                                        <h5>{item.username}</h5>
                                        <div class="comment-footer">
                                            <span class={"badge badge-"+item.color}>{item.role}</span>
                                        </div>
                                        <p class="m-b-5 m-t-10" style={{ fontSize: "14px" }}>{item.message}</p>
                                    </div>
                                </div>
                            )
                        })}

                        {role && <Formik initialValues={comment} onSubmit={onSubmit}>
                            {({ isSubmitting }) => {

                                return (
                                    <Form>
                                        <div class="d-flex flex-row comment-row">
                                            <Field name="message" ype="text" component="textarea" className='pb-cmnt-textarea' placeholder="Put Your Comment Here" />
                                        </div>
                                        <button class="btn btn-dark pull-right m-3" type="submit">
                                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                            Post
                                        </button>
                                    </Form>
                                )
                            }}
                        </Formik>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentSection