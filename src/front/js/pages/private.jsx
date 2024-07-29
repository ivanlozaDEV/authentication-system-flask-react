import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const jwt = localStorage.getItem("token");

    useEffect(() => {
        const jwt = localStorage.getItem("token");
        if (!jwt) {
            navigate("/");
            return;
        }
        actions.getPosts();
    }, []);

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        await actions.addPost(content);
        setContent(""); // Clear the content after submitting the post
        actions.getPosts()
    };

    return (
        <div className="container">
            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                <div className="card" style={{ width: "25rem" }}>
                    <div className="card-body">
                        <h5 className="card-title text-center">Create a Post Entry</h5>
                        <form onSubmit={handlePostSubmit}>
                            <div className="mb-3">
                                <label htmlFor="content" className="form-label">Content</label>
                                <textarea
                                    className="form-control"
                                    id="content"
                                    placeholder="Write your diary entry here..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Submit</button>
                        </form>
                    </div>
                </div>
                <div className="mt-5">
                <h2 className="text-center">Post Entries</h2>
                <div className="list-group">
                    {store.posts && store.posts.length > 0 ? (
                        store.posts.map((post, index) => (
                            <div key={index} className="list-group-item">
                                {post.content}
                            </div>
                        ))
                    ) : (
                        <div className="text-center">No posts available</div>
                    )}
                </div>
            </div>
            </div>
            
        </div>
    );
};
