import API from "../../api.ts";
import {PostsList} from "../PostsList/PostsList.tsx";
import {useQuery} from "@tanstack/react-query";

export function Posts() {

    const {data, isLoading, isError} = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const response = await API.get("posts")
            return await response.data;
        }
    })

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
            {
                isLoading
                    ? <div>Загружается...</div>
                    : isError
                        ? <div>Ошибочка вышла</div>
                        : <PostsList posts={data}/>
            }
        </>
    );
}