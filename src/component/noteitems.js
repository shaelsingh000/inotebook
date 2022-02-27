import React, {useContext} from 'react'
import noteContext from "../context notes/noteContext"


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        
            
            
            
                <div className="card bg-dark  mb-3">
                <h5 className="card-header bg-primary bg-gradient text-light">{note.title}</h5>
                <div className="card-body bg-dark bg-gradient text-light">
                    
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                </div>
                <div className="card-footer bg-primary bg-gradient flex float-right ">
                <i className="fas fa-edit mx-3 " onClick={()=>{updateNote(note)}}></i>
                <i className="fas fa-trash mx-3" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully","success")}} ></i>
                </div>
                
                
            
            </div> 
    )
}

export default Noteitem