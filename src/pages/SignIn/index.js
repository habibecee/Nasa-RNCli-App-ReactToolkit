import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {GeneralStyles, colors, fonts} from '../../Utils/GeneralStyles';
import {useForm, Controller} from 'react-hook-form';
import Avatar from '../../components/Avatar';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

const validationScheme = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string()
    .required('Please enter a valid email address!')
    .email('Please enter a valid email address!'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters!')
    .required('Please enter your password!'),
});

export default function SignIn() {
  const {
    control,

    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(validationScheme),
  });

  const onSubmit = data => console.log(data);

  return (
    <View style={[GeneralStyles.container, styles.container]}>
      <ScrollView>
        <Avatar
          style={styles.Avatar}
          source={require('../../../assets/animations/astronautPc.json')}
        />

        <View style={styles.InputContainer}>
          <Text style={styles.InputText}>First Name</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.TextInput}
                placeholderTextColor={colors.secondary}
                placeholder="First name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="firstName"
          />
          {errors.firstName && (
            <Text style={styles.ErrorText}>{errors.firstName?.message}</Text>
          )}

          <Text style={styles.InputText}>Last Name</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.TextInput}
                placeholderTextColor={colors.secondary}
                placeholder="Last name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="lastName"
          />

          {errors.lastName && (
            <Text style={styles.ErrorText}>{errors.lastName?.message}</Text>
          )}

          <Text style={styles.InputText}>E-Mail</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                inputMode="email"
                style={styles.TextInput}
                placeholderTextColor={colors.secondary}
                placeholder="E-Mail"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize={'none'}
              />
            )}
            name="Email"
          />
          {errors.email && (
            <Text style={styles.ErrorText}>{errors.email?.message}</Text>
          )}

          <Text style={styles.InputText}>Password</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                inputMode="password"
                style={styles.TextInput}
                placeholderTextColor={colors.secondary}
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                autoCapitalize={'none'}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={styles.ErrorText}>{errors.password?.message}</Text>
          )}

          <TouchableOpacity
            style={styles.ButtonContainer}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.ButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    justifyContent: 'center',
  },

  Avatar: {
    // backgroundColor: colors.darkGreen,
    alignSelf: 'center',
    marginBottom: 20,
    width: 200,
    minHeight: 200,
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
