import React, {useState} from "react";
import ExplorerWindow from "./ExplorerWindow";



const FileExplorer = (props) => {

    const [forceRerender, setForceRerender] = useState(0)
    

    return (
        <div className="flexStrech height75vh">
            <ExplorerWindow
                exploreId={1}
                draggable={true}
            />
            <ExplorerWindow 
                exploreId={2}
                draggable={true}
            />
        </div>
    );
};

export default FileExplorer;