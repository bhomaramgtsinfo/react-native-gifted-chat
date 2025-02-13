import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Platform, StyleSheet, TextInput, } from 'react-native';
import { MIN_COMPOSER_HEIGHT, DEFAULT_PLACEHOLDER } from './Constant';
import Color from './Color';
import { StylePropType } from './utils';
import { useCallbackOne } from 'use-memo-one';
const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        lineHeight: 16,
        ...Platform.select({
            web: {
                paddingTop: 6,
                paddingLeft: 4,
            },
        }),
        marginTop: Platform.select({
            ios: 6,
            android: 0,
            web: 6,
        }),
        marginBottom: Platform.select({
            ios: 5,
            android: 3,
            web: 4,
        }),
    },
});
export function Composer({ composerHeight = MIN_COMPOSER_HEIGHT, disableComposer = false, keyboardAppearance = 'default', multiline = true, onInputSizeChanged = () => { }, onTextChanged = () => { }, placeholder = DEFAULT_PLACEHOLDER, placeholderTextColor = Color.defaultColor, text = '', textInputAutoFocus = false, textInputProps = {}, textInputStyle, }) {
    const layoutRef = useRef();
    const handleOnLayout = useCallbackOne(({ nativeEvent: { layout } }) => {
        // Support earlier versions of React Native on Android.
        if (!layout) {
            return;
        }
        if (!layoutRef ||
            (layoutRef.current &&
                (layoutRef.current.width !== layoutRef.current.width ||
                    layoutRef.current.height !== layoutRef.current.height))) {
            layoutRef.current = layout;
            onInputSizeChanged(layout);
        }
    }, [onInputSizeChanged]);
    return (<TextInput testID={placeholder} accessible accessibilityLabel={placeholder} placeholder={placeholder} placeholderTextColor={placeholderTextColor} multiline={multiline} editable={!disableComposer} onLayout={handleOnLayout} onChangeText={onTextChanged} style={[
            styles.textInput,
            textInputStyle,
            {
                height: composerHeight,
                ...Platform.select({
                    web: {
                        outlineWidth: 0,
                        outlineColor: 'transparent',
                        outlineOffset: 0,
                    },
                }),
            },
        ]} autoFocus={textInputAutoFocus} value={text} enablesReturnKeyAutomatically underlineColorAndroid='transparent' keyboardAppearance={keyboardAppearance} {...textInputProps}/>);
}
Composer.propTypes = {
    composerHeight: PropTypes.number,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    textInputProps: PropTypes.object,
    onTextChanged: PropTypes.func,
    onInputSizeChanged: PropTypes.func,
    multiline: PropTypes.bool,
    disableComposer: PropTypes.bool,
    textInputStyle: StylePropType,
    textInputAutoFocus: PropTypes.bool,
    keyboardAppearance: PropTypes.string,
};
//# sourceMappingURL=Composer.js.map