import StepList from "./StepList";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "./Image";
import { useGlobalContext } from "../context";
import StepCard from "./StepCard";
import ItemList from "./ItemList";

const Editor = () => {
  const { baseAPIUrl } = useGlobalContext();
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const workInstructionID = searchParams.get("workInstructionID") || "";
  const [workInstruction, setWorkInstruction] = useState({});
  const [imageID, setImageID] = useState("");
  const [image, setImage] = useState({});

  const getWorkInstruction = async (url) => {
    try {
      const { data } = await axios(url);
      if (data.wi) {
        setWorkInstruction(data.wi);
        setImage(data.wi.image);
        setImageID(data.wi.image._id); // only works if imageData=false
      } else {
        setWorkInstruction({});
        setImage({});
        setImageID("");
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getWorkInstruction(
      `${baseAPIUrl}/workinstructions/${workInstructionID}?imageData=true`
    );
  }, [baseAPIUrl, workInstructionID]);

  return (
    <>
      <ItemList/>
      <StepList workInstructionID={workInstructionID} />
      <Image
        workInstruction={workInstruction}
        workInstructionID={workInstructionID}
        image={image}
        imageID={imageID}
        setImage={setImage}
        setImageID={setImageID}
      />
    </>
  );
};
export default Editor;
