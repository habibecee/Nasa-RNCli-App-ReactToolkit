import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {GeneralStyles, fonts} from '../../Utils/GeneralStyles';
import Icon from 'react-native-vector-icons/Ionicons';

export default function NasaMedia() {
  const {navigate} = useNavigation();

  return (
    <SafeAreaView style={[GeneralStyles.SafeAreaView, styles.SafeAreaView]}>
      <Text style={styles.SubText}>CHOOSE MEDIA TYPE </Text>
      <View style={styles.Container}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => navigate('NasaMedias', {typeOf: 'image'})}>
          <Icon name="images-sharp" color="gray" size={24} />
          <Text style={styles.IconText}>Images</Text>
        </TouchableOpacity>

        <View style={styles.Border}></View>

        <TouchableOpacity
          style={styles.Button}
          onPress={() => navigate('NasaMedias', {typeOf: 'video'})}>
          <Icon name="videocam-sharp" color="gray" size={24} />
          <Text style={styles.IconText}>Videos</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  SubText: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: 'green',
    marginTop: 40,
    textAlign: 'center',
  },

  Container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 50,
  },

  Border: {
    borderWidth: 1,
    height: '100%',
    borderColor: 'gray',
  },

  Button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  IconText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: 'gray',
  },
});
