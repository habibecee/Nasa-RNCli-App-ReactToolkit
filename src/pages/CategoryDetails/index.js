import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GeneralStyles, colors, fonts} from '../../Utils/GeneralStyles';
import {fetchCategoryDetails} from '../../features/CategoryDetails/CategoryDetailsSlice';
import Loading from '../../components/LoadingIcon';
import {useNavigation} from '@react-navigation/native';

export default function CategoryDetails({route}) {
  const {navigate} = useNavigation();
  const id = route.params.id;
  const dispatch = useDispatch();
  const {loading, data, error} = useSelector(state => state.CategoryDetails);

  useEffect(() => {
    dispatch(fetchCategoryDetails(id));
  }, [dispatch, id]);

  if (loading || !data) {
    return (
      <SafeAreaView>
        <Loading />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <View>
          <Text> Error: {error} </Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderItem = ({item, index}) => (
    <View style={styles.ItemContainer} key={index}>
      <Text style={styles.ItemTitle}>{item.title}</Text>

      <View style={styles.ItemInfo}>
        <Text style={styles.ItemDescription}>{item.description}</Text>

        {item.events !== {} && (
          <TouchableOpacity
            style={styles.ItemEventContainer}
            onPress={() => navigate('EventDetails', {id: item.id})}>
            <Text style={styles.ItemEventDetails}>See Event Details</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[GeneralStyles.SafeAreaView, styles.SafeAreaView]}>
      <View style={[GeneralStyles.container, styles.Container]}>
        <Text style={styles.SubText}> {data?.title}</Text>
        <Text style={styles.SubDescription}>{data?.description}</Text>

        <FlatList
          data={data?.events}
          keyExtractor={item => item.id}
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
    padding: 20,
    borderRadius: 10,
  },

  SubText: {
    fontFamily: fonts.bold,
    fontSize: 25,
    color: colors.textPrice,
  },

  SubDescription: {
    fontFamily: fonts.regular,
    fontSize: 16,
    textAlign: 'justify',
    color: colors.textDark,
  },

  ItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },

  ItemTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    textAlign: 'center',
    color: colors.textSecondary,
  },

  ItemInfo: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  ItemDescription: {
    fontFamily: fonts.regular,
    fontSize: 16,
    textAlign: 'justify',
    color: colors.textDark,
  },

  ItemEventContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },

  ItemEventDetails: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.primary,
  },
});
