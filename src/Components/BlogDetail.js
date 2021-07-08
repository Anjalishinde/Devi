import React, {useState, useEffect} from 'react'
import * as all from '../Config/Config'
import { useParams, useHistory, Link } from 'react-router-dom'
import firebase from 'firebase/app'

const BlogDetail = () => {
    let history = useHistory()
      const [blog, setBlog] = useState({})
      const [comment, setComment] = useState("")
      const id = useParams().id
      console.log(id)
      const fetchBlog = async() => {
          const data = await all.db.collection("Blogs").doc(id).get()
          setBlog(data.data())
      }
      useEffect(()=>{
          console.log("USER",firebase.auth().currentUser)
          fetchBlog()
      },[])
      console.log(blog)
      const handleComment = (event) => {
          event.preventDefault()
          const newComment = {
              comment: comment,
              email: firebase.auth().currentUser.email
          }
          let originalComments = blog.comments
          originalComments.push(newComment)
          all.db.collection("Blogs").doc(id).update({
              comments: originalComments
          })
          history.push(`/BlogDetail/${id}`)
      }
    return(
        <div>
            {/* Navbar Start */}
            <header id="topnav" class="defaultscroll sticky">
                <div class="container">
                    {/*Logo container */}
                    <div>
                        <a class="logo" href="index.html">Devi<span class="text-danger">.</span></a>
                    </div>                 
                    <div class="buy-button">
                        <Link to="/CommunityForum">
                            <a href="#" target="_blank" class="btn btn-primary mr-5">Community Forum</a>
                        </Link>
                        <a href="#" target="_blank" class="btn btn-primary">{firebase.auth().currentUser ? "Logout" : "Login"}</a>
                    </div>{/*end login button */}
                    {/*End Logo container */}
                </div>{/*end container */}
            </header>{/*end header */}
            {/*Navbar End */}
            {/*Hero Start */}
            <section class="bg-half bg-light">
                <div class="home-center">
                    <div class="home-desc-center">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-12 text-center">
                                    <div class="page-next-level">
                                        <h2>{blog.Title}</h2>
                                        <ul class="list-unstyled mt-4">
                                            <li class="list-inline-item h6 user text-muted mr-2"><i class="mdi mdi-account"></i>{blog.Posted_By}</li>
                                            
                                        </ul>
                                        
                                    </div>
                                </div>{/*end col */}
                            </div>{/*end row */}
                        </div> {/*end container */}
                    </div>
                </div>
            </section>{/*end section */}
            {/*Hero End */}
            {/*Blog STart */}
            <section class="section">
                <div class="container">
                    <div class="row">
                        {/*BLog Start */}
                        <div class="col-lg-12 col-md-7">
                            <div class="mr-lg-3">
                                <div class="blog position-relative overflow-hidden shadow rounded">
                                    <div class="position-relative">
                                        <img src={blog.ImageURL} class="img-fluid rounded-top" alt="" />
                                    </div>
                                    <div class="content p-4">
                                        <p class="mt-3">{blog.Description}</p>
                                    </div>
                                </div>

                                <div class="p-4 shadow rounded mt-4 pt-2">
                                    <h4 class="page-title pb-3">Comments :</h4>
                                    <ul class="media-list list-unstyled mb-0">
                                        {blog.comments ? blog.comments.map((comment) => {
                                            return (
                                                <li class="comment-desk mt-4">
                                                <div class="commentor">
                                                    <div class="overflow-hidden d-block">
                                                        <h4 class="media-heading mb-0"><a href="javascript:void(0)" class="text-dark">{comment.email}</a></h4>
                                                    </div>
                                                </div>
                                                <div class="mt-3">
                                                    <p class="text-muted font-italic p-3 bg-light rounded">{comment.comment}</p>
                                                </div>
                                            </li>
                                            )
                                        }) : null}
                                        
                                    </ul>
                                </div>
                                <div class="mt-4 pt-2 p-4 shadow rounded">
                                    <h4 class="page-title pb-3">Leave A Comment :</h4>
                                    <form onSubmit={handleComment}>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group position-relative">
                                                    <label>Your Comment</label>
                                                    <i class="mdi mdi-comment-outline ml-3 icons"></i>
                                                    <textarea id="message" placeholder="Your Comment" value={comment} onChange={(e) => setComment(e.target.value)} rows="5" name="message" class="form-control pl-5" required=""></textarea>
                                                </div>
                                            </div>{/*end col */}
                                            <div class="col-md-12">
                                                <div class="send">
                                                <button type="submit" class="btn btn-primary w-100">Send Message</button>
                                                </div>
                                            </div>{/*end col */}
                                        </div>{/*end row */}
                                    </form>{/*end form */}
                                </div>
                            </div>
                        </div>
                        {/*BLog End */}
                        
                    </div>{/*end row */}
                </div>{/*end container */}
            </section>{/*end section */}
            {/*Blog End */}
            
            
            {/*Back to top */}
            <a href="#" class="back-to-top rounded text-center" id="back-to-top"> 
                <i class="mdi mdi-chevron-up d-block"> </i> 
            </a>
            {/*Back to top */}
        </div>
    )
}
export default BlogDetail