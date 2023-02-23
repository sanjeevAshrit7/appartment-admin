import Select from 'react-select'
import React, { Fragment, useEffect, useState } from 'react';
import { Button, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Spinner } from 'reactstrap'
import { deployedApiUrl, localApiUrl, selectThemeColors } from '../../../utility/Utils';
import { ErrorToastContent, getAllOwners, getAppartments, getBlock, getFlat, getVerifiedUsers, validateAddOwnerPayload } from './utils';
import { isEmpty } from 'lodash';
import { toast } from 'react-hot-toast';

function SideBar(props) {
    const { open, handleTaskSidebar, setOpen, setAllOwners } = props;
    let token = localStorage?.getItem('AdminToken');

    const initialState = {
        appartment: '',
        block: '',
        flat: '',
        name: '',
        unit: '',
        phone: ''
    };

    const addOwnerPayloadInitial = {
        userId: "",
        apartmentName: "",
        block: "",
        userOwnsFlat: ""
    };

    const errorState = {
        name: '',
        appartment: '',
        block: '',
        flat: '',
    }

    const [owner, setOwner] = useState(initialState);
    const [addOwnerPayload, setAddOwnerPayload] = useState(addOwnerPayloadInitial);
    const [error, setError] = useState(errorState);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [appartments, setAppartments] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [flats, setFlats] = useState([]);

    const addOwner = async (body) => {
        let localUrl = `${localApiUrl}/addOwner`;
        let deployedUrl = `${deployedApiUrl}/addOwner`;
        setLoading(true);
        await fetch(deployedUrl,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            }
        )
            .then(async (response) => {
                let res = await response.json();
                console.log('res addOwner', res);
                getAllOwners(setAllOwners);
                getVerifiedUsers(setUserData);
                setLoading(false);
                handleSidebarClosed();
                setOpen(!open)
            })
            .catch((error) => {
                console.log('error', error);
                setLoading(false);
            })
    };

    const handleSidebarClosed = () => {
        setAddOwnerPayload(addOwnerPayloadInitial);
        setError(errorState);
        setOwner(initialState)
    }

    const renderFooterButtons = () => {
        return (
            <Fragment>
                <Button
                    color='primary'
                    className='add-todo-item me-1'
                    onClick={async() => {
                        validateAddOwnerPayload(
                            error,
                            setError,
                            {
                                name: owner?.name,
                                appartment: owner?.appartment,
                                block: owner?.block,
                                flat: owner?.flat
                            }
                        );
                        if(isEmpty(owner.name) || isEmpty(owner.appartment) ||
                            isEmpty(owner.block) || isEmpty(owner.flat))
                        {
                            toast(t => (
                                <ErrorToastContent  t={t}/>
                            ))
                        } else {
                            await addOwner(addOwnerPayload)
                                .catch((error) => {
                                    console.log('error in add owner')
                                })
                            toast(t => (
                                <ErrorToastContent t={t} isError={false} actionName={'Added owner'} />
                            ))
                            console.log('error free')
                        }
                        console.log('addOwnerpyload', addOwnerPayload);
                        console.log('error', error)
                    }}
                    disabled={loading}
                >
                    Add
                    {loading ?
                        <>&nbsp;&nbsp;<Spinner size={'sm'} /></>
                        : <></>
                    }
                </Button>
                <Button
                    color='secondary'
                    onClick={() => { setOpen(!open) }}
                    outline
                    disabled={loading}
                >
                    Cancel
                </Button>
            </Fragment>
        )
    };

    useEffect(() => {
        getVerifiedUsers(setUserData);
        if (isEmpty(appartments)) {
            getAppartments(setAppartments);
        }
    }, [])
    
    return (
        <Modal
            isOpen={open}
            toggle={handleTaskSidebar}
            className='sidebar-lg'
            contentClassName='p-0'
            // onOpened={handleSidebarOpened}
            onClosed={handleSidebarClosed}
            modalClassName='modal-slide-in sidebar-todo-modal'
        >
            <ModalHeader>
                Add Owner
            </ModalHeader>
            <ModalBody className='flex-grow-1 pb-sm-0 pb-3 mt-2'>
                <div className='mb-1'>
                    <Label className='form-label' for='task-title'>
                        Owner Name<span className='text-danger'>*</span>
                    </Label>
                    <Select
                        id='task-tags'
                        className='react-select'
                        classNamePrefix='select'
                        isClearable={false}
                        options={userData}
                        theme={selectThemeColors}
                        placeholder={owner?.name ? owner?.name : 'Please select the owner'}
                        value={owner.name}
                        onChange={(data) => {
                            // console.log('data slect owner', data)
                            setOwner(prev => {
                                return ({
                                    ...prev,
                                    name: data?.name
                                })
                            });
                            setAddOwnerPayload(prev => {
                                return ({
                                    ...prev,
                                    userId: data?._id
                                })
                            });
                            setError(prev => {
                                return ({
                                    ...prev,
                                    name: '',
                                })
                            });
                        }}
                    />
                    <span className='text-danger'>{error.name}</span>
                </div>
                <div>
                    <div className='mb-1'>
                        <Label className='form-label' for='task-title'>
                            Appartment <span className='text-danger'>*</span>
                        </Label>
                        <Select
                            id='appartments'
                            className='react-select'
                            classNamePrefix='select'
                            isClearable={false}
                            options={appartments}
                            theme={selectThemeColors}
                            placeholder={owner?.appartment ? owner?.appartment : 'Please select an appartmernt'}
                            value={owner.appartment}
                            onChange={async (data) => {
                                // console.log('data onchange appartment', data)
                                setOwner(prev => {
                                    return ({
                                        ...prev,
                                        appartment: data?.apartmentName
                                    })
                                });
                                await getBlock(data?._id, setBlocks);
                                setAddOwnerPayload(prev => {
                                    return ({
                                        ...prev,
                                        apartmentName : data?._id
                                    })
                                });
                                setError(prev => {
                                    return ({
                                        ...prev,
                                        appartment: '',
                                    })
                                });
                            }}
                        />
                        <span className='text-danger'>{error.appartment}</span>
                    </div>
                    <div className='mb-1'>
                        <Label className='form-label' for='task-title'>
                            Block <span className='text-danger'>*</span>
                        </Label>
                        <Select
                            id='appartments'
                            className='react-select'
                            classNamePrefix='select'
                            isClearable={false}
                            options={blocks}
                            theme={selectThemeColors}
                            placeholder={owner?.block ? owner?.block : 'Please select a block'}
                            value={owner.block}
                            onChange={async (data) => {
                                // console.log('onChange data block', data)
                                setOwner(prev => {
                                    return ({
                                        ...prev,
                                        block: data?.label
                                    })
                                });
                                await getFlat(data?._id, setFlats);
                                setAddOwnerPayload(prev => {
                                    return ({
                                        ...prev,
                                        block: data?._id
                                    })
                                });
                                setError(prev => {
                                    return ({
                                        ...prev,
                                        block: '',
                                    })
                                });
                            }}
                        />
                        <span className='text-danger'>{error.block}</span>
                    </div>
                    <div className='mb-1'>
                        <Label className='form-label' for='task-title'>
                            Flat <span className='text-danger'>*</span>
                        </Label>
                        <Select
                            id='flats'
                            className='react-select'
                            classNamePrefix='select'
                            isClearable={false}
                            options={flats}
                            theme={selectThemeColors}
                            placeholder={owner?.flat ? owner?.flat : 'Please select a flat'}
                            value={owner.flat}
                            onChange={(data) => {
                                console.log('onChange data flat', data)
                                setOwner(prev => {
                                    return ({
                                        ...prev,
                                        flat: data?.label
                                    })
                                });
                                setAddOwnerPayload(prev => {
                                    return ({
                                        ...prev,
                                        userOwnsFlat: data?._id
                                    })
                                });
                                setError(prev => {
                                    return ({
                                        ...prev,
                                        flat: '',
                                    })
                                });
                            }}
                        />
                        <span className='text-danger'>{error.flat}</span>
                    </div>
                    <div className='mb-1 hidden'>
                        <Label className='form-label' for='task-title'>
                            Contact no
                        </Label>
                        <Input
                            id='contact-number'
                            placeholder='Contact number'
                            value={owner.phone}
                            onChange={(e) => {
                                setOwner((prev) => {
                                    return ({
                                        ...prev,
                                        phone: e.target.value
                                    })
                                })
                                // setPhone(e.target.value);
                            }}
                            className='new-todo-item-title'
                        />
                    </div>
                </div>
                <div>{renderFooterButtons()}</div>
            </ModalBody>
        </Modal>
    )
}

export default SideBar