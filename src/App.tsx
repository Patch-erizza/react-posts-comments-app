import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Posts} from "./components/Posts/Posts.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {PostDetails} from "./components/PostDetails/PostDetails.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        path: "/",
        element: <Posts/>
        ,
    },
    {
        path: "/:postId",
        element: <PostDetails/>,
    }
]);

function App() {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </>
    )
}

export default App
