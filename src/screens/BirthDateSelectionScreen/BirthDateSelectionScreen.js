import React, { useState } from 'react';
import { View, StyleSheet, Button, Platform, Text, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const BirthDateSelectionScreen = ({ route, navigation }) => {
    const { gender } = route.params;
    const [birthDate, setBirthDate] = useState(new Date());
    const [isPickerShow, setIsPickerShow] = useState(false);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || birthDate;
        setIsPickerShow(Platform.OS === 'ios'); // Keep picker visible on iOS after selection
        setBirthDate(currentDate);
    };

    const showPicker = () => {
        setIsPickerShow(true);
    };

    const handleNext = () => {
        navigation.navigate('Registration', { gender, birthDate: birthDate.toISOString() });
    };

    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.centered_view}>
                <Text style={styles.title}>Your birth date is:</Text>
                {Platform.OS === 'ios' && (
                    <>
                        <Text style={styles.instruction}>
                            Please select a date that is not in the future.
                        </Text>
                        <DateTimePicker
                            value={birthDate}
                            mode="date"
                            display="spinner"
                            onChange={onChangeDate}
                            maximumDate={new Date()}
                        />
                    </>
                )}
                {Platform.OS === 'android' && (
                    <>
                        <Button title="Choose Date" onPress={showPicker} color="#000" />
                        <Text style={styles.birthDateText}>
                            {formatDate(birthDate)}
                        </Text>
                    </>
                )}
                {isPickerShow && Platform.OS === 'android' && (
                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={isPickerShow}
                        supportedOrientations={['portrait']}
                        onRequestClose={() => setIsPickerShow(false)}
                    >
                        <View style={styles.modalView}>
                            <DateTimePicker
                                value={birthDate}
                                mode="date"
                                display="default"
                                onChange={onChangeDate}
                                maximumDate={new Date()}
                            />
                        </View>
                    </Modal>
                )}
            </View>
            <Button title="Next" onPress={handleNext} color="#000" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    centered_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 15,
        textAlign: 'center',
    },
    instruction: { // Style for the instruction text
        marginBottom: 10,
        color: 'gray',
        textAlign: 'center',
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    birthDateText: {
        fontSize: 24,
        marginTop: 20,
        color: 'gray',
    },
});

export default BirthDateSelectionScreen;
