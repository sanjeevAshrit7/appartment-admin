import { Fragment, useState } from "react";
import { Button, Label, Modal, ModalBody, ModalHeader } from "reactstrap";

function SideBar(props) { 

    const { open, handleTaskSidebar, setOpen, requests } = props;

    const initialState = {
        
    }

    const [owner, setOwner] = useState(initialState);

    const renderFooterButtons = () => {
        return (
            <Fragment>
                <Button
                    color='primary'
                    className='add-todo-item me-1'
                    onClick={async () => {
                    
                    }}
                >
                    Verify
                </Button>
                <Button
                    color='secondary'
                    onClick={() => { setOpen(!open) }}
                    outline
                >
                    Cancel
                </Button>
            </Fragment>
        )
    };

    return (
        <Modal
            isOpen={open}
            toggle={handleTaskSidebar}
            className='sidebar-lg'
            contentClassName='p-0'
            // onOpened={handleSidebarOpened}
            // onClosed={handleSidebarClosed}
            modalClassName='modal-slide-in sidebar-todo-modal'
        >
            <ModalHeader>
                Verify user
            </ModalHeader>
            <ModalBody className='flex-grow-1 pb-sm-0 pb-3 mt-2'>
                <div className='mb-1'>
                    <Label className='form-label' for='task-title'>
                        User <span className='text-danger'>*</span>
                    </Label>
                </div>
                <div>{renderFooterButtons()}</div>
            </ModalBody>
        </Modal>
    );

};
export default SideBar;
