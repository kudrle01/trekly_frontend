import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useFilterStore from '../../store/filterStore';

const SearchBar = ({placeholder}) => {
    const setSearchQuery = useFilterStore(state => state.setSearchQuery);
    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    };

    // Debounced handleSearch
    const handleSearch = debounce((text) => {
        setSearchQuery(text);
    }, 300);

    useEffect(() => {
        handleSearch(inputValue);
    }, [inputValue]);


    return (
        <TouchableWithoutFeedback onPress={() => inputRef.current.focus()}>
            <View style={[styles.container, isFocused && styles.containerFocused]}>
                <Ionicons name="search" size={20} color="#B4B4B8" />
                <TextInput
                    ref={inputRef} // Use the ref here
                    style={styles.input}
                    placeholder={placeholder}
                    value={inputValue}
                    onChangeText={setInputValue}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginVertical: 10,
        borderColor: '#B4B4B8',
        borderWidth: 2,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },

    containerFocused: {
        borderColor: 'black',
    },

    input: {
        flex: 1,
        height: 40,
        marginHorizontal: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
    },
});

export default SearchBar;
