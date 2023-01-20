import {addDoc , collection, doc, getDoc, query, updateDoc, where} from "firebase/firestore"
import {auth, db, storage} from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"

export interface IComment
{
    comment:string | null,
    username:string;
}

export const Comment=(props:any)=>{
    const [user] =useAuthState(auth);
    
    const postRef=doc(db, "posts",props.postid);
    const [comment,setComment]=useState<string| null>(null);
    const [newComment,setNewComment]=useState<IComment>();
    const [addComment,setAddComment]=useState<IComment[]>();

    const handleComment=(c:any)=>{
        setComment(c.target.event);
    };

    const Submit=async()=>{
        setNewComment({comment:comment,username:props.username});
        await getDoc(postRef).then((data)=> {
            console.log(data.data())
            // setAddComment(data);
        });
        // await updateDoc(postRef,{comment:[...addComment,newComment]});
    }

    return(
             <div>
                <input placeholder="Any comments" onChange={handleComment}/>
                <button onClick={Submit}>&rarr;</button>
                <button > view comments</button>
            </div>
    );
};