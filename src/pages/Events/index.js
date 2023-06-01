import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {GeneralStyles, colors, fonts} from '../../Utils/GeneralStyles';
import Loading from '../../components/LoadingIcon';
import {useNavigation} from '@react-navigation/native';
import {fetchEvents} from '../../features/Events/EventsSlice';

export default function Events() {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.Events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.ItemContainer}
      key={item.id}
      onPress={() => navigate('EventDetails', {id: item.id})}>
      <Text style={styles.ItemNumber}>{index + 1}</Text>
      <Text style={styles.ItemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const ListEmptyComponent = () => {
    return <Loading />;
  };

  return (
    <SafeAreaView style={[GeneralStyles.SafeAreaView, styles.SafeAreaView]}>
      <View style={[GeneralStyles.container, styles.Container]}>
        {loading && <Loading />}

        {error && <Text style={styles.SubError}> Error: {error} </Text>}

        <FlatList
          style={styles.FlatList}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingBottom: 100}}
          ListEmptyComponent={ListEmptyComponent}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  SubError: {
    fontFamily: fonts.bold,
    fontSize: 30,
    color: colors.textPrice,
  },

  FlatList: {
    width: 400,
  },

  ItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.tertiary,
    marginBottom: 20,
    padding: 10,
  },

  ItemNumber: {
    fontFamily: fonts.bold,
    fontSize: 18,
    textAlign: 'center',
    color: colors.secondary,
  },

  ItemTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    textAlign: 'center',
    color: colors.dark,
  },
});
