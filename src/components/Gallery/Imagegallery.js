import React, { useState, useEffect } from 'react';


const THUMBNAIL_HEIGH = 200;
const THUMBNAIL_WIDTH = 300;


const ImageGallery = (props) => {

    const [gallery, setGallery] = useState(null);
    const [popUpImg, setPopUpImg] = useState(null);

    useEffect(() => {

        const fetchGallery = async () => {
            const result = await myApp.fetchGalleryImages({
                limit: props.imageNumber
            });

            setGallery(result)
            initCarusel();
        }
        fetchGallery();
        
    }, [])


    function initCarusel(){

        window.setInterval(function(){
           playCarusel();
         }, 2500);
    }


    const playCarusel = () => {

        let stream = document.querySelector('.gallery__stream');
        let items = document.querySelectorAll('.gallery__item');
        stream.appendChild(items[0]);
    }


    const handleDoubleClick = event => {
        
        if (event.detail === 2) {
            let largeimg = event.target.getAttribute('largeimg');
            if(largeimg){
                setPopUpImg(largeimg);
            }
        }
    };


    const RenderGallery = () => {
        //console.log(gallery)
        return (
            <div className='gallery'>
                <ul id='carousel' className="gallery__stream">
                    {gallery && gallery.map((image, key) => {
                        let fullSizeImg = image.download_url;
                        let imageUrlArr = fullSizeImg.split('/');
                        imageUrlArr[imageUrlArr.length - 1] = THUMBNAIL_HEIGH;
                        imageUrlArr[imageUrlArr.length - 2] = THUMBNAIL_WIDTH;
                        let thumbnail = imageUrlArr.join("/");

                        return(
                            <li key={key} className="slide gallery__item">
                                <img src={thumbnail} largeimg={fullSizeImg} onClick={(event) => handleDoubleClick(event)} />
                            </li>
                        )
                        
                    }) }
                </ul>
            </div>
        )
        
    };

    const FullSizeImg = ({onClose, src}) => {
        if (src){
            return (
                <div className='maskPopup'>
                    <div className='imgPopup'>
                        <div className='closePopup' onClick={onClose}>&#10006;</div>
                        <img src={src} />
                    </div>
                </div>
            )
        }
    }


    return (
        <div className="gallery">
            <RenderGallery />
            <FullSizeImg 
                onClose={() => setPopUpImg(null)}
                src={popUpImg}
            />
        </div>
    )
}

export default ImageGallery;