import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';

interface MyWebViewProps {
    url: string;
}

const MyWebView: React.FC<MyWebViewProps> = ({ url }) => {
    const handleNavigationStateChange = (navState: WebViewNavigation) => {
        // Handle navigation state changes if needed
        console.log(navState);
    };

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: url }}
                onNavigationStateChange={handleNavigationStateChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default MyWebView;
