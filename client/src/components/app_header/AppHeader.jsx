import { useEffect, useState, useMemo } from 'react';
import Parcel from 'single-spa-react/parcel';
import { pluginHeader } from '@zuri/plugin-header';
import { HeaderAppBar, HeaderToolBar, HeaderToolBarTitle } from './AppHeader.styled';
import HeaderAvatarGroup from './components/header_avatar_group/HeaderAvatarGroup';
import { GetWorkspaceUsers } from '@zuri/control';

export const GetUsers = async () => {
  const [total, settotal] = useState(null);
  try {
    const info = await GetWorkspaceUsers();
    console.log('totalWorkSpaceUser', info.totalUsers);

    const workspace_info = {
      thumbnailUrl: [
        info[0].image_url ||
          'https://www.kemhospitalpune.org/wp-content/uploads/2020/12/Profile_avatar_placeholder_large.png',
        info[1].image_url ||
          'https://www.kemhospitalpune.org/wp-content/uploads/2020/12/Profile_avatar_placeholder_large.png',
        info[2].image_url ||
          'https://www.kemhospitalpune.org/wp-content/uploads/2020/12/Profile_avatar_placeholder_large.png',
      ],
      userCount: info.totalUsers,
    };
    settotal(workspace_info);
  } catch (error) {
    console.log('Error', error);
    const workspace_info = {
      thumbnailUrl: [
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
        'https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg',
        'https://www.kemhospitalpune.org/wp-content/uploads/2020/12/Profile_avatar_placeholder_large.png',
      ],
      userCount: 50,
    };
    settotal(workspace_info);
  }
};
const AppHeader = () => {
  useEffect(() => {
    GetUsers();
  }, []);

  const headerConfig = useMemo(
    () => ({
      name: 'Goals Plugin', //Name on header
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4E8rvqCqoAlL7GUOvLTZn5amfp2pDTo5oNnBFnxhhFRCAqGVPCqGb2Yjb_Z9MK13BnXM&usqp=CAU', //Image on header
      thumbnailUrl: total && total.thumbnailUrl, //Replace with images of users
      userCount: total && total.userCount, //User count on header
      eventTitle: () => {
        //Block of code to be triggered on title click
      },
      eventThumbnail: () => {
        //Block of code to be triggered on thumbnail click
      },
      hasThumbnail: true, //set false if you don't want thumbnail on the header
    }),
    [total]
  );
  return pluginHeader ? (
    <Parcel config={pluginHeader} wrapWith="div" wrapStyle={{ width: '100%' }} headerConfig={headerConfig} />
  ) : (
    <HeaderAppBar elevation={false} position="static">
      <HeaderToolBar>
        <HeaderToolBarTitle># company goals</HeaderToolBarTitle>
        <HeaderAvatarGroup />
      </HeaderToolBar>
    </HeaderAppBar>
  );
};

export default AppHeader;
