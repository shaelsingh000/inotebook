import React, {useContext, useState} from 'react';
import noteContext from '../context notes/noteContext';

const Addnote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: "default"})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.showAlert("Added Successfully","success")
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <h1>Add A Note</h1>
            <hr/>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input className="form-control" id="title" name="title" onChange={onChange}/>
                   
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Tags</label>
                    <input className="form-control" id="tag" name="tag" onChange={onChange}/>
                    
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
                <hr/>
        </div>
    )
}

export default Addnote
