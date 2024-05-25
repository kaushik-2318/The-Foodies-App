'use client'
import { useRef, useState } from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image';

export default function ImagePicker({label, name}){
    const [pickedImage, setPickedImage] = useState();
    function handlePickClick(){
        imageInput.current.click();
    }
    const imageInput = useRef();

    function handleImageChange(e){
        const file = e.target.files[0];

        if(!file){
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };
        fileReader.readAsDataURL(file)
    }

    return(
        <>
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No Image Picked yet.</p>}
                    {pickedImage && <Image src={pickedImage} alt="The Image Selected by user." fill/>}
                </div>
                <input onChange={handleImageChange} ref={imageInput} className={classes.input} type="file" id={name} accept='image/png, image/jpeg' name={name} required/>
                <button onClick={handlePickClick} className={classes.button} type="button">Pick a Image</button>
            </div>
        </div>
        </>
    )
}