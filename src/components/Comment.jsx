import React from "react";
import "../styles/Comment.css";
import { addNewRating } from "../services/RatingService";

const Comment = (props) => {
  return (
    <div className="container d-flex justify-content-center mt-100 mb-100">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <form>
              <h1 className="pull-left">New Comment</h1>

              <textarea
                class="form-control"
                rows="2"
                placeholder="What are you thinking?"
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
