import React from 'react';
import ImageGallery from './components/Gallery/Imagegallery';
import FileExplorer from './components/FileManager/FileExplorer';


const App = () => {
    

    return (
        <>
            <FileExplorer />
            <ImageGallery imageNumber={10}/>
        </>
    )
};

export default App;