import React from 'react';

import ClearModal from './ClearModal';
import ErrorModal from './ErrorModal';
import SaveNewBoardModal from './SaveNewBoardModal';
import LoadBoardModal from './LoadBoardModal';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import LogoutModal from './LogoutModal';
import LoginNeededModal from './LoginNeededModal';
import SaveComponent from './SaveComponent';
import ChooseComponent from './ChooseComponent';
import RenameCompModal from './RenameCompModal';
import ObjectifSuccessModal from './ObjectifSuccessModal';
import ObjectifInfoDetailModal from './ObjectifInfoDetailModal';
import ObjectifInfoStartModal from './ObjectifInfoStartModal';
import ObjectifFailModal from './ObjectifFailModal';

export default function ModalContainer(props) {
  return (
    <div>
      <ClearModal />
      <ErrorModal />
      <SaveNewBoardModal />
      <LoadBoardModal />
      <LoginModal />
      <RegisterModal />
      <LogoutModal />
      <LoginNeededModal />
      <SaveComponent />
      <ChooseComponent />
      <RenameCompModal />
      <ObjectifSuccessModal />
      <ObjectifInfoDetailModal />
      <ObjectifInfoStartModal />
      <ObjectifFailModal />
    </div>
  );
}
