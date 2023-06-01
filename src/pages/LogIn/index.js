import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import {GeneralStyles} from '../../Utils/GeneralStyles';
import {fonts} from '../../Utils/GeneralStyles';
import {colors} from '../../Utils/GeneralStyles';
import Avatar from '../../components/Avatar';
import * as Yup from 'yup';

const validationScheme = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address!')
    .required('Please enter your mail address!'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters!')
    .required('Please enter your password!'),
});

export default function LogIn() {
  const handleSubmit = values => {
    console.log(values);
  };

  return (
    <View style={[GeneralStyles.container, styles.container]}>
      <ScrollView>
        <Avatar
          style={styles.Avatar}
          source={require('../../../assets/animations/spacemanUser.json')}
        />

        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={handleSubmit}
          validationSchema={validationScheme}>
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            touched,
            isValid,
            dirty,
          }) => (
            <View style={styles.InputContainer}>
              <Text style={styles.InputText}>E-mail</Text>
              <TextInput
                style={styles.TextInput}
                placeholder="E-Mail"
                placeholderTextColor={colors.secondary}
                onChangeText={handleChange('email')}
                value={values.email}
                keyboardType="email-address"
                autoCapitalize={'none'}
              />
              {
                // If the user touched the input and the input is not valid, show the error message
                touched.email && errors.email && (
                  <Text style={styles.ErrorText}> {errors.email} </Text>
                )
              }
              <Text style={styles.InputText}>Password</Text>
              <TextInput
                style={styles.TextInput}
                placeholder="Password"
                placeholderTextColor={colors.secondary}
                onChangeText={handleChange('password')}
                secureTextEntry
                autoCapitalize={'none'}
                value={values.password}
              />
              {
                // If the user touched the input and the input is not valid, show the error message
                touched.password && errors.password && (
                  <Text style={styles.ErrorText}>{errors.password}</Text>
                )
              }
              <TouchableOpacity
                style={
                  !isValid || !dirty
                    ? [styles.ButtonContainer, {opacity: 0.7}]
                    : styles.ButtonContainer
                }
                onPress={handleSubmit}
                disabled={!isValid || !dirty}>
                <Text style={styles.ButtonText}>Log In</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingVertical: 20,
  },

  Avatar: {
    minWidth: 200,
    minHeight: 200,
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },

  InputContainer: {
    margin: 10,
    padding: 10,
    gap: 10,
  },

  InputText: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.dark,
  },

  TextInput: {
    borderWidth: 1,
    borderColor: colors.dark,
    padding: 10,
    borderRadius: 10,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.dark,
  },

  ErrorText: {
    color: 'red',
    fontFamily: fonts.regular,
    fontSize: 16,
  },

  ButtonContainer: {
    backgroundColor: colors.dark,
    padding: 10,
    borderRadius: 10,
  },
  ButtonText: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});
