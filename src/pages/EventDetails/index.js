import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchEventDetails} from '../../features/EventDetails/EventDetailsSlice';
import Loading from '../../components/LoadingIcon';
import {colors, fonts} from '../../Utils/GeneralStyles';
import {GeneralStyles} from '../../Utils/GeneralStyles';

const EventDetails = ({route}) => {
  const {navigate} = useNavigation();
  const id = route.params.id;
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.EventDetails);

  useEffect(() => {
    dispatch(fetchEventDetails(id));
  }, [dispatch, id]);

  if (loading || !data) {
    return (
      <SafeAreaView style={GeneralStyles.SafeAreaView}>
        <Loading />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={GeneralStyles.SafeAreaView}>
        <View style={styles.container}>
          <Text style={styles.errorText}> Error: {error} </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={[GeneralStyles.container, styles.container]}>
      <Text style={styles.SubText}> Event Name: {data?.title}</Text>

      {data?.categories &&
        data?.categories?.map((item, index) => (
          <View key={index}>
            <Text style={styles.SubSecText}>
              {' '}
              Category Name:{' '}
              <Text style={styles.TextCatInfo}>{item?.title}</Text>{' '}
            </Text>
          </View>
        ))}

      <ScrollView>
        <Text style={styles.SubThirdText}>GEOMETRIC VALUES</Text>

        {data?.geometry &&
          data?.geometry?.map((item, index) => (
            <View style={styles.geometryItemContainer} key={index}>
              <Text style={styles.SubInfo}>
                {' '}
                Magnitude Value:{' '}
                <Text style={styles.TextInfo}>{item?.magnitudeValue}</Text>{' '}
              </Text>
              <Text style={styles.SubInfo}>
                {' '}
                Magnitude Unit:{' '}
                <Text style={styles.TextInfo}>{item?.magnitudeUnit}</Text>{' '}
              </Text>

              <Text style={styles.SubInfo}>
                {' '}
                Date: <Text style={styles.TextInfo}>{item?.date}</Text>{' '}
              </Text>

              <Text style={styles.SubInfo}>
                {' '}
                Type: <Text style={styles.TextInfo}>{item?.type}</Text>{' '}
              </Text>
              <Text style={styles.SubInfo}>
                {' '}
                Coordinates:{' '}
                <Text style={styles.TextInfo}>{item?.coordinates}</Text>{' '}
              </Text>
            </View>
          ))}

        <Text style={styles.SubThirdText}>SOURCES</Text>

        {data?.sources &&
          data?.sources?.map((item, index) => (
            <View style={styles.geometryItemContainer} key={index}>
              <Text style={styles.SubInfo}>
                {' '}
                Sources: <Text style={styles.TextInfo}>{item?.id}</Text>{' '}
              </Text>

              <TouchableOpacity onPress={() => Linking.openURL(item?.url)}>
                <Text style={styles.SubInfo}>
                  {' '}
                  URL(Download):{' '}
                  <Text style={styles.TextInfo}>{item?.url}</Text>{' '}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('Events')}>
        <Text style={styles.buttonText}> See all events </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  errorText: {
    color: colors.red,
    fontFamily: fonts.bold,
    fontSize: 18,
  },

  SubText: {
    fontFamily: fonts.bold,
    fontSize: 24,
    marginBottom: 10,
    color: colors.textPrice,
  },

  SubSecText: {
    fontFamily: fonts.bold,
    fontSize: 20,
    marginBottom: 10,
    color: colors.textDark,
    textDecorationLine: 'underline',
  },

  SubThirdText: {
    margin: 20,
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.textLight,
    textDecorationLine: 'underline',
  },

  TextCatInfo: {
    fontFamily: fonts.regular,
    fontSize: 20,
    color: colors.textDark,
  },

  SubInfo: {
    fontFamily: fonts.bold,
    fontSize: 20,
    marginBottom: 10,
    color: colors.primary,
  },

  geometryItemContainer: {
    padding: 20,
    marginVertical: 30,
    marginHorizontal: 10,
    backgroundColor: colors.tertiary,
    borderWidth: 1,
    borderColor: colors.tertiary,
    borderRadius: 10,
    shadowColor: colors.dark,
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  TextInfo: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.textDark,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.light,
    textAlign: 'center',
  },
});

export default EventDetails;
