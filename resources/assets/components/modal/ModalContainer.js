import React from 'react';

import ClearModal from './ClearModal';
import SaveNewBoardModal from './SaveNewBoardModal';
import LoadBoardModal from './LoadBoardModal';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import LogoutModal from './LogoutModal';
import LoginNeededModal from './LoginNeededModal';
import SaveComponent from './SaveComponent';

export default function ModalContainer(props) {
  return (
    <div>
      <ClearModal />
      <SaveNewBoardModal />
      <LoadBoardModal />
      <LoginModal />
      <RegisterModal />
      <LogoutModal />
      <LoginNeededModal />
      <SaveComponent />
    </div>
  );
}
