import { isEmpty } from "lodash";
import { Fragment } from "react";
import { X } from "react-feather";
import { toast } from "react-hot-toast";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { deployedApiUrl, localApiUrl } from "../../../utility/Utils";

let token = localStorage?.getItem('AdminToken');

//using fectch calls instaed of axios temporarily
export const getVerifiedUsers = async ( setUserData ) => {
    let localUrl = `${localApiUrl}/verifiedUser`;
    let deployedUrl = `${deployedApiUrl}/verifiedUser`
    // console.log('token', token)

    await fetch(deployedUrl,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }
    )
        .then(async (response) => {
            let res = await response.json();
            console.log('res getVerified user', res?.usersResponse)
            setUserData(res?.usersResponse?.map((item) => ({
                ...item, value: item?.name, label: item?.name
            })))
        })
        .catch((error) => {
            console.log('error', error)
        })
};

export const getAppartments = async ( setAppartments ) => {
    let localUrl = `${localApiUrl}/apartment`;
    let deployedUrl = `${deployedApiUrl}/apartment`;

    await fetch(deployedUrl,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }
    )
        .then(async (response) => {
            let res = await response.json();
            console.log('res getAppartments', res?.message);
            setAppartments(res?.message?.map((item) => ({
                ...item, value: item?.apartmentName, label: item?.apartmentName
            })))
        })
        .catch((error) => {
            console.log('error', error)
        })
};

export const getBlock = async (appartmentId, setBlocks) => {
    let localUrl = `${localApiUrl}/apartment/block/${appartmentId}`;
    let deployedUrl = `${deployedApiUrl}/apartment/block/${appartmentId}`;

    await fetch(deployedUrl,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }
    )
        .then(async (response) => {
            let res = await response.json();
            console.log('res getBlocks', res?.blockResponse);
            setBlocks(res?.blockResponse?.map((item) => ({
                ...item, value: item?.blockName, label: item?.blockName
            })))
        })
        .catch((error) => {
            console.log('error', error)
        })
};

export const getFlat = async (blockId, setFlats) => {
    let localUrl = `${localApiUrl}/apartment/block/flat/${blockId}`;
    let deployedUrl = `${deployedApiUrl}/apartment/block/flat/${blockId}`;

    await fetch(deployedUrl,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }
    )
        .then(async (response) => {
            let res = await response.json();
            console.log('res getFlats', res);
            setFlats(res?.flatResponse?.map((item) => ({
                ...item, value: item?.flatName, label: item?.flatName
            })))
        })
        .catch((error) => {
            console.log('error', error)
        })
};

export const validateAddOwnerPayload = (error, setError, value) => {
    setError(prev => {
        return ({
            ...prev,
            name: isEmpty(value?.name) ? 'please select a value' : '',
            appartment: isEmpty(value?.appartment) ? 'please select a value' : '',
            block: isEmpty(value?.block) ? 'please select a value' : '',
            flat: isEmpty(value?.flat) ? 'please select a value' : '',
        })
    })
};

export const ErrorToastContent = ({ t, isError=true, actionName }) => {
    return (
        <div className='d-flex'>
            <div className='d-flex flex-column'>
                <div className='d-flex justify-content-between'>
                    <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
                </div>
                <span className={isError ? "text-danger" : 'text-success'}>{isError ? `Please enter all details..!!` : `${actionName} successfully`}</span>
            </div>
        </div>
    )
};

export const getAllOwners = async (setUserData) => {
    let localUrl = `${localApiUrl}/owners`;
    let deployedUrl = `${deployedApiUrl}/owners`

    await fetch(deployedUrl,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }
    )
        .then(async (response) => {
            let res = await response.json();
            console.log('res getVerified user', res?.ownersResponse)
            setUserData(res?.ownersResponse)
        })
        .catch((error) => {
            console.log('error', error)
        })
};

export const columns = [
    {
        name: 'Flat owner',
        cell: row => {
            return (
                <Fragment>
                    <h6 className='user-name text-truncate mb-0'>{row.name}</h6>
                </Fragment>
            )
        },
    },
    {
        name: 'Flats',
        cell: row => {
            return (
                <Fragment>
                    <h6 className='user-name text-truncate mb-0'>{row.unit}</h6>
                </Fragment>
            )
        },
    },
    {
        name: 'Wing name',
        cell: row => {
            return (
                <Fragment>
                    <h6 className='user-name text-truncate mb-0'>{row.phone}</h6>
                </Fragment>
            )
        },
    },
];

export const Paginantion = ({
    length,
    data = [],
    setPage,
    page
}) => {
    return (
        <Pagination aria-label="Page navigation example" className="pt-1">
            <PaginationItem
                disabled={page === 0}
                onClick={() => {
                    setPage(0)
                }}
            >
                <PaginationLink
                    first
                />
            </PaginationItem>
            <PaginationItem
                disabled={page === 0}
                onClick={() => {
                    if (page !== 0) {
                        setPage(page - 1)
                    }
                }}
            >
                <PaginationLink

                    previous
                />
            </PaginationItem>
            {
                data?.map((item, index) => {
                    // console.log('index', index)
                    return (
                        <PaginationItem
                            active={
                                page === index
                            }
                            onClick={() => {
                                setPage(index)
                            }}
                        >
                            <PaginationLink >
                                {index +1 }
                            </PaginationLink>
                        </PaginationItem>
                    )
                })
            }
            <PaginationItem
                disabled={page === data?.length - 1}
                onClick={() => {
                    if (page !== data?.length - 1) {
                        setPage(page + 1)
                    }
                }}
            >
                <PaginationLink
                    next
                />
            </PaginationItem>
            <PaginationItem
                disabled={page === data?.length-1}
                onClick={() => {
                    setPage(data.length-1)
                }}
            >
                <PaginationLink
                    last
                />
            </PaginationItem>
        </Pagination>
    )
}

export const getArray = (length) => {
    let traversy = [];
    for (let i = 0; i < length; i++) {
        traversy.push(i)
    };
    return traversy;
}