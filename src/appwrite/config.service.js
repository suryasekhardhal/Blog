import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service {
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
            return true
        } catch (error) {
            console.log("Appwrite error :: createPost :: error",error);
            return false
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateRow(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
            return true
        } catch (error) {
            console.log("Appwrite error :: updatePost :: error", error);
            return false
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteRow(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite error :: delete post :: error",error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite :: get post :: error",error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: getposts :: error");
            return false
        }
    }
    

    // file upload service
    async fileUpload(file){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: upload file :: error",error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: delete file :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appWriteBucketId,
            fileId
        )
    }
}

const service = new Service()

export default service