import {Post} from "../../models/post.ts";
import {PostItem} from "../PostItem/PostItem.tsx";

export interface PostsListProps {
    posts: Post[]
}
export function PostsList({posts}: PostsListProps) {
    return (
        <>
            {
                posts?.length
                ? posts.map((post) => <PostItem key={post.id} post={post}/>)
                : null
            }
        </>
    );
}