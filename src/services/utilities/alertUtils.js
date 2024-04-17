import { Alert } from 'react-native';

/**
 * Show a confirmation dialog with customizable actions
 * @param {string} title - The title of the alert
 * @param {string} message - The message of the alert
 * @param {Function} onConfirm - Function to execute on confirm
 * @param {Function} [onCancel] - Optional function to execute on cancel
 */
export const showConfirmationAlert = (title, message, onConfirm, onCancel) => {
  Alert.alert(title, message, [
    {
      text: 'Yes',
      onPress: onConfirm,
    },
    {
      text: 'No',
      onPress: onCancel || (() => {}),
      style: 'cancel',
    },
  ]);
};


/**
 * Show an error message dialog
 * @param {string} message - The error message to display
 */
export const showErrorAlert = (typeError, message) => {
  Alert.alert(typeError, message, [
    { text: "OK" }
  ]);
};

export const showInfoAlert = (message) => {
  Alert.alert(
    '',
    message,
    [
      { text: "OK" }
    ]
  );
};

