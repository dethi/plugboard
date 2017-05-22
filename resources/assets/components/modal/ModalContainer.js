import React from 'react';

import ClearModal from './ClearModal';
import SaveNewBoardModal from './SaveNewBoardModal';
import LoadBoardModal from './LoadBoardModal';

export default function ModalContainer(props) {
  return (
    <div>
      <ClearModal />
      <SaveNewBoardModal />
      <LoadBoardModal />
    </div>
  );
}
