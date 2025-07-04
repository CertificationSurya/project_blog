import type {AxiosResponse} from "axios";
import {api} from "./axiosSetup";
import type {IndividualBlogI, RawBlogI, ServerResponse, VoteType} from "../interface";

const createBlog = async (
	blogData: FormData
): Promise<
	AxiosResponse<{status: number; message: string; data: {blogId: string}}>
> => {
	return await api.post("/blogs", blogData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

const getIndividualBlog = async (
	blogId: string,
	userId: string
): Promise<AxiosResponse<ServerResponse<IndividualBlogI>>> => {
	return await api.get(`/blogs/${blogId}/${userId}`);
};

const postComment = async (
	userId: string,
	blogId: string,
	comment: string
): Promise<AxiosResponse<ServerResponse<{commentId: string}>>> => {
	return await api.post(`/blogs/${blogId}/comment`, {
		commenterId: userId,
		comment,
	});
};

const updateVote = async (
	blogId: string,
	userId: string,
	vote: VoteType,
	prevVote: VoteType
) => {
	return await api.patch(`/blogs/${blogId}/vote`, {
		userId,
		vote,
		prevVote,
	});
};

const getTrendingAndLatestBlog = async (): Promise<
	AxiosResponse<ServerResponse<{
		trending: RawBlogI[],
		latest: RawBlogI[]
	}>>
> => {
	return await api.get("/blogs");
};

export {
	createBlog,
	getIndividualBlog,
	postComment,
	updateVote,
	getTrendingAndLatestBlog,
};
