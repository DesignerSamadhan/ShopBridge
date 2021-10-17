import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';


import {ItemActions} from '../../_actions';

function InventoryList(props)
{

    const [show, setShow] = useState(false);    
    const [showConfirm, setShowConfirm]  = useState(false);
    const [deleteItemId, setDeleteItemId] = useState('');
    const [newItem, setNewItem] = useState({id: 0, name: "",description: "",price:'',quantity:''});   

    const handleClose = () => {    
        setShow(false);   
        let resetState = {id: 0, name: "",description: "",price:'',quantity:''};
        setNewItem(resetState);       
    }
    const handleCreateItem = () => setShow(true);
    const handleCloseConfirm = () => setShowConfirm(false);

    function handleChange (e) {
        if(e.target.name === 'name'){
            let itemObj = {...newItem, name : e.target.value};
            setNewItem(itemObj);
        }
        if(e.target.name === 'description'){
            let itemObj = {...newItem, description : e.target.value};
            setNewItem(itemObj);
        }
        if(e.target.name === 'price'){
            let itemObj = {...newItem, price : e.target.value};
            setNewItem(itemObj);
        }
        if(e.target.name === 'quantity'){           
            let itemObj = {...newItem, quantity : e.target.value};
            setNewItem(itemObj);          
        }        
    }

    function handleSubmit(event){
        event.preventDefault();   
        if(newItem.id === 0){
            props.postNewItem(newItem);      
        }else{
            props.updateItem(newItem);
        }        
        setShow(false);            
        let resetState = {id: 0, name: "",description: "",price:'',quantity:''};
        setNewItem(resetState);  
    }
    function editItem(item){ 
        setNewItem(item);
        setShow(true);
    }

    function deleteConfirmItem(id){
        setShowConfirm(true);
        setDeleteItemId(id);
    }

    function deleteItem(){        
        props.removeItem(deleteItemId);
        setShowConfirm(false);
    }

    useEffect(()=> {       
        props.getAllItems(); 
    }, [])  

    const { InventoryItems } = props;   

    return(
        <div className="container position-relative">
            <h3 className="page-header">Inventory Store  <button type="button" className="btn btn-primary btn-sm float-end" onClick={handleCreateItem}>Add New Item</button></h3>                        
            {InventoryItems.loading && <div className="loader"><img src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="Loader" /></div>}
            {InventoryItems.error && <span className="text-danger">ERROR: {InventoryItems.error}</span>}
            {InventoryItems.allItems && InventoryItems.allItems.length > 0 ?
                <div>                    
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {InventoryItems.allItems.map((item, index) =>
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td className="text-end">{item.price}</td>
                                    <td className="text-center">{item.quantity}</td>
                                    <td className="text-center">
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="btn btn-primary btn-sm" onClick={()=>editItem(item)}>Edit</button>
                                            <button type="button" className="btn btn-secondary btn-sm" onClick={()=>deleteConfirmItem(item.id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            : ""}

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={(event)=>handleSubmit(event)}>
                    <Modal.Header>
                    <Modal.Title>{newItem.id === 0 ? 'Add New Item' : 'Edit Item'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>                
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" size="sm" placeholder="Enter Name" name="name" value={newItem.name} onChange={(e) => handleChange(e)} required />                                                   
                            </Form.Group>                            
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Enter Description" name="description" value={newItem.description} onChange={(e) => handleChange(e)} required />                   
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" size="sm" placeholder="Enter Price" name="price" value={newItem.price} onChange={(e) => handleChange(e)}  required/>                   
                            </Form.Group>                    
                            <Form.Group className="mb-3">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="number" size="sm" placeholder="0" name="quantity" value={newItem.quantity} onChange={(e) => handleChange(e)} required/>                   
                            </Form.Group>              
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" size="sm" type="submit">
                        Save
                    </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={showConfirm} onHide={handleCloseConfirm}>
                <Modal.Header>
                <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>  
                    Are you sure want to delete this record?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" size="sm" onClick={handleCloseConfirm}>
                    Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={deleteItem}>
                    Yes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

function mapStateToProps(state) {
    console.log("state", state);
    const {InventoryItems} = state;   
    return { InventoryItems };
}

const mapDispatchToProps = {   
    getAllItems: ItemActions.getAllItems,  
    postNewItem: ItemActions.postNewItem,
    removeItem: ItemActions.deleteItem,
    updateItem: ItemActions.updateItem
}

const connectedInventoryList = connect(mapStateToProps, mapDispatchToProps)(InventoryList);
export { connectedInventoryList as InventoryList };