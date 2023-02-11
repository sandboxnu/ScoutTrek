import { StyleSheet } from 'react-native';

import { WebView } from 'react-native-webview';
import { Container, Text } from 'ScoutDesign/library';

type Props = {
  description: string;
};

const Description = ({ description }: Props) => {
  return (
    <Container
      radius="m"
      backgroundColor="lightMintGrey"
      margin="m"
      borderWidth={1}
      borderColor="mintGrey"
      padding="s"
    >
      <Text preset="h2" paddingHorizontal="m" paddingTop="s">
        Additional event info
      </Text>
      <WebView
        originWhitelist={['*']}
        style={styles.webview}
        source={{
          html: `<!DOCTYPE html>
                    <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=0.99">
                        </head>
                        <body style="background-color: ${'#F4F6F5'}; padding: 8px; font-size: 15px; font-family: "Open Sans", Metropolis, serif">
                            ${description}
                        </body>
                    </html>`,
        }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    minHeight: 150,
  },
});

export default Description;
