import React from 'react';
import WebView from 'react-native-webview';
import {Text, View, StyleSheet} from 'react-native';

function MyWebView(props) {
  return (
    <View style={styles.container}>
      <WebView
        {...props}
        originWhitelist={['*']}
        source={{uri: 'https://google.com'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default MyWebView;
