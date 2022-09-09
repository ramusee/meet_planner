import React from 'react';
import { Link } from 'react-router-dom';

import { LinkBar } from '../linkBar/LinkBar';
import { ShareButton } from '../shareButton/ShareButton';

import { Button, Stack, Typography } from '@mui/material';

const HomeMobile = () => {
  return (
    <>
      <Stack mt="30px" width="100%" alignItems="center" spacing={3}>
        <Stack color="text.primary">
          <Typography textAlign="center" variant="body2" color="text.primary">
            Collect all available slots with your team in 3 steps:
          </Typography>
          <Typography variant="body2">1. Fill up your slots</Typography>
          <Typography variant="body2">2. Share the link and collect others</Typography>
          <Typography variant="body2">3. Find matches and schedule meeting</Typography>
        </Stack>
        <LinkBar />
      </Stack>
      <Stack spacing={2} width="100%">
        <Button variant="contained" color="success" component={Link} to="date">
          Fill up your slots
        </Button>
        <ShareButton />
      </Stack>
    </>
  );
};

export { HomeMobile };
