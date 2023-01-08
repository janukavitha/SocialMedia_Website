import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
import {addDoc , collection} from "firebase/firestore"
import {auth, db, storage} from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { listAll, ref,uploadBytes ,getDownloadURL} from "firebase/storage";
import { v4 } from "uuid";

interface CreateFormData
{
    image:string;
    title: string;
    description:string;
}

export const CreateForm =()=>
{
    const [user] =useAuthState(auth);
    const navigate=useNavigate();
    const schema= yup.object().shape({
        image:yup.mixed().required("You must upload image"),
        title: yup.string().required("You must add a title"),
        description:yup.string().required("You must add a description"),

    });

    const {register,handleSubmit,formState:{errors} } =useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });

    const postsRef =collection(db,"posts");

    const onCreatePost =async (data: CreateFormData )=>{
        uploadImage();
        await addDoc(postsRef,{
            ...data,
            image:imageList,
            username: user?.displayName,
            userid:user?.uid,
        });
        navigate('/');
    };

    // Add image
    const [imageList,setImageList]=useState<string>();

    const imageListRef=ref(storage,"images/");

    // Add image ends

    const [imageUpload,setImageUpload]=useState<null | any>(null);

    const handleImage=(e:any)=>{
        setImageUpload(e.target.files[0]);
    }

    const uploadImage=()=>
    {
        if(imageUpload==null) return ;
        const imageRef=ref(storage,`images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef,imageUpload).then((item)=>{
            getDownloadURL(item.ref).then((url)=>{
                console.log(url);
                setImageList(url);

            });
        })
    };


    return(
        <form onSubmit={handleSubmit(onCreatePost)}>
            
            <input 
                type="file" 
                {...register("image")}
                onChange={handleImage}
             /> 
            <button onClick={uploadImage}>Upload image</button>
            <p style={{color:"red"}}>{errors.image?.message}</p>

            <input placeholder="Title.." {...register("title")} />
            <p style={{color:"red"}}>{errors.title?.message}</p>

            <textarea placeholder="Description..." {...register("description")}/>
            <p style={{color:"red"}}>{errors.description?.message}</p>

            <input type="submit"/>
        </form>
    );
}