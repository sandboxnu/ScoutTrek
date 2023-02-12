import { Card, Text, Button, Container } from 'ScoutDesign/library';

const NoEvents = ({ navigation }: { navigation: any }) => {
  return (
    <Container marginTop="l">
      <Card
        accessibilityLabel="no-events-card"
        title={
          <Text size="l" weight="bold" paddingTop="s" padding="m">
            You have no upcoming events
          </Text>
        }
      >
        <Button
          accessibilityLabel="create-event-button"
          text="Create one"
          onPress={() => navigation.navigate('CreateEvent')}
          fullWidth
        />
      </Card>
    </Container>
  );
};

export default NoEvents;
