import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Main from './components/main';

AppRegistry.registerComponent(appName, () => Main);

/*
if (window.document) {
    AppRegistry.runApplication(appName, {
        initialProps: {},
        rootTag: document.getElementById("react-root")
    });
}
*/