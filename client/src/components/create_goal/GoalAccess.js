import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { AccessDiv, AccessButton, AccessText, AcessLabel, AcessInput } from './GoalAccess.style';

// eslint-disable-next-line import/prefer-default-export
export const GoalAcess = () => {
  return (
    <AccessDiv>
      <>
        <AcessInput type="radio" name="access-option" id="access-option1" style={{ display: 'none' }} />
        <AcessLabel htmlFor="access-option1" className="access-label">
          <AccessButton>
            <GroupAddOutlinedIcon />
            <AccessText titleColor="#00b87c"> Zuri&apos;s workspace </AccessText>{' '}
          </AccessButton>{' '}
        </AcessLabel>
      </>
      <>
        <AcessInput type="radio" name="access-option" id="access-option2" style={{ display: 'none' }} />
        <AcessLabel htmlFor="access-option2">
          <AccessButton>
            <LockOutlinedIcon />
            <AccessText> Private </AccessText>{' '}
          </AccessButton>
        </AcessLabel>
      </>
    </AccessDiv>
  );
};
