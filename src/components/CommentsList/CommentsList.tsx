
import {Comment} from "../../models/comment.ts";
import {CommentItem} from "../CommentItem/CommentsItem.tsx";
import classes from "./CommentsList.module.css";

export interface CommentListProps {
    comments: Comment[]
}

export function CommentsList({comments}: CommentListProps) {
    return (
        <div className={classes.commentsList}>
            {
                comments?.length
                    ? comments.map((comment) => <CommentItem key={comment.id} comment={comment}/>)
                    : null
            }
        </div>
    );
}