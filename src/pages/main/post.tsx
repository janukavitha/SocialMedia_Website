import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import {Post as IPost} from "./main";
interface Props
{
    post:IPost
}
interface Like
{
    userId:string;
}


export const Post=(props:Props)=>
{
    const {post}=props;
    const [user]=useAuthState(auth);
    const [likes,setLikes] =useState<Like[] | null>(null);

    const likesRef=collection(db,"likes");

    const likesDoc=query(likesRef,where("postId","==",post.id));

    const getLikes=async ()=>{
        const data=await getDocs(likesDoc);
        setLikes(data.docs.map((doc)=>({userId:doc.data().userId})));
    };

    const addLike =async ()=>{
        await addDoc(likesRef,{userId: user?.uid,postId:post.id})
        try
        {
            if(user)
            {
                setLikes((prev)=> 
                prev? [...prev, {userId: user.uid}]: [{userId :user.uid}]
                );
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }

    useEffect(()=>{
        getLikes();
    },[]);
    return (
        <div>
            <div className="title">
                <h1>{post.title}check</h1>
            </div>
            <div className="body">
                <h2>{post.description}</h2>
            </div>
            <div className="footer">
                <h3>@{post.username}</h3>
                <button onClick={addLike}></button>
                {likes && <p>Likes:{likes.length}</p>}
            </div>
        </div>
    );
}