import classes from "./CommentsItem.module.css";
import {Comment} from "../../models/comment.ts";

export interface PostCommentProps {
    comment: Comment
}

export function CommentItem({comment}: PostCommentProps) {
    return (
        <div className={classes.commentItem}>
            <div className={classes.commentHeader}>
                <div className={classes.commentName}> {comment.name} </div>
                <div className={classes.commentEmail}> {comment.email} </div>
            </div>
            <div className={classes.commentBody}> {comment.body} </div>
        </div>
    );
}