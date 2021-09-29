import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import styled from 'styled-components';

const HeaderAvatar = styled(Avatar)`
  height: 30px;
  width: 35px;
  font-size: 0.74rem;
`;
const HeaderAvatarGroupContainer = styled(AvatarGroup)`
  background-color: #fff;
  & > .MuiAvatarGroup-avatar:last-child {
    height: 30px;
    width: 32px;
    border: 0;
    background-color: #fff;
    color: #000;
    font-size: 0.94rem;
  }
`;

export { HeaderAvatar, HeaderAvatarGroupContainer };
