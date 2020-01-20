import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Title,
  FlexBox,
  PageContainer,
} from '/client/components/atoms';

import './styles.scss';

const Community = () => (
  <PageContainer>
    <FlexBox column align justifyBetween>
      <Paper className="page_community-card">
        <Title variant="h3" gutterBottom>Our Podcast</Title>
        <iframe
          src="https://open.spotify.com/embed-podcast/show/7jPpEntVVviSy0SNOqnZMq"
          width="100%"
          height="232"
          frameBorder="0"
          allow="encrypted-media"
          title="spotify"
        />
      </Paper>
      <Paper className="page_community-card">
        <Title variant="h3" gutterBottom>Join our discussions</Title>
        <iframe
          src="https://discordapp.com/widget?id=513750483572097034&amp;theme=dark"
          width="100%"
          height="232"
          frameBorder="0"
          title="discord"
        />
      </Paper>
    </FlexBox>
  </PageContainer>
);

export default Community;
