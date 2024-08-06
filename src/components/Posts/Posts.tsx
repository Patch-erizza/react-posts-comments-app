import API from "../../api.ts";
import {PostsList} from "../PostsList/PostsList.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {CreateEditPostForm} from "../CreatePostForm/CreateEditPostForm.tsx";
import {Post} from "../../models/post.ts";

export function Posts() {

    const [isPostFormModalOpened,
        setIsPostFormModalOpened] = useState<boolean>(false);
    const [currentEditingPost,
        setCurrentEditingPost] = useState<Post | undefined>();
    const queryClient = useQueryClient();
    const {data, isLoading, isError} = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const response = await API.get("posts")
            return await response.data;
        }
    })
    const {
        mutate: deletePostMutate,
    } = useMutation({
        mutationFn: async (postId: number | string) => {
            return await API.delete(`posts/${postId}`)
        }
    })

    const handlePostDeleteFinally = async (postId: number | string) => {
        await deletePostMutate(postId, {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['posts']})
            }
        });
    }
    const handlePostEditFinally = (post: Post) => {
        console.log("handlePostEditFinally", post)
        // editPostMutate(post)
        setCurrentEditingPost(post);
        setIsPostFormModalOpened(true);
    }
    const handleFormSubmit = () => {
        console.log("handleFormSubmit")
        setIsPostFormModalOpened(false)
        setCurrentEditingPost(undefined)
    }
    // const [posts, setPosts] = useState<Post[]>([]);
    // useEffect(() => {
    //     API.get("posts")
    //         .then((response) => {
    //             setPosts(response.data);
    //         })
    //         .catch((error) => console.error(error));
    //     // fetch("https://jsonplaceholder.typicode.com/posts", {
    //     //     method: "GET"
    //     // })
    //     //     .then((response) => response.json())
    //     //     .then((data) => {
    //     //         setPosts(data);
    //     //     })
    //     //     .catch((error) => console.error(error));
    // }, []);
    return (
        <>
            <button onClick={() => setIsPostFormModalOpened(true)}>Add Post</button>
            {isPostFormModalOpened
                ? <CreateEditPostForm
                    onFormSubmitted={handleFormSubmit}
                    post={currentEditingPost}/>
                : null}
            {
                isLoading
                    ? <div>Загружается...</div>
                    : isError
                        ? <div>Ошибочка вышла</div>
                        : <PostsList posts={data}
                                     onPostDelete={handlePostDeleteFinally}
                                     onPostEdit={handlePostEditFinally}/>
            }
        </>
    );
}
