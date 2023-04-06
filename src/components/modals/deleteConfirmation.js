import React from 'react';
import { constants } from '../../config/constant';
import Button from '../atoms/buttons/button';

function DeleteConfirmation(props) {
    return (
        <div class="modal fade show zIndex-10000 display-block"
            style={{ background: 'rgb(110 110 110 / 50%)' }} id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" style={{ maxWidth: '300px' }} role="document">
                <div class="modal-content border-0 shadow-sm">
                    <div class="modal-body px-3 py-4">
                        <div class="bg-white px-16 py-14 rounded-md text-center">
                            <h4 class="text-xl mb-4 font-bold text-slate-500">Are you sure?</h4>
                            <p class="text-xl mb-4 font-bold text-muted text-slate-500 font-xsmall" style={{ color: constants.theme.gray }}>Your want to permanently delete this user</p>
                            <Button onClick={props.onClose} color={constants.theme.black} class="p-2 mx-2" bgColor={constants.theme.red}
                                isTransparent={true} text="cancel" />
                            <Button isDisabled={props.isLoading} isLoading={props.isLoading} onClick={props.handleDeleteUser} color='white' bgColor={constants.theme.red} class="p-2 mx-2" isTransparent={false} text="Delete" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(DeleteConfirmation);