import React, { useState } from "react";
import "../styles/Comment.css";
import { addNewRating } from "../services/RatingService";
import "../styles/Star.css";
import { toast } from "react-toastify";

const Comment = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");

  const submitRatingHandeler = (event) => {
    event.preventDefault();
    addNewRating(comment, star, user && user.user_name, props.productId)
      .then((result) => {
        if (result) {
          console.log(result);
          props.fetchRating();
          toast.success("Rating successfully!");
          setComment("");
          setStar(0);
        }
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
        if (
          "You are already rated this product!" === err.response.data.message
        ) {
          toast.error("You are already rated this product!");
        } else {
          toast.error("You need to login to rate this poruduct");
        }
      });
  };

  return (
    <div className="container d-flex justify-content-center mt-100 mb-100">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <form onSubmit={(event) => submitRatingHandeler(event)}>
              <h1 className="pull-left">New Comment</h1>

              <div style={{ marginTop: "10px  " }} className="rate">
                <input
                  type="radio"
                  id="star5"
                  name="rate"
                  value="5"
                  onClick={(e) => setStar(e.target.value)}
                />
                <label for="star5" title="text">
                  5 stars
                </label>
                <input
                  type="radio"
                  id="star4"
                  name="rate"
                  value="4"
                  onClick={(e) => setStar(e.target.value)}
                />
                <label for="star4" title="text">
                  4 stars
                </label>
                <input
                  type="radio"
                  id="star3"
                  name="rate"
                  value="3"
                  onClick={(e) => setStar(e.target.value)}
                />
                <label for="star3" title="text">
                  3 stars
                </label>
                <input
                  type="radio"
                  id="star2"
                  name="rate"
                  value="2"
                  onClick={(e) => setStar(e.target.value)}
                />
                <label for="star2" title="text">
                  2 stars
                </label>
                <input
                  type="radio"
                  id="star1"
                  name="rate"
                  value="1"
                  onClick={(e) => setStar(e.target.value)}
                />
                <label for="star1" title="text">
                  1 star
                </label>
              </div>
              <br />
              <textarea
                class="form-control"
                rows="2"
                placeholder="What are you thinking?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>

              <div class="mar-top clearfix">
                <button class="btn btn-sm btn-primary pull-right" type="submit">
                  <i class="fa fa-pencil fa-fw"></i> Submit
                </button>
              </div>
            </form>
            <div className="card-body">
              <h4 className="card-title">Recent Comments</h4>
            </div>
            {/* comment section */}
            {props.rating &&
              props.rating.length > 0 &&
              props.rating.map((rating, index) => (
                <div key={rating.ratingId} className="comment-widgets m-b-20">
                  <div className="d-flex flex-row comment-row">
                    <div className="p-2"></div>
                    <div className="comment-text w-100">
                      <h3>Anonymous đã đánh giá: {rating?.rating} ☆</h3>
                      <div className="comment-footer">
                        <span style={{ fontSize: "10px" }} className="date">
                          {rating?.ratingDate}
                        </span>
                      </div>
                      <br />
                      <p className="m-b-5 m-t-10">{rating.comment}</p>
                    </div>
                  </div>
                </div>
              ))}

            {/* comment section */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
