import {Post} from "../../models/post.ts";
import {PostItem} from "../PostItem/PostItem.tsx";
import {FC} from "react";

export interface PostsListProps {
    posts: Post[]
    onPostDelete: (postId: number | string) => void
    onPostEdit: (post: Post) => void
}

export const PostsList: FC<PostsListProps> = ({posts, onPostDelete, onPostEdit}) => {
    const handlePostDelete = (postId: number | string) => {
        onPostDelete(postId)
    }
    //handle - обработать
    const handlePostEdit = (post: Post) => {
        onPostEdit(post)
    }

    return (
        <>
            {
                posts?.length
                    ? posts.map((post) =>
                        <PostItem key={post.id} post={post}
                                  onPostDeleteButtonClicked={handlePostDelete}
                                  onPostEditButtonClicked={handlePostEdit}/>)
                    : null
            }
        </>
    );
}