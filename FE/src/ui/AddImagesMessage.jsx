
export const AddImagesMessage = ({imagesMsg}) => {
    return(
        <div>
              {imagesMsg.length > 0 &&
              [...imagesMsg].map((image, index) => 
                  <img src={URL.createObjectURL(image)} width="48px" height="48px" alt="." key={index}/>
              )
              }
            </div>
    )
}