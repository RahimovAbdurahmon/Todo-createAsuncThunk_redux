import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getUser, isCompleteUser, infoUser, addUser, editUser, searchUser, selectUser } from "./api/todos/todosApi";
import { Close } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};


const App = () => {
  /// dispatch
  const dispatch = useDispatch();

  /// search
  let [inpSearch, setInpSearch] = useState("")

  /// select
  let [select, setSelect] = useState("")

  /// get
  useEffect(() => {
    dispatch(getUser());
  }, []);
  let todos = useSelector((store) => store.todos.todos);
  let isLoading = useSelector((store) => store.todos.isLoading);

  /// info
  let [infoName, setInfoName] = useState("")
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function infoShow(user) {
    // dispatch(infoUser(user.id)); 
    handleOpen()
    setInfoName(user.name)
  }

  /// add
  let [inpAdd, setInpAdd] = useState("")
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  /// edit
  let [inpEdit, setInpEdit] = useState("")
  let [idx, setIdx] = useState(null)
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  function editShow(user) {
    handleOpenEdit()
    setInpEdit(user.name)
    setIdx(user)
  }

  return (
    <>
      <div className="p-[20px] lg:p-[50px] xl:px-[150px] flex items-center justify-between">
        <h1 className="text-[30px] font-[600]">Todo List</h1>
        <div className="flex items-center gap-[20px]">
            <TextField label="Search" value={inpSearch} onInput={() => dispatch(searchUser(inpSearch))} onChange={(event) => setInpSearch(event.target.value)} />
            <select name="" value={select} onClick={() => dispatch(selectUser(select))} onChange={(event) => setSelect(event.target.value)} className="w-[150px] px-[20px] py-[15px] rounded-[3px] border-[1px] border-gray-400" id="">
                <option value="">All status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
            <Button variant="contained" onClick={handleOpenAdd}>Add New +</Button>
        </div>
      </div>
      <div className="p-[20px] lg:p-[50px] xl:px-[150px] grid grid-cols-3 gap-[50px]">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          todos.map((elem) => {
            return (
              <div
                key={elem.id}
                className="p-[20px] px-[50px] shadow-2xl rounded-[5px] flex flex-col gap-[50px]"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-[20px] font-[600]">{elem.name}</h1>
                  <Button
                    variant="contained"
                    onClick={() => dispatch(isCompleteUser(elem))}
                    color={elem.isComplete ? "success" : "inherit"}
                  >
                    {elem.isComplete ? "Active" : "Inactive"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => dispatch(deleteUser(elem.id))}
                  >
                    Delete
                  </Button>
                  <Button variant="contained" onClick={() => editShow(elem)}>Edit</Button>
                  <Button variant="contained" color="secondary" onClick={() => infoShow(elem)}>
                    Info
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* dialog info */}
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="flex items-center justify-between mb-[20px]">
                <h1 className="text-[20px] font-[600]">Info User</h1>
                <Button onClick={handleClose}> <Close /> </Button>
              </div>
              <h1 className="text-[30px] font-[500]"><span className="font-[700]">Name : </span>{infoName}</h1>
            </Box>
          </Modal>
        </div>
        {/* dialog add */}
        <div>
          <Modal
            open={openAdd}
            onClose={handleCloseAdd}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="flex items-center justify-between mb-[20px]">
                <h1 className="text-[20px] font-[600]">Add User</h1>
                <Button onClick={handleCloseAdd}> <Close /> </Button>
              </div>
              <div className="flex flex-col gap-[30px] items-end">
                <TextField label="Name" value={inpAdd} onChange={(event) => setInpAdd(event.target.value)} fullWidth />
                <div className="flex items-center gap-[10px]">
                    <Button variant="outlined">Cancel</Button>
                    <Button variant="contained" onClick={() => {dispatch(addUser({name : inpAdd, isComplete : false})); handleCloseAdd()}}>Add</Button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
        {/* dialog edit */}
        <div>
          <Modal
            open={openEdit}
            onClose={handleCloseEdit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="flex items-center justify-between mb-[20px]">
                <h1 className="text-[20px] font-[600]">Edit User</h1>
                <Button onClick={handleCloseEdit}> <Close /> </Button>
              </div>
              <div className="flex flex-col gap-[30px] items-end">
                <TextField label="Name" value={inpEdit} onChange={(event) => setInpEdit(event.target.value)} fullWidth />
                <div className="flex items-center gap-[10px]">
                    <Button variant="outlined" onClick={handleCloseEdit}>Cancel</Button>
                    <Button variant="contained" onClick={() => {dispatch(editUser({id : idx.id, name : inpEdit, isComplete : idx.isComplete})); handleCloseEdit()}}>Add</Button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
    </>
  );
};

export default App;
