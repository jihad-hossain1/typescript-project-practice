"use client";

import React from "react";

import useDataFetchDepend from "@/context/hooks/useDataFetchDepend";

type TPost = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
};

const apiEndPoint = "https://jsonplaceholder.typicode.com/comments";

const DependUser = () => {
    const [postId, setPostId] = React.useState<string>("1");
    const { data, error, loading } = useDataFetchDepend<TPost[]>({
        url: apiEndPoint,
        queryParams: { postId: postId },
        shouldDepend: true,
        dependencies: [postId],
    });

    if (loading) return <Skeletons />;

    if (error) return <ErrorComponent error={error} />;

    return (
        <div className="flex flex-col gap-4">
            <div>DependUser {data?.length}</div>
            <select
                onChange={(e) => {
                    setPostId(e.target.value);
                }}
                value={postId}
                className='border p-2 bg-zinc-600 text-white'
            >
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
            </select>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {data?.map((post) => (
                    <div key={post.id} className='bg-zinc-700/90 p-4 rounded-md'>
                        <div className='text-xl font-semibold uppercase'>
                            {post.name}
                        </div>
                        <div>{post.email}</div>
                        <div>{post.body}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Skeletons = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    key={index}
                    className='animate-pulse bg-zinc-700/90 p-4 rounded-md'
                >
                    <div className='h-4 bg-zinc-500 rounded-md'></div>
                    <div className='h-4 bg-zinc-500 rounded-md mt-2'></div>
                    <div className='h-4 bg-zinc-500 rounded-md mt-2'></div>
                </div>
            ))}
        </div>
    );
};

const ErrorComponent = ({ error }: { error: string }) => {
    return <div>Error: {error}</div>;
};

export default DependUser;
