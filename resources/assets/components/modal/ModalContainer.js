import React from 'react';

import ClearModal from './ClearModal';
import SaveNewBoardModal from './SaveNewBoardModal';
import LoadBoardModal from './LoadBoardModal';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

export default function ModalContainer(props) {
  return (
    <div>
      <ClearModal />
      <SaveNewBoardModal />
      <LoadBoardModal />
      <LoginModal />
      <RegisterModal />
    </div>
  );
}
