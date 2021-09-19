import { HeaderAvatar, HeaderAvatarGroupContainer } from './HeaderAvatarGroup.styled';

const HeaderAvatarGroup = () => (
  <HeaderAvatarGroupContainer max={4}>
    <HeaderAvatar variant="rounded">OP</HeaderAvatar>
    <HeaderAvatar variant="rounded">AD</HeaderAvatar>
    <HeaderAvatar variant="rounded">EW</HeaderAvatar>
    <HeaderAvatar variant="rounded">PV</HeaderAvatar>
    <HeaderAvatar variant="rounded">ZX</HeaderAvatar>
    <HeaderAvatar variant="rounded">NT</HeaderAvatar>
    <HeaderAvatar variant="rounded">ZL</HeaderAvatar>
  </HeaderAvatarGroupContainer>
);

export default HeaderAvatarGroup;
