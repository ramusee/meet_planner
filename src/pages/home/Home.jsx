import React from 'react';
import { useMediaQuery } from '@mui/material';
import { HomeDesktop } from '../../components/homeComponents/homeDesktop/HomeDesktop';
import { HomeMobile } from '../../components/homeComponents/homeMobile/HomeMobile';

const Home = () => {
  const matches = useMediaQuery('(min-width: 990px)');
  if (matches) {
    return <HomeDesktop />;
  }
  return <HomeMobile />;
};

export { Home };
