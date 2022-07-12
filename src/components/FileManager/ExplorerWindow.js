import React, {useEffect, useState} from "react";
import { ReactDOM } from "react-dom/client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faArrowUp, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import DropDown from "../Form/DropDown";
import Popup from '../Popups/Popup';


const ExplorerWindow = (props) => {

    const [directory, setDirectory] = useState("")
    const [currentDirectory, setCurrentDirectory] = useState("")
    const [files, setFiles] = useState("")
    const [sortByFilesList, setSortByFilesList] = useState("name")
    const [explorerWindowId, setExplorerWindowId] = useState(props.exploreId);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const sortByData = [
        {key: "name", name: "name"},
        {key: "type", name: "type"},
    ];


    useEffect(() => {

        fetchFileExplorer({directory});

    }, [directory])

    
    const fetchFileExplorer = async (fetchData) => {

        const result = await myApp.fetchFileExplorer(fetchData);
        const res = JSON.parse(result);
        
        setCurrentDirectory(res.directory)
        setFiles(() => sortFiles(res.files, sortByFilesList))
    }


    const onClickHandler = (isFolder, path) => {
        if(!isFolder)
            return

        setDirectory(path)   
    }


    const onClickBack = (path) => {
        let backwordsPath = path.substring(0, path.lastIndexOf('\\'));
        setDirectory(backwordsPath)    
    }


    const onDragStart = (event, id) => {
        event.dataTransfer.setData("origin", JSON.stringify({
            fromLocation: event.target.getAttribute("data-path"),
            parentId: id,
        }));
    };


    const onDragOver = (event) => {
        event.stopPropagation();
        event.preventDefault(); 
    };


    const onDrop = (event, targetId) => {
        
        try{
            const parentData = JSON.parse(event.dataTransfer.getData("origin"))
            const newLocation = event.target.getAttribute("data-path");
            if(parentData.parentId == targetId){
                return;
            }
            
            copyFileToNewLocation(parentData.fromLocation, newLocation, targetId);

        }catch{}

    };

    const copyFileToNewLocation = async (fromLocation, newLocation, targetId) => {

        const valid = await myApp.validateCopyFile({fromLocation, newLocation});
        const validation = JSON.parse(valid)
        
        if(validation.err){
            onErrorMessage(validation.err);
            return
        }else{
            //console.log(validation.msg)
            onMessage(validation.msg);
        }

        const result = await myApp.copyFileExplorer({fromLocation, newLocation});
        const res = JSON.parse(result);

        onMessage(null);
        if(res.err){
            onErrorMessage(res.err);
        }


        fetchFileExplorer({directory});

    }


    const onErrorMessage = (e) => {
        setError(() => e);
    }
    
    const onMessage = (e) => {
        setMessage(() => e);
    }


    const FolderPath = () => {
        return (
            <div className="flex justifyContent-spaceBetwean">
                <div 
                    className="explorerPath"
                    onDrop={(e)=> props.onDrop(e,explorerWindowId)}
                    onDragOver={(e)=> props.onDragOver(e)}
                    data-path={currentDirectory}
                >
                    {currentDirectory}
                </div>
                <button className="pathFolderIcon" onClick={() => onClickBack(currentDirectory)}><FontAwesomeIcon icon={faFolderOpen} /></button>
            </div>
        )
    }


    const sortFiles = (filesList, sortBy) => {
        setSortByFilesList(sortBy);
        let sorted;

        switch(sortBy){
            
            case "name":
                sorted = filesList.sort((a, b) => (a.fileName > b.fileName) ? 1 : -1);
                return sorted 

            case "type":
                sorted = filesList.sort((a, b) => (a.isFolder < b.isFolder) ? 1 : -1);
                return sorted

            default:
        }
    }


    return (
        <div className="fileExplorerWrap">
            <div className="explorerNavigator">
                <FolderPath />
                <DropDown 
                    data={sortByData}
                    onChange={(val) => sortFiles(files, val)}
                    label="Sort By"
                />
            </div>
            <ul>
                {files && files.map((file, key) => {
                    return (
                        <li 
                            key={key} 
                            className="flex alineItemsCenter tableRow" 
                            data-folder={file.isFolder}
                            data-path={file.path}
                            data-file={file.fileName}
                            onClick={() => onClickHandler(file.isFolder, file.path)}
                            onDragStart={(e)=> onDragStart(e,explorerWindowId)}
                            onDrop={(e)=> onDrop(e,explorerWindowId)}
                            onDragOver={(e)=> onDragOver(e)}
                            draggable={props.draggable}
                        >
                            {file.isFolder && (
                                <FontAwesomeIcon icon={faFolder} />
                            )}
                            {file.fileName}
                        </li>
                    )
                })}
            </ul>
            <Popup 
                message={message}
                error={error}
                onClick={()=>setError("")}
            />
        </div>
    );

};

export default ExplorerWindow;