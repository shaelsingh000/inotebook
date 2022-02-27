
import noteContext from "./noteContext";
import { useState } from "react";
const Notestate =(props) =>{
    const host= "http://localhost:5000"
    const initialnotes = []
    const [notes, setnotes] = useState(initialnotes);

    //Get all notes

    const getNotes = async() => {
      //API call
      const response = await fetch(`${host}/api/notes/fetchnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json();
      console.log(json)
      setnotes(json)
    }

    //add note
    const addNote = async (title, description, tag) => {
      // TODO: API Call
      // API Call 
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });

      const note = await response.json();
     
      setnotes(notes.concat(note))
    }
    
    //delete note
    const deleteNote = async (id)=>{
      // TODO: API Call
      const response = await fetch(`${host}/api/notes/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        
      });
      const json = response.json();
      console.log(json);
      const newNotes = notes.filter((note)=>{return note._id!==id})
      setnotes(newNotes)
    }
    //edit note

    const editNote = async (id, title, description, tag) => {
      // API Call 
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
      const json = await response.json();
      console.log(json)
      let newNotes = JSON.parse(JSON.stringify(notes))
      // Logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag; 
          break; 
        }

      }
      setnotes(newNotes);
    }

    return (
      <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
        {props.children}
      </noteContext.Provider>
    )
}

export default Notestate;