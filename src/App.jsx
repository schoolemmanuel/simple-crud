import React, { useState } from 'react';
import shortid from 'shortid';

function App() {

  // STATES
  const [inputTitle, setInputTitle] = useState('')
  const [inputComment, setInputComment] = useState('')
  const [taskList, setTaskList] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [currentId, setCurrentId] = useState('')
  const [errorTitle, setErrorTitle] = useState(null)
  const [errorComment, setErrorComment] = useState(null)

 
  // ADD TASK
  const addTask = e => {
    e.preventDefault()

    // Conditions for Empty vlaues
    if(!inputTitle.trim()) {
      setErrorTitle('Empty Title')
      return
    }
    setErrorTitle(null)
    if(!inputComment.trim()) {
      setErrorComment('Empty Comment')
      return
    }
    setErrorComment(null)

    setTaskList([
      {
        id: shortid.generate() ,
        title: inputTitle ,
        comment: inputComment
      } , 
      ...taskList ,
    ])

    // Set "inputTitle" "inputComment" to Empty 
    setInputTitle('')
    setInputComment('')
  }

  // ON EDIT STATE
  const onEdit = task => {
    // console.log(task)
    setEditMode(true)
    setInputTitle(task.title)
    setInputComment(task.comment)

    setCurrentId(task.id)
  }
  // SAVA CHANGES
  const saveChange = e => {
    e.preventDefault()

    // Conditions for Empty vlaues
    if(!inputTitle.trim()) {
      setErrorTitle('Empty Title')
      return
    }
    setErrorTitle(null)
    if(!inputComment.trim()) {
      setErrorComment('Empty Comment')
      return
    }
    setErrorComment(null)

    // New array of edited
    const editedArray = taskList.map(item => item.id === currentId ? {id: currentId, title: inputTitle, comment: inputComment} : item)
    setTaskList(editedArray) 

    setEditMode(false)
    setInputTitle('')
    setInputComment('')
    setCurrentId('')
  }
  
  // ON DELETE TASK
  const deleteTask = (id) => {
    // console.log(id) 

    // New array filtered 
    const filteredArray = taskList.filter(item => item.id !== id) //Add if the "item.id" is not equal to "id"
    setTaskList(filteredArray) //"filter" generates automatically an array
  }

  return (
    <div className='container'>
      <h1 className='text-center'>Sistema CRUD</h1>
      <hr />
      <div className="row">

        {/* SECCIÓN-LISTA */} 
        <div className="col-8">
          <h3>Lista de elementos</h3>
          <ul className="list-group ">
            
            {/* ITEM */} 
            {
              taskList.length === 0 ? (
                <div className="alert alert-warning" role="alert">
                 There's any tasks 
                </div>
              ) : (
                taskList.map(item => (
                  <div className="list-group-item" key={item.id}>
                    {/* TITLE - HEADER */}
                    <div>
                      <h5 style={{marginTop: 10, marginBottom: 10}}>{item.title}</h5>
                      <hr />
                      <p>{item.comment}</p>
                    </div>
                    {/* BUTTONS - EDIT - DELETE */}
                    <div style={{marginBottom: 10}}>
                      <button 
                        className='btn btn-outline-primary'
                        onClick={() => onEdit(item)}
                        >
                        Edit
                      </button>
                      <button 
                        className='btn btn-outline-danger'
                        onClick={ ()=> deleteTask(item.id) }
                        style={{marginLeft: 5}}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )
            }
          </ul>
        </div>

        {/* SECCION - AGREGAR - EDITAR */}
        <div className="col-4 ml-5">
          {
            editMode ? (
              <h3>Edit</h3>
            ) : (
              <h3>Add</h3>
            )
          }
          {/* FORM */}
          <form onSubmit={ editMode ? saveChange : addTask}>
            {/* INPUT - TITLE */}
            <div className="form-floating mb-3">
              <input 
                type="text" 
                className="form-control"
                id='titleID'
                placeholder='Inserta un titulo'
                onChange={e => setInputTitle(e.target.value)}
                autoComplete='off'
                value={inputTitle}
              />
              <label htmlFor='titleID'>Title</label>
            </div>
            {/* INPUT - DESCRIPCION */}
            <div className="form-floating mb-3">
              <textarea 
                className="form-control"
                id='commentID'
                placeholder='Inserta un Description'
                onChange={e => setInputComment(e.target.value)}
                autoComplete='off'
                value={inputComment}
              />
              <label htmlFor='commmentID'>Comment</label>
            </div>
            {/* SUBMIT BUTTON */}
            {
              editMode ? (
                <button className='btn btn-warning' type='submit'>Save Changes</button>                
                ) : (  
                <button className='btn btn-outline-success' type='submit'>Add</button>                
              )
            }
          </form>
          
          {/* ERROR PRINT */}
          {
            errorTitle ? (
              <div class="alert alert-danger " role="alert" style={{textAlign: 'center', margin: 20}}>
                <span style={{fontWeight: "bold"}}>{errorTitle}</span>
              </div>
            ) : null
          }
          {
            errorComment ? (
              <div class="alert alert-danger " role="alert" style={{textAlign: 'center', margin: 20}}>
                <span style={{fontWeight: "bold"}}>{errorComment}</span>
              </div>
            ) : null
          }

        </div>

      </div>
    </div>
  );
}

export default App;
