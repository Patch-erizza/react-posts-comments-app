import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import classes from "./CreateEditPostForm.module.css"
import {useMutation} from "@tanstack/react-query";
import API from "../../api.ts";
import {Post} from "../../models/post.ts";
import {FC} from "react";

export interface FormListProps {
    post?: Post
    onFormSubmitted?: () => void
}
const CreatePostFormValidationSchema = z.object({
    userId: z
        .preprocess(
            (a) => parseInt(z.string().parse(a), 10),
            z.number({
                required_error: "hui",
            })
                .min(1, {message: "sosite"})
                .max(9, {message: "sosite"})
        ),
    title: z
        .string({
            required_error: "Name is required"
        })
        .min(3)
        .max(30),
    body: z
        .string()
        .min(10)
});

type CreatePostFormValidationSchemaType = z.infer<typeof CreatePostFormValidationSchema>;

export const CreateEditPostForm: FC<FormListProps> = ({post, onFormSubmitted}) => {
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm<CreatePostFormValidationSchemaType>({defaultValues: post, resolver: zodResolver(CreatePostFormValidationSchema)});

    const {
        mutate: createPostMutation,
        isPending: createPostMutationIsPending,
        isError: createPostMutationIsError,
        isSuccess: createPostMutationIsSuccess
    } = useMutation({
        mutationFn: (formData: CreatePostFormValidationSchemaType) => {
            return API.post('posts', formData)
        },
    })

    const {
        mutate: editPostMutate,
    } = useMutation({
        mutationFn: (post: Post) => {
            return API.put(`posts/${post.id}`, post)
            //делаем запрос на изменение по ссылке `posts/${post.id}` на данные из post
        }
    })
    const onSubmit: SubmitHandler<CreatePostFormValidationSchemaType> = (data) => {
        console.log("submit")
        if (post) {
            editPostMutate(post, {onSuccess: () => {onFormSubmitted ? onFormSubmitted() : null}})
        } else {
            createPostMutation(data, {onSuccess: () => {onFormSubmitted ? onFormSubmitted() : null}})
        }
    }

    return (
        <div>
            <form className={createPostMutationIsPending ? classes.formIsPending : ""}
                  onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("userId", {
                        disabled: createPostMutationIsPending
                    })}
                    placeholder="userId"
                />
                {errors.userId && <span className={classes.errorViev}>{errors.userId.message}</span>}

                <input
                    {...register("title", {
                        disabled: createPostMutationIsPending
                    })}
                    type="text"
                    placeholder="postTitle"
                />
                {errors.title && <span className={classes.errorViev}>{errors.title.message}</span>}

                <input
                    {...register("body", {
                        disabled: createPostMutationIsPending
                    })}
                    type="text"
                    placeholder="postBody"
                />
                {errors.body && <span className={classes.errorViev}>{errors.body.message}</span>}

                <button type="submit">{post ? "Save post" : "Submit post"}</button>
            </form>

            <div className={classes.formIsError}>
                {createPostMutationIsError ? "Submit post is error" : null}
            </div>
            <div className={classes.formIsSuccess}>
                {createPostMutationIsSuccess ? "Form submitted successfully!" : null}
            </div>
        </div>
    );
}