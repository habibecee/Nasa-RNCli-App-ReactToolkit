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
import {fetchCategories} from '../../features/Categories/CategoriesSlice';

export default function Categories() {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.Categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.ItemContainer}
      key={item.id}
      onPress={() => navigate('CategoryDetails', {id: item.id})}>
      <Text style={styles.ItemNumber}>{index + 1}</Text>
      <Text style={styles.ItemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[GeneralStyles.SafeAreaView, styles.SafeAreaView]}>
      <View style={[GeneralStyles.container, styles.Container]}>
        {loading && <Loading />}

        {error && (
          <>
            <Text style={styles.SubError}>
              {' '}
              Error: {error} (Server is not available now!){' '}
            </Text>

            <View style={styles.guidanceContainer}>
              <Text style={styles.ItemTitle}>
                {' '}
                Have you ever seen NASA's media collection?
              </Text>

              <TouchableOpacity
                style={styles.guidanceButton}
                onPress={() => navigate('NasaMedia')}>
                <Text style={styles.guidanceButtonText}> See now!</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {data && (
          <FlatList
            style={styles.FlatList}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{paddingBottom: 100}}
            renderItem={renderItem}
          />
        )}
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

  guidanceContainer: {
    justifyContent: 'center',
    textAlign: 'justify',
    gap: 10,
  },

  guidanceButton: {
    backgroundColor: colors.textSecondary,
    borderRadius: 10,
    padding: 10,
  },

  guidanceButtonText: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.tertiary,
    textAlign: 'center',
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
