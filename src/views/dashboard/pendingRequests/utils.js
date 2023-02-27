import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { deployedApiUrl, localApiUrl } from "../../../utility/Utils";

let token = localStorage?.getItem('AdminToken');

export const getAllRequests = async (setUserData) => {
    let localUrl = `${localApiUrl}/unverifiedUsers`;
    let deployedUrl = `${deployedApiUrl}/unverifiedUsers`

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
            console.log('res  unverifiedUsers', res?.unVerifiedUsersResponse)
            setUserData(res?.unVerifiedUsersResponse)
        })
        .catch((error) => {
            console.log('error', error)
        })
};

export const verifyUser = async (body, callPendingRequestsApi) => {

    let localUrl = `${localApiUrl}/admin/verifyUserByAdmin`;
    let deployedUrl = `${deployedApiUrl}/admin/verifyUserByAdmin`;

    console.log('body', body)

    await fetch(deployedUrl,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        }
    )
        .then(async (response) => {
            let res = await response.json();
            console.log('res verifyUserByAdmin', res);
            await callPendingRequestsApi()
        })
        .catch((error) => {
            console.log('error', error)
        })
}

export const Confirmation = ({ isOpen, setIsOpen, header, onConfirm, message }) => {
    return (
        <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
            <ModalHeader>
                {header}
            </ModalHeader>
            <ModalBody>
                {message}
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={() => {
                    onConfirm()
                    setIsOpen(!isOpen)
                }}>
                    Confirm
                </Button>
                <Button
                    color='secondary'
                    onClick={() => { setIsOpen(!isOpen) }}
                    outline
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
};
