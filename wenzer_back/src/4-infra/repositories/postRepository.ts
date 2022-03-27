import { Post } from "../../3-domain/entities/post";
import { IOrm } from "../irepositories/Iorm";
import { Orm } from "./orm";
import { IPostRepository } from "../irepositories/IpostRepository";
import { queryPromise } from '../dbContext/conexao';
import { UserPostGoodIdea } from "../../3-domain/entities/userPostGoodIdea";
import { PostComments } from "../../3-domain/entities/postComments";
import { v4 as uuid } from 'uuid';

export class PostRepository extends Orm<Post> implements IPostRepository {
    
    async getAllPostsOfUser(idUser: string, page: number, countPerPage: number): Promise<Post[]> {
        const sql = `
        SELECT Post.* 
        FROM Post 
        LEFT JOIN Project ON Post.idProject = Project.id
        LEFT JOIN Followers ON Project.id = Followers.idProject
        LEFT JOIN Connections AS UserOne ON Post.idUser = UserOne.idUser
        LEFT JOIN Connections AS UserTwo ON Post.idUser = UserTwo.id
        WHERE (Followers.idUser = ${idUser.toSql()} 
            OR Post.idUser = ${idUser.toSql()}
            OR UserOne.idFollower = ${idUser.toSql()}
            OR UserTwo.idUser = ${idUser.toSql()})
        ORDER BY created_at DESC
        LIMIT ${(page-1)*countPerPage}, ${countPerPage}
        `;
        let result: any = await queryPromise(sql);
        return result;
    }

    async getUserPostGoodIdea(where: string): Promise<UserPostGoodIdea | null> {
        const sql = `SELECT * FROM UserPostGoodIdea WHERE ${where}`;
        let result: any = await queryPromise(sql);
        let userPost = null;
        if (result.length > 0) {
            userPost = this.convertToUserPostGoodIdeaObject(result[0]);
        }
        return userPost;
    }

    async getListUserPostGoodIdea(where: string): Promise<UserPostGoodIdea[]> {
        const sql = `SELECT * FROM UserPostGoodIdea WHERE ${where}`;
        let result: any = await queryPromise(sql);
        let userPost: UserPostGoodIdea[] = [];
        if (result.length > 0) {
            result.forEach((userPost: any) => {
                let newUserPost = this.convertToUserPostGoodIdeaObject(userPost);
                if (newUserPost != null)
                    userPost.push(newUserPost!);
            });
        }
        return userPost;
    }

    async setComment(userId: string, postId: string, text: string): Promise<void> {
        let sql = `
            INSERT INTO PostComments (id, idUser, idPost, Text, updated_at, created_at) 
                VALUES 
            (${uuid().toSql()}, ${userId.toSql()}, ${postId.toSql()}, ${text.toSql()}, now(), now());
        `;
        await queryPromise(sql);
    }

    async getCommentsByPostId(postId: string): Promise<PostComments[]> {
        let sql = `SELECT * FROM PostComments WHERE idPost = ${postId.toSql()}`;
        let result: any = await queryPromise(sql);
        let postComments: PostComments[] = [];
        if (result.length > 0) {
            result.forEach((comment: any) => {
                let newPostComment = this.convertToPostCommentObject(comment);
                if (newPostComment != null) 
                    postComments.push(newPostComment!);
            });
        }
        return postComments;
    }

    convertToPostObject(post: any): Post | null {
        if (!post) return null;

        return new Post(
            post.idUser,
            post.countViews,
            post.title,
            post.description,
            post.photo,
            post.idProject,
            post.id,
            post.created_at,
            post.updated_at
        );
    }

    convertToUserPostGoodIdeaObject(userPost: any): UserPostGoodIdea | null {
        if (!userPost) return null;

        return new UserPostGoodIdea(
            userPost.idUser,
            userPost.idPost,
            userPost.id,
            userPost.created_at,
            userPost.updated_at
        );
    }

    convertToPostCommentObject(postComment: any): PostComments | null {
        if (!postComment) return null;

        return new PostComments(
            postComment.idUser,
            postComment.idPost,
            postComment.text,
            postComment.id,
            postComment.created_at,
            postComment.updated_at
        );
    }
    
}

