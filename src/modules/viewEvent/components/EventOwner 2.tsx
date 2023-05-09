import { contact } from 'ScoutDesign/icons';
import { Button, Icon, LineItem, Text } from 'ScoutDesign/library';
import React from 'react';

interface Props {
  isOwner: boolean;
  owner: string;
  onChangeOwner: () => void;
}

const EventOwner: React.FC<Props> = ({ isOwner, owner, onChangeOwner }) => {
  return (
    <LineItem
      accessibilityLabel="event-owner"
      type="static"
      leftComponent={
        <Icon
          size="m"
          icon={contact}
          color="brandPrimary"
          paddingHorizontal="micro"
        />
      }
      rightComponent={
        isOwner ? (
          <Button
            onPress={onChangeOwner}
            text="Change"
            accessibilityLabel="change-event-owner"
            backgroundColor="brandPrimary"
          />
        ) : undefined
      }
    >
      <Text color="darkGrey" weight="bold" size="l" paddingBottom="micro">
        {owner}
      </Text>
      <LineItem.Subheading>Event Owner</LineItem.Subheading>
    </LineItem>
  );
};

export default EventOwner;
