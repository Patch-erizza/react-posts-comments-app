import {Post} from "../../models/post.ts";
import classes from "./PostItem.module.css";
import {Link} from "react-router-dom";

export interface PostItemProps {
    post: Post
}

export function PostItem({post}: PostItemProps) {
    return (
        <Link to={post.id.toString()}>
            <div className={classes.postItem}>
                <div className={classes.postTitle}> {post.title} </div>
                <div className={classes.postBody}> {post.body} </div>
            </div>
        </Link>
    );
}