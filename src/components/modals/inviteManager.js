import React from 'react';

function InviteManager(props) {
    return (
        <div class="modal fade show zIndex-10000 display-block"
            style={{ background: 'rgb(110 110 110 / 50%)' }} id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="bg-white px-16 py-14 rounded-md text-center">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(InviteManager);