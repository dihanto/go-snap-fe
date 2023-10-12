import images from "./asset"
export default function Comment () {
    return(
        <div>
            <img src={images.comment} alt="comment" className="scale-[.84] hover:opacity-70 cursor-pointer pt-[13.5px] pl-1"/>
        </div>
    )
}