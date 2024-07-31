import classes from "./PostDetails.module.css"
import {useQuery} from "@tanstack/react-query";
import API from "../../api.ts";
import {useParams} from "react-router-dom";
import {CommentsList} from "../CommentsList/CommentsList.tsx";

export function PostDetails() {

    const {postId} = useParams();
    const {data: post, isLoading: postIsLoading, isError: postIsError} = useQuery({
        queryKey: [`post/${postId}`],
        queryFn: async () => {
            const response = await API.get(`posts/${postId}`)
            return await response.data;
        }
    });

    const {data: comments, isLoading: commentsIsLoading, isError: commentsIsError} = useQuery({
        queryKey: [`post/${postId}/comments`],
        queryFn: async () => {
            const response = await API.get(`posts/${postId}/comments`)
            return await response.data;
        }
    })

    return (
        <div>
            {
                postIsLoading
                    ? <p>Posts is loading...</p>
                    : postIsError
                        ? <p>Posts is error!!!</p>
                        : post
                            ?
                            <div className={classes.postDetailsWrapper}>
                                <div className={classes.postDetails}>
                                    <div className={classes.postDetailsTitle}> {post.title} </div>
                                    <div className={classes.postDetailsBody}> {post.body} </div>
                                </div>

                                <p className={classes.postDetailsComments}>Comments:</p>

                                {commentsIsLoading
                                    ? <p>Comments is loading...</p>
                                    : commentsIsError
                                        ? <p>Comments is error!!!</p>
                                        : comments?.length
                                            ? <CommentsList comments={comments}/>
                                            : <p>Comments not found!</p>
                                }
                            </div>
                            : <p>Posts not found!</p>
            }
        </div>
    );
}