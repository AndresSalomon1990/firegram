import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore } from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 

const useStorage = file => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const imagesCollectionRef = collection(projectFirestore, 'images');
    const storageRef = ref(projectStorage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask
      .on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(percentage);
        },
        (error) => {
          // Handle unsuccessful uploads
          setError(error);
        },
        async () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          // save the url in Firestore
          await addDoc(imagesCollectionRef, {
            url: downloadURL,
            createdAt: serverTimestamp(),
          });
          setUrl(downloadURL);
        }
      )
  }, [file])

  return { progress, error, url };
}

export { useStorage };