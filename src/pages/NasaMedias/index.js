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
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchNasaImages,
  fetchNasaVideos,
} from '../../features/NasaMedia/NasaMediaSlice';
import {GeneralStyles, colors, fonts} from '../../Utils/GeneralStyles';
import Loading from '../../components/LoadingIcon';
import SearchBar from '../../components/SearchBar';

export default function NasaMedias({route}) {
  const typeOf = route.params.typeOf;
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.NasaMedia);

  useEffect(() => {
    if (typeOf === 'image') {
      dispatch(fetchNasaImages());
    } else {
      dispatch(fetchNasaVideos());
    }
  }, [dispatch, typeOf]);

  const handleImageSearch = query => {
    dispatch(fetchNasaImages(query));
  };

  const handleVideoSearch = query => {
    dispatch(fetchNasaVideos(query));
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.ItemContainer}
      key={item?.data?.nasa_id}
      onPress={() =>
        navigate('NasaMediaDetails', {
          id: item?.href,
          typeOf: typeOf,
          itemDetail: item,
        })
      }>
      {item?.links?.map((link, index) => (
        <Image key={index} style={styles.Image} source={{uri: link?.href}} />
      ))}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[GeneralStyles.SafeAreaView, styles.SafeAreaView]}>
      <View style={[GeneralStyles.container, styles.Container]}>
        {loading && <Loading />}

        {error && <Text style={styles.SubError}> Error: {error}</Text>}

        <SearchBar
          onSearch={typeOf === 'image' ? handleImageSearch : handleVideoSearch}
        />

        {data && (
          <FlatList
            style={styles.FlatList}
            data={data?.items}
            numColumns={2}
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

  FlatList: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 25,
    width: Dimensions.get('window').width,
    gap: 30,
  },

  ItemContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    margin: 20,
    backgroundColor: colors.light,
    borderWidth: 0.5,
    borderColor: colors.tertiary,
    borderRadius: 10,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },

  Image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
